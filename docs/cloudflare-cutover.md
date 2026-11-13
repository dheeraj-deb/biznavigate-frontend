# Moving biznavigo.com from Vercel to Cloudflare: cutover plan

Status: **plan only, nothing done yet.** Every step that touches DNS, the
nameservers, Vercel projects or a payment method needs the owner's go-ahead
first. Written 2026-11-12.

## Live previews (Workers Free, built against the staging API)

- Booking site: https://biznavigo-site-staging.biznavigate.workers.dev
  (for example `/resorts/pan-haven-vagamon`)
- Dashboard: https://biznavigo-dashboard-staging.biznavigate.workers.dev

Both were deployed from the CLI (`opennextjs-cloudflare deploy --env staging`).
Workers Builds can be connected to these existing Workers.

## What moves and what stays

| Address | Today (Vercel project) | After cutover |
| --- | --- | --- |
| `www.biznavigo.com` | `biznavigate-frontend` | Worker `biznavigo-site` |
| `biznavigo.com` (bare) | `biznavigate-frontend`, 307 → www | Cloudflare Redirect Rule → www |
| `staging.biznavigo.com` | `biznavigate-frontend` (staging branch) | Worker `biznavigo-site-staging` |
| `app.biznavigo.com` | `biznavigo-frontend` | Worker `biznavigo-dashboard` |
| `booking.biznavigo.com` | `biznavigo-frontend` | Worker `biznavigo-dashboard` |
| `creator.biznavigo.com` | `biznavigo-frontend` | Worker `biznavigo-dashboard` |
| `agent.biznavigo.com` | `biznavigo-frontend` | Worker `biznavigo-dashboard` |
| `staging-app.biznavigo.com` | `biznavigo-frontend` (staging branch) | Worker `biznavigo-dashboard-staging` |
| `admin.biznavigo.com` | `biznavigo-admin` | **stays on Vercel** (not part of this move; it is also on Hobby) |
| `api.biznavigo.com` | DNS only → Linode `172.235.15.121` | same, DNS only |
| `api-staging.biznavigo.com` | DNS only → Linode `172.235.15.121` | same, DNS only |

The two dashboard Workers serve four hostnames each through the same app.
`src/middleware.ts` keeps gating paths by the `Host` header, exactly as on Vercel.
No Worker config names a hostname, so resort custom domains (Cloudflare for SaaS)
can be added later without changing the Workers.

## Today's DNS records (from `vercel dns ls biznavigo.com`, 2026-11-12)

The registrar is **GoDaddy**. The nameservers are `ns1.vercel-dns.com` and
`ns2.vercel-dns.com`. DNSSEC is off ("unsigned"), so there is no DS record to remove
first.

All of these must exist in Cloudflare **before** the nameservers change. Mail and API
records are set to **DNS only** (grey cloud):

| Name | Type | Value | Proxy |
| --- | --- | --- | --- |
| `@` | MX 10 | `mx.zoho.in` | n/a |
| `@` | MX 20 | `mx2.zoho.in` | n/a |
| `@` | MX 50 | `mx3.zoho.in` | n/a |
| `@` | TXT | `v=spf1 include:zoho.in ~all` | n/a |
| `@` | TXT | `zoho-verification=zb10107838.zmverify.zoho.in` | n/a |
| `@` | TXT | `google-site-verification=QckGbm-XQWkKwZ9YuFBBEN-ZTCR9iWaaeyBliYnSSrM` | n/a |
| `zmail._domainkey` | TXT | Zoho DKIM key (copy the full value from Vercel) | n/a |
| `resend._domainkey` | TXT | Resend DKIM key (copy the full value from Vercel) | n/a |
| `send` | CNAME | `send.forge.rmta.net` | DNS only |
| `rsend` | CNAME | `rsend-apne1.forge.rmta.net` | DNS only |
| `api` | A | `172.235.15.121` | **DNS only** |
| `api-staging` | A | `172.235.15.121` | **DNS only** |
| `admin` | CNAME | `cname.vercel-dns-017.com` | DNS only |

Keep `api` and `api-staging` set to DNS only. WhatsApp (Gupshup/Meta) and Cashfree
webhooks reach the Linode nginx directly, using its own certificate. Proxying them
through Cloudflare is a separate decision for later.

These Vercel defaults are **not** copied:
- The `CAA` records (pki.goog, sectigo, letsencrypt). They are Vercel's defaults.
  Without CAA records any CA may issue, and Certbot on Linode keeps working.
- The `*` wildcard `ALIAS`. Every hostname actually in use is listed above.

## Before cutover (no DNS change, safe any time)

1. **Cloudflare account** on the Free plan: the same account that already holds the
   owner-photo R2 bucket `biznavigate`, so R2 is already enabled. Workers, D1,
   Durable Objects (SQLite), Images (5,000 transforms a month) and Workers Builds
   need nothing more.
2. **Resources** (done 2026-11-12/13, account `cca1cc408684b5f3b6d2ffd662e86a5d`):
   - Private R2 buckets `biznavigo-site-cache` and `biznavigo-site-staging-cache`
     (APAC location hint, Standard class) for the saved pages.
   - D1 databases `biznavigo-site-tags` and `biznavigo-site-staging-tags`.

   All are named in the booking site's `wrangler.jsonc`. The D1 `revalidations` table is created by
   `opennextjs-cloudflare deploy`, which runs the populate-cache step.
3. **Connect Workers Builds** (Workers & Pages → Create → Import a repository). Use one
   Worker per row. The Worker name must equal the `name` in `wrangler.jsonc`, plus
   `-staging` for the staging env.

   | Worker | Repo | Production branch | Build command | Deploy command |
   | --- | --- | --- | --- | --- |
   | `biznavigo-site` | biznavigate-frontend | `main` | `npx opennextjs-cloudflare build` | `npx opennextjs-cloudflare deploy` |
   | `biznavigo-site-staging` | biznavigate-frontend | `staging` | `npx opennextjs-cloudflare build` | `npx opennextjs-cloudflare deploy -- --env staging` |
   | `biznavigo-dashboard` | biznavigo-frontend | `main` | `npx opennextjs-cloudflare build` | `npx opennextjs-cloudflare deploy` |
   | `biznavigo-dashboard-staging` | biznavigo-frontend | `staging` | `npx opennextjs-cloudflare build` | `npx opennextjs-cloudflare deploy -- --env staging` |

   - Turn off "builds for non-production branches" on the two staging Workers, or
     every PR builds twice.
   - Node: the build image defaults to Node 24, the same as Vercel. pnpm comes from
     the dashboard's `packageManager` field.
   - Builds count against 3,000 free build minutes a month, one build at a time.
4. **Environment variables.** Workers Builds has two separate lists. "Build variables"
   are inlined into the app at build time, which is where every `NEXT_PUBLIC_*` value
   goes. "Variables & Secrets" are read at runtime.

   **Booking site.** Production values come from the committed `.env.production`. Its
   build variables are:
   - `biznavigo-site`: `NEXT_PUBLIC_WHATSAPP_DEFAULT`, only if a fallback number is
     wanted. It is not set on Vercel today.
   - `biznavigo-site-staging`: `NEXT_PUBLIC_API_URL=https://api-staging.biznavigo.com/api`
     and `NEXT_PUBLIC_PUBLIC_BASE_URL=https://staging.biznavigo.com`. These are the
     same two values Vercel sets for the staging branch.

   The booking site has no runtime secrets.

   **Dashboard.** Copy these build variables from Vercel. They are marked "Sensitive"
   there and cannot be read back, so re-enter them from your own records:

   | Variable | Production (`biznavigo-dashboard`) | Staging (`biznavigo-dashboard-staging`) |
   | --- | --- | --- |
   | `NEXT_PUBLIC_API_URL` | prod API | `https://api-staging.biznavigo.com/api` |
   | `NEXT_PUBLIC_APP_URL` | `https://app.biznavigo.com` | `https://staging-app.biznavigo.com` |
   | `NEXT_PUBLIC_SITE_URL` | `https://biznavigo.com` | staging value from Vercel |
   | `NEXT_PUBLIC_BOOKING_SITE_URL` | `https://www.biznavigo.com` (check: production has only `NEXT_PUBLIC_BOOKING_URL`) | staging value from Vercel |
   | `NEXT_PUBLIC_BOOKING_URL` | value from Vercel | value from Vercel |
   | `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | value from Vercel | value from Vercel |
   | `NEXT_PUBLIC_META_APP_ID` | value from Vercel | value from Vercel |
   | `NEXT_PUBLIC_EMBEDDED_SIGNUP_CONFIG_ID` | value from Vercel | value from Vercel |
   | `NEXT_PUBLIC_META_SOLUTION_ID` | value from Vercel | value from Vercel |
   | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | not set on Vercel today (Vercel has `NEXT_GOOGLE_MAPS_API_KEY`, which the code never reads) | same |
   | `NEXT_PUBLIC_SENTRY_DSN` | not set today (Sentry is off) | same |
   | `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` | only for source-map upload | same |

   Dashboard runtime variables, all optional:
   - `SENTRY_DSN`, to turn on server-side Sentry in the Worker (`worker.ts`).
   - `BOOKING_HOST`, `CREATOR_HOST` and `AGENT_HOST`, which add extra hostnames to the
     middleware's gating.

5. **Google sign-in and Meta.** The domains stay the same, so the Google OAuth origins,
   the Meta app domains and the backend CORS allowlist need no change. The
   `*.workers.dev` preview addresses are **not** allowlisted. Browser calls from them
   to the API will hit CORS errors, while server-rendered pages still work.
6. **Check the previews** on `*.workers.dev`: resort pages, photos, booking/checkout,
   dashboard sign-in. Do this before touching DNS.

## Cutover day

The order keeps the sites on Vercel until Cloudflare is serving DNS, and lets each
step be undone on its own.

1. **Add the zone.** In Cloudflare, Add a site → `biznavigo.com` → Free plan.
   Cloudflare imports what it can see. Compare the import with the tables above, then
   add or fix records until they match.
2. **Point the web hosts at Vercel for now.** Create DNS-only CNAMEs to
   `cname.vercel-dns-017.com` for `www`, `staging`, `app`, `booking`, `creator`,
   `agent`, `staging-app` and `admin`. For the bare `biznavigo.com`, use the apex
   value Vercel shows (`76d96b7c80709f60.vercel-dns-017.com`), as a flattened CNAME.
   After the nameserver switch, everything still serves from Vercel.
3. **Switch nameservers at GoDaddy.** Replace `ns1/ns2.vercel-dns.com` with the two
   names Cloudflare gives. This can take a few hours, and up to 24–48 h, to spread.
   Wait until Cloudflare shows the zone **Active**.
4. **Check that nothing changed:** mail to and from `@biznavigo.com` (Zoho), Resend
   sending, `https://api.biznavigo.com` (WhatsApp webhook, Cashfree webhook) and every
   web host.
5. **Move the web hosts, one at a time.** Start with the staging ones.
   1. Delete the Vercel CNAME for the host.
   2. In the Worker → Settings → Domains & Routes → Add Custom Domain, attach the
      host. Cloudflare creates the record and the certificate.
   3. Test the host.

   Hosts and Workers:
   - `staging.biznavigo.com` → `biznavigo-site-staging`
   - `staging-app.biznavigo.com` → `biznavigo-dashboard-staging`
   - `www.biznavigo.com` → `biznavigo-site`
   - `app.`, `booking.`, `creator.` and `agent.biznavigo.com` → `biznavigo-dashboard`
6. **Bare domain → www.** Replace the apex CNAME with a proxied `A @ 192.0.2.1`
   placeholder. Then add a Redirect Rule: hostname equals `biznavigo.com` → dynamic
   redirect to `concat("https://www.biznavigo.com", http.request.uri.path)`, keep the
   query string, status 301. (Vercel uses 307 today; 301 is the usual choice for a
   permanent canonical host.)
7. **Leave Vercel alone.** Keep both Vercel projects and their domain entries for at
   least two weeks. They are the rollback path. Deleting or downgrading them is a
   separate decision.

## Rollback

- **Before step 3:** nothing has changed yet.
- **After step 3, before step 5:** all web traffic is still on Vercel through the
  DNS-only CNAMEs. To leave Cloudflare entirely, set the GoDaddy nameservers back to
  `ns1.vercel-dns.com` and `ns2.vercel-dns.com`. Vercel's DNS records are untouched.
- **After step 5, one host misbehaving:** remove that host's Custom Domain from the
  Worker and recreate its DNS-only CNAME to `cname.vercel-dns-017.com`. The host is
  back on Vercel within minutes, because the Vercel project still has the domain
  attached.
- **Everything:** do the above for every host, or switch the nameservers back.

## Free-plan watch list

- **CPU time:** 10 ms per request on Free. Measured on 2026-11-13 with
  `wrangler tail --format json`, which reports `cpuTime` per request, on the
  workers.dev previews. Each figure is CPU per request:

  | Request | CPU |
  | --- | --- |
  | Booking site: cached resort page (cache interception on) | 3–9 ms; 17 ms on the first request after a deploy |
  | Booking site: cached page, before cache interception | 4–11 ms |
  | Booking site: `/_next/image` resize | 3–5 ms |
  | Booking site: page not in the cache yet (a guest waits for it) | 28–135 ms |
  | Booking site: background rebuild of a stale page (every 5 min while visited) | 65–330 ms |
  | Dashboard: warm page or redirect | 1–15 ms |
  | Dashboard: `/api/scan-website` | 7–33 ms |
  | Dashboard: first request on a fresh instance | 234–306 ms |

  No request was cut off during the test. Every outcome was `ok`, because Cloudflare
  allows occasional overruns. Its docs say a Worker that goes over *consistently* is
  terminated with error 1102. Three kinds of request go over 10 ms every time:
  - **Page rebuilds.** If they are cut off, the stale page keeps being served and
    never refreshes.
  - **First visits to uncached pages.** If they are cut off, the guest sees an
    error.
  - **Dashboard cold starts.** If they are cut off, the owner sees an error.

  Free is fine for previews and near-zero traffic. Watch Workers → Metrics → "CPU
  time" and the error counts. The moment 1102 errors show up, move to Workers Paid
  ($5/month, 30 s CPU). The dashboard is the more likely of the two to need it first.
- **Requests:** 100,000 a day across all Workers. After that, requests fail with
  error 1027 until the next UTC day.
- **R2 (saved pages):** the free tier is 1 million writes (Class A) and 10 million
  reads (Class B) a month, plus 10 GB. Each background refresh of a page is one
  write, so this has lots of room. Above the free tier, R2 bills the card already
  on the account.
- **Page speed:** reading a saved page from R2 took about 230–280 ms inside the
  Worker, against about 70 ms with KV. Total time to first byte from India was about
  0.30 s, against 0.38–0.45 s on Vercel today. After cutover, try OpenNext's
  `withRegionalCache`, which keeps a copy in each data centre through Cloudflare's
  Cache API. Measure it on the real domain rather than on `workers.dev`, and keep it
  only if it clearly helps.
- **Images:** 5,000 unique resizes a month. After that, new sizes fail with error
  9422, and sizes already made keep serving. The Free plan is never billed for this.
- **Worker size:** the booking site is 6.3 MB (1.4 MB gzip) and the dashboard
  20.5 MB (4.4 MB gzip). Both deployed fine on Free. Cloudflare's limits page
  (updated October 2026) counts only the uncompressed size, with a 64 MB limit.
  OpenNext's older "3 MiB on Free" note no longer applies.
