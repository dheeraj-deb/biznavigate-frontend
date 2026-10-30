'use client';

/**
 * BizNavigo — marketing site.
 *
 * EDITORIAL RULE (deliberate, please keep it):
 * Competitors read this page. It sells what the AI ACHIEVES and shows only
 * stylised glimpses of it — a guest answered, rooms sent with photos, a
 * confirmed stay, a rate waiting for the owner's OK. It never explains
 * mechanism: no product flow or pipeline, no list of integrations, no named
 * models or data sources, no pricing or follow-up logic, no plan
 * feature-matrix. Anything that would let someone reconstruct how the
 * platform works belongs behind the demo.
 * Exception, at the owner's request: WhatsApp is named and the chats are
 * styled like WhatsApp, because that is where guests meet the product.
 */
import React, { useEffect, useState, useSyncExternalStore } from 'react';
import './home.css';

/* Contact points — update these two in one place. */
const CONTACT_EMAIL = 'biznavigateapp@gmail.com';
const DEMO_MAILTO = `mailto:${CONTACT_EMAIL}?subject=BizNavigo%20%E2%80%94%20Request%20a%20demo&body=Property%20name%3A%0ALocation%3A%0ANumber%20of%20rooms%2Fcottages%3A%0APhone%3A%0A`;
// TODO: replace with the real business WhatsApp number before launch.
const WHATSAPP_URL = 'https://wa.me/919999999999?text=Hi%20BizNavigo%2C%20I%27d%20like%20a%20demo';

/* Photography — Unsplash (free to use under the Unsplash licence). Swap any id
   here for your own properties' photos once you have permission to use them. */
const photo = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Photos appear only inside product UI and in the "who it's for" gallery —
   the page should read as software, not as a resort. */
const PHOTOS = {
  thumb: 'photo-1566073771259-6a8506099945',
  poolVilla: 'photo-1613490493576-7fde63acd811',
  cottage: 'photo-1587061949409-02df41d5e562',
  deluxe: 'photo-1611892440504-42a792e24d32',
  pool: 'photo-1571896349842-33c89424de2d',
  resort: 'photo-1596178065887-1198b6148b2b',
  homestay: 'photo-1596394516093-501ba68a0ba6',
  boutique: 'photo-1578683010236-d716f9a3f461',
};

/* Reduced motion, read through useSyncExternalStore so the server render and
   the hydration render agree (both "false"), then the real value applies. */
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (cb: () => void) => {
  const m = window.matchMedia(REDUCED_QUERY);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};
const useReducedMotion = () =>
  useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED_QUERY).matches, () => false);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ── Rooms ──────────────────────────────────────────────────────────────── */

const ROOMS = [
  { name: 'Pool Villa', price: '₹7,400', img: PHOTOS.poolVilla },
  { name: 'Garden Cottage', price: '₹5,900', img: PHOTOS.cottage },
  { name: 'Deluxe Room', price: '₹4,800', img: PHOTOS.deluxe },
];

/* ── WhatsApp chat (hero) ──────────────────────────────────────────────────
   Two guest conversations, replayed on a phone in WhatsApp's own visual
   language: the guest is the sender (green, right), the property's AI replies
   (white, left). Shows the RESULT — a reply, rooms with photos, a confirmed
   stay — never the steps in between. Figures are illustrative. */

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 00-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm-3.2 5.3c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .6l-.5.7c-.1.2-.2.3 0 .6.6 1 1.4 1.9 2.4 2.5.3.2.5.1.6 0l.7-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.4.4 0 .4-.1 1.2-.7 1.7-.5.4-1.2.7-2 .6-2.5-.4-5.3-2.9-6.3-5.4-.4-1-.4-2.1.4-3 .3-.4.7-.6 1-.6z" />
  </svg>
);

const Ticks = () => (
  <svg className="wa-ticks" viewBox="0 0 18 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 6l3 3 6-7.5" /><path d="M8 8.5l.5.5 6-7.5" />
  </svg>
);

const Verified = () => (
  <svg className="wa-verified" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#25d366" d="M12 1l2.6 2.2 3.4-.4.9 3.3 3 1.7-1.3 3.2 1.3 3.2-3 1.7-.9 3.3-3.4-.4L12 23l-2.6-2.2-3.4.4-.9-3.3-3-1.7 1.3-3.2L2.1 9.8l3-1.7.9-3.3 3.4.4z" />
    <path d="M7.5 12.2l3 3 6-6.2" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* WhatsApp-style carousel: cards peek off the edge, each with a button. */
const WaCarousel = () => (
  <div className="wa-carousel">
    {ROOMS.map((r) => (
      <div className="wa-card" key={r.name}>
        <img src={photo(r.img, 360)} alt="" />
        <div className="wa-card-body"><b>{r.name}</b><span>{r.price} / night</span></div>
        <span className="wa-card-btn">Book now</span>
      </div>
    ))}
  </div>
);

const SCENES = [
  {
    guest: 'Hi! Is the pool villa free this Saturday for two? What’s the price?',
    reply: 'Yes, it’s free on Saturday. ₹7,400 for two with breakfast. Here are the rooms:',
    ok: 'The pool villa, please!',
    room: ROOMS[0],
    total: '₹7,400',
    detail: 'Pool Villa · Sat · paid in full',
  },
  {
    guest: 'Do you have something for 2 adults and a child next weekend? Is breakfast included?',
    reply: 'We do. The Garden Cottage sleeps three and breakfast is included. Here are the options:',
    ok: 'The cottage looks perfect.',
    room: ROOMS[1],
    total: '₹11,800',
    detail: 'Garden Cottage · 2 nights · paid in full',
  },
];

const WhatsAppChat: React.FC = () => {
  const reduced = useReducedMotion();
  const [scene, setScene] = useState(0);
  // 0 guest asks · 1 typing · 2 reply streams · 3 rooms · 4 guest picks · 5 confirmed
  const [stepState, setStep] = useState(0);
  const [charsState, setChars] = useState(0);
  // With reduced motion the finished conversation is shown, still.
  const step = reduced ? 5 : stepState;
  const chars = reduced ? Infinity : charsState;
  const s = SCENES[scene];
  const typing = step === 1 || step === 2;

  useEffect(() => {
    if (reduced) return;
    let t: ReturnType<typeof setTimeout>;
    if (step === 0) t = setTimeout(() => setStep(1), 900);
    else if (step === 1) t = setTimeout(() => setStep(2), 1000);
    else if (step === 2) {
      t = chars < s.reply.length
        ? setTimeout(() => setChars((c) => c + 2), 22)
        : setTimeout(() => setStep(3), 400);
    } else if (step === 3) t = setTimeout(() => setStep(4), 1600);
    else if (step === 4) t = setTimeout(() => setStep(5), 900);
    else t = setTimeout(() => { setScene((x) => (x + 1) % SCENES.length); setStep(0); setChars(0); }, 4200);
    return () => clearTimeout(t);
  }, [step, chars, reduced, s.reply.length]);

  return (
    <div className="phone" aria-label="Illustration of BizNavigo answering a guest on WhatsApp">
      <div className="phone-screen">
        <div className="wa-status"><span>11:42</span><span className="wa-bars"><i /><i /><i /><i /></span></div>
        <div className="wa-head">
          <svg className="wa-back" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
          <img src={photo(PHOTOS.thumb, 96)} alt="" />
          <div className="wa-who">
            <b>Coorg Hills Retreat <Verified /></b>
            <span>{typing ? 'typing…' : 'online'}</span>
          </div>
          <span className="wa-actions" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="2" y="6" width="14" height="12" rx="3" /><path d="M16 10l6-3v10l-6-3z" /></svg>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 005 5L15 12l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" /></svg>
          </span>
        </div>

        <div className="wa-body">
          <span className="wa-day">Today</span>
          <div className="wa-msg out" key={`g${scene}`}>{s.guest}<span className="wa-meta">11:42 pm <Ticks /></span></div>
          {step === 1 && <div className="wa-msg in wa-typing"><i /><i /><i /></div>}
          {step >= 2 && (
            <div className="wa-msg in">
              {s.reply.slice(0, chars)}
              {step === 2 && <span className="caret" />}
              {step > 2 && <span className="wa-meta">11:42 pm</span>}
            </div>
          )}
          {step >= 3 && <WaCarousel />}
          {step >= 4 && <div className="wa-msg out">{s.ok}<span className="wa-meta">11:43 pm <Ticks /></span></div>}
          {step >= 5 && (
            <div className="wa-msg in wa-confirm">
              <img src={photo(s.room.img, 400)} alt="" />
              <b><Check />Booking confirmed</b>
              <span>{s.detail}</span>
              <em>{s.total}</em>
              <span className="wa-meta">11:43 pm</span>
            </div>
          )}
        </div>

        <div className="wa-input">
          <span className="wa-field">Message</span>
          <span className="wa-mic"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0h-2a5 5 0 01-10 0zM11 18h2v3h-2z" /></svg></span>
        </div>
      </div>
    </div>
  );
};

/* ── Feature glimpses ───────────────────────────────────────────────────── */

const GlimpseReply = () => (
  <div className="gl gl-chat">
    <div className="msg in">Do you allow pets? We have a small dog.</div>
    <div className="msg out">
      We do. The Garden Cottage is pet-friendly with a fenced lawn, and it&rsquo;s free on your dates.
      <span className="msg-photo">
        <img src={photo(PHOTOS.cottage, 520)} alt="" />
        <b>Garden Cottage</b><em>₹5,900/night</em>
      </span>
    </div>
    <div className="msg in">Perfect, book it!</div>
  </div>
);

const GlimpseAvailability = () => (
  <div className="gl gl-week">
    <div className="gl-title"><b>This week</b><span>Live</span></div>
    <div className="week-head">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i}>{d}</span>)}</div>
    {[
      ['Pool Villa', [0, 0, 1, 0, 1, 1, 1]],
      ['Garden Cottage', [1, 0, 0, 0, 1, 1, 0]],
      ['Deluxe Room', [0, 1, 0, 1, 1, 1, 1]],
    ].map(([room, days]) => (
      <div className="week-row" key={room as string}>
        <b>{room as string}</b>
        <div>{(days as number[]).map((x, i) => <i key={i} className={x ? 'sold' : ''} />)}</div>
      </div>
    ))}
    <div className="gl-note"><Check />Every reply matches what&rsquo;s really free</div>
  </div>
);

const GlimpseRate = () => (
  <div className="gl gl-why">
    <div className="why-top"><span>Saturday · Pool Villa</span><b>₹7,400</b></div>
    {[['Long weekend nearby', 86], ['Your weekends sell first', 64], ['Inside your limits', 42]].map(([t, w]) => (
      <div className="why-row" key={t as string}><span>{t as string}</span><i><u style={{ width: `${w}%` }} /></i></div>
    ))}
    <div className="why-acts"><span className="yes">Approve</span><span>Adjust</span></div>
  </div>
);

const GlimpsePayment = () => (
  <div className="gl gl-ledger">
    <div className="led-stay">
      <img src={photo(PHOTOS.deluxe, 200)} alt="" />
      <div><b>Deluxe Room · 2 nights</b><span>Ananya K. · 14–16 Nov</span></div>
    </div>
    <div className="led-top"><span>Total</span><b>₹18,600</b></div>
    <div className="led-row"><span><Check />Payment received</span><em>Before arrival</em></div>
    <div className="led-row"><span><Check />Partner shares settled</span><em>Automatic</em></div>
    <div className="led-row"><span><Check />GST invoice sent</span><em>Done</em></div>
  </div>
);

/* Shows THAT partners sell at their own price and everyone is paid — not how
   the money is split. */
const GlimpseAgents = () => (
  <div className="gl gl-agent">
    <div className="agent-card">
      <img src={photo(PHOTOS.pool, 640)} alt="" />
      <div className="agent-by"><span className="agent-av">RT</span>Shared by <b>Ravi Travels</b></div>
    </div>
    <div className="agent-body">
      <div><b>Coorg Hills Retreat</b><span>Pool Villa · 2 nights</span></div>
      <em>₹16,400</em>
    </div>
    <div className="agent-split">
      <span><i className="you" />Your rate <b>₹14,800</b></span>
      <span><i className="them" />Agent earns <b>₹1,600</b></span>
    </div>
    <div className="gl-note"><Check />Booked · everyone paid automatically</div>
  </div>
);

/* A private follow-up with a guest-only coupon. No timings, no rules for when
   or how much. */
const GlimpseFollowUp = () => (
  <div className="gl gl-chat">
    <div className="msg out">
      Hi Ananya, the Pool Villa you asked about is still free this Tuesday. Here&rsquo;s something just for you:
      <span className="coupon"><b>STAY10</b><em>10% off · valid 24 hours</em></span>
      <span className="msg-photo">
        <img src={photo(PHOTOS.poolVilla, 520)} alt="" />
        <b>Pool Villa</b><em><s>₹7,400</s> ₹6,660/night</em>
      </span>
    </div>
    <div className="msg in">Booking it now!</div>
  </div>
);

const FEATURES = [
  { k: 'Guest replies', t: 'Replies like your best host', d: 'Understands free-form questions, follows the whole conversation and sends the right rooms with photos, rates and your house rules.', v: <GlimpseReply /> },
  { k: 'Availability', t: 'Never double-books', d: 'Every reply reflects what is actually free right now, across every place you sell.', v: <GlimpseAvailability /> },
  { k: 'Pricing', t: 'Recommends the right rate', d: 'Suggests a price for each night with a short, readable reason. Nothing changes until you approve it.', v: <GlimpseRate /> },
  { k: 'Payments', t: 'Gets paid before arrival', d: 'Guests pay before check-in. Partner shares and invoices are handled automatically.', v: <GlimpsePayment /> },
  { k: 'Agents & creators', t: 'Turns partners into a sales team', d: 'Travel agents and creators get their own booking card for your property, sell at their own price and are paid automatically.', v: <GlimpseAgents /> },
  { k: 'Follow-ups', t: 'Wins back undecided guests', d: 'Guests who asked but didn’t book get a timely, private follow-up, with a coupon when it makes sense.', v: <GlimpseFollowUp /> },
];

/* Everything else the platform handles. One line each, never how. */
const ALSO = [
  { t: 'Google profile & reviews', d: 'Kept fresh, with every review answered.', p: <><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></> },
  { t: 'Guest campaigns', d: 'Festive and off-season offers people open.', p: <path d="M3 11l15-6v14L3 13zM7 13v5a2 2 0 004 0v-4" /> },
  { t: 'Morning brief', d: 'Arrivals, money and anything that needs you, by 7 am.', p: <><path d="M12 3v2M5.6 5.6l1.4 1.4M3 12h2M19 12h2M17 7l1.4-1.4" /><path d="M7 17a5 5 0 0110 0M3 21h18" /></> },
  { t: 'Voice notes', d: 'Guests can send a voice note and get a proper reply.', p: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></> },
  { t: 'GST invoices & expenses', d: 'Invoices go out on their own. Costs in one place.', p: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></> },
  { t: 'Team & housekeeping', d: 'Tasks reach the right person after every checkout.', p: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0113 0M16 4.5a3.5 3.5 0 010 7M18 14a6.5 6.5 0 013.5 6" /></> },
];

/* ── Dynamic pricing, animated ─────────────────────────────────────────────
   Four stages on one rates screen: demand is read, a rate is suggested with a
   reason, the owner approves, the week sells. It shows the JOURNEY and the
   benefit only — no timings, thresholds, data sources or step rules.
   Figures are illustrative: 8 rooms sold at ₹7,400 instead of ₹6,200 is the
   ₹9,600 shown. */

const PRICE_STEPS = [
  { t: 'Reads demand', d: 'Holidays, the season and how fast each night is selling.' },
  { t: 'Suggests the rate', d: 'A better price for nights in demand, with a plain reason.' },
  { t: 'You approve', d: 'One tap. Nothing changes without you.' },
  { t: 'Sells at the right price', d: 'Busy nights earn more. Quiet nights get a private offer, not a public discount.' },
];

const PRICE_STATUS = ['Reading demand', '1 suggestion', 'Approved', 'This week'];
const PRICE_PHASE_MS = [3200, 3600, 2400, 5200];

const PRICE_DAYS = [
  { k: 'mon', n: 'Mon', demand: 34, price: '₹5,400' },
  { k: 'tue', n: 'Tue', demand: 20, price: '₹5,400' },
  { k: 'wed', n: 'Wed', demand: 30, price: '₹5,400' },
  { k: 'thu', n: 'Thu', demand: 46, price: '₹5,800' },
  { k: 'fri', n: 'Fri', demand: 78, price: '₹6,800' },
  { k: 'sat', n: 'Sat', demand: 96, price: '₹6,200' },
  { k: 'sun', n: 'Sun', demand: 58, price: '₹6,200' },
];

const PRICE_SIGNALS = ['Long weekend', 'Saturday selling fast', 'Your weekends sell first'];

const PricingFlow: React.FC = () => {
  const reduced = useReducedMotion();
  const [phaseState, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  // With reduced motion the finished week is shown, still.
  const phase = reduced ? 3 : phaseState;

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => {
      if (phaseState === 3) setCycle((c) => c + 1);
      setPhase((p) => (p + 1) % 4);
    }, PRICE_PHASE_MS[phaseState]);
    return () => clearTimeout(t);
  }, [phaseState, reduced]);

  return (
    <div className="pricing-grid">
      <ol className="price-steps">
        {PRICE_STEPS.map((s, i) => (
          <li key={s.t} className={`${phase === i ? 'on' : ''}${phase > i ? ' done' : ''}`}>
            <button type="button" onClick={() => setPhase(i)}>
              <span className="ps-n">{phase > i ? <Check /> : i + 1}</span>
              <span className="ps-txt"><b>{s.t}</b><span>{s.d}</span></span>
            </button>
          </li>
        ))}
      </ol>

      <div className={`price-screen p${phase}`} aria-label="Illustration of BizNavigo suggesting and applying a nightly rate">
        <div className="ps-head">
          <div><b>Rates</b><span>Pool Villa · next 7 nights</span></div>
          <span className="ps-status"><i />{PRICE_STATUS[phase]}</span>
        </div>

        <div className="ps-signals" key={`sig${cycle}`}>
          {PRICE_SIGNALS.map((s, i) => (
            <span key={s} style={{ animationDelay: `${0.35 + i * 0.45}s` }}><i />{s}</span>
          ))}
        </div>

        <div className="ps-days" key={`days${cycle}`}>
          {PRICE_DAYS.map((d, i) => (
            <div key={d.k} className={`ps-day d-${d.k}`}>
              <div className="ps-bar"><i style={{ height: `${d.demand}%`, animationDelay: `${i * 0.06}s` }} /></div>
              <span className="ps-name">{d.n}</span>
              {d.k === 'sat'
                ? <span className="ps-price"><s>{d.price}</s><b>₹7,400</b></span>
                : <span className="ps-price">{d.price}</span>}
              {/* Every day keeps a tag slot so the columns line up. */}
              {d.k === 'sat' ? <span className="ps-tag sold">Sold out</span>
                : d.k === 'tue' ? <span className="ps-tag offer">Offer · booked</span>
                : <span className="ps-tag none" aria-hidden="true" />}
            </div>
          ))}
        </div>

        <div className="ps-slot">
          <div className="ps-card ps-watch">
            <span className="ps-scan" aria-hidden="true"><i /><i /><i /></span>
            <div><b>Checking demand for the next 7 nights</b><span>Nothing changes until you approve it.</span></div>
          </div>

          <div className="ps-card ps-suggest">
            <div className="ps-suggest-top">
              <span>Saturday</span>
              <b><s>₹6,200</s> ₹7,400</b>
            </div>
            <ul>
              <li><Check />Long weekend nearby</li>
              <li><Check />Saturday is 80% booked already</li>
              <li><Check />Inside the limits you set</li>
            </ul>
            <div className="ps-actions">
              <span className="ps-approve">{phase >= 2 ? <><Check />Approved</> : 'Approve'}</span>
              <span>Adjust</span>
            </div>
          </div>

          <div className="ps-card ps-result">
            <span className="ps-result-k">This weekend</span>
            <b>+₹9,600</b>
            <span>8 rooms sold at ₹7,400 instead of ₹6,200, and a quiet Tuesday filled by a private offer.</span>
          </div>
        </div>

        <div className="ps-toast"><Check />New rate live everywhere you sell</div>
      </div>
    </div>
  );
};

/* Pill button with the round arrow badge. */
const Cta: React.FC<{ href: string; children: React.ReactNode; light?: boolean }> = ({ href, children, light }) => (
  <a href={href} className={`btn ${light ? 'btn-light' : 'btn-primary'}`}>
    {children}<span className="btn-ic"><Arrow /></span>
  </a>
);

const ROTATE_MS = 6500;

const Home: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [feature, setFeature] = useState(0);
  const reduced = useReducedMotion();
  const [autoplayState, setAutoplay] = useState(true);
  const autoplay = autoplayState && !reduced;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const nav = document.getElementById('biz-nav');
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.home-root .reveal').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  // Feature switcher advances on its own until the visitor picks a tab.
  useEffect(() => {
    if (!autoplay || paused) return;
    const t = setTimeout(() => setFeature((f) => (f + 1) % FEATURES.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [feature, autoplay, paused]);


  const navLinks = [
    { href: '#platform', label: 'Platform' },
    { href: '#pricing', label: 'Dynamic pricing' },
    { href: '#who', label: 'Properties' },
    { href: '#start', label: 'Getting started' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <div className="home-root">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <header className={`nav${menuOpen ? ' open' : ''}`} id="biz-nav">
        <div className="wrap nav-in">
          <a href="/" className="logo"><img src="/logo.png" alt="" />BizNavigo</a>
          <nav className="nav-links">
            {navLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <div className="nav-cta">
            <a href={DEMO_MAILTO} className="link-quiet">Talk to sales</a>
            <a href="#demo" className="btn btn-primary btn-sm">Book a demo</a>
          </div>
          <button
            className="menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        <div className="mobile-menu">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#demo" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Book a demo</a>
        </div>
      </header>

      {/* ── HERO: the AI, working where guests already are ──────────────── */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="hero-badge">
              <span className="hb-ic"><WaIcon /></span>
              <b>Official Meta Tech Provider</b>
              <span>AI front desk for resorts</span>
            </p>
            <h1>Turn every WhatsApp enquiry into a <span className="hl">direct booking.</span></h1>
            <p className="hero-sub">
              BizNavigo&rsquo;s AI replies to your guests on WhatsApp in seconds, shares rooms
              with photos and live rates, and collects payment before check-in. All within the
              rules you set.
            </p>
            <div className="hero-actions">
              <Cta href="#demo">Book a free demo</Cta>
              <a href="#platform" className="btn btn-outline">See how it works</a>
            </div>
            <ul className="hero-points">
              <li><Check />Live in a day</li>
              <li><Check />No commission</li>
              <li><Check />No lock-in</li>
            </ul>
          </div>

          <div className="hero-visual">
            <WhatsAppChat />
            {/* Pinned to the phone's frame: A over the status bar, B over the
                message bar — chrome only, never a message. */}
            <div className="float float-a">
              <span className="fl-ic fl-ai">AI</span>
              <div><b>Replied in 8 seconds</b><span>11:42 pm, while you slept</span></div>
            </div>
            <div className="float float-b">
              <span className="fl-ic fl-ok"><Check /></span>
              <div><b>&#8377;7,400 collected</b><span>Direct booking &middot; 0% commission</span></div>
            </div>
          </div>
        </div>

        <ul className="trustline">
          <li>Bank-grade payments</li>
          <li>Made in India</li>
          <li>Same-day human support</li>
        </ul>
      </section>

      {/* ── STATEMENT ───────────────────────────────────────────────────── */}
      <section className="statement">
        <div className="wrap">
          {/* Each "Every [token] noun" stays on one line; only the tails are muted.
              The tokens are pieces of product UI, not photos. */}
          <p className="big reveal">
            <span className="nb">Every <span className="token t-reply"><Check />8 sec</span> guest</span> answered.{' '}
            <span className="nb">Every <span className="token t-rate">₹7,400</span> night</span> sold <em>at the right rate.</em>{' '}
            <span className="nb">Every <span className="token t-paid"><Check />Paid</span> rupee</span> settled <em>before check-in.</em>
          </p>

          <div className="stats reveal">
            {[
              { v: '24/7', l: 'Guests answered, day and night' },
              { v: '0', l: 'Double bookings' },
              { v: '0%', l: 'Commission on direct bookings' },
              { v: '1 day', l: 'Typical time to go live' },
            ].map((r) => (
              <div className="stat" key={r.l}><b>{r.v}</b><span>{r.l}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM ────────────────────────────────────────────────────── */}
      <section id="platform" className="platform">
        <div className="wrap">
          <div className="split-head reveal">
            <div>
              <p className="label">Platform</p>
              <h2>One AI for the whole front desk.</h2>
            </div>
            <p>Six jobs that usually need a team, handled around the clock and always inside your rules.</p>
          </div>

          <div
            className="switcher reveal"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="tabs" role="tablist" aria-label="Platform features">
              {FEATURES.map((f, i) => (
                <button
                  key={f.k}
                  role="tab"
                  aria-selected={feature === i}
                  className={`tab${feature === i ? ' on' : ''}`}
                  onClick={() => { setFeature(i); setAutoplay(false); }}
                >
                  <span className="tab-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="tab-main">
                    <span className="tab-t">{f.t}</span>
                    <span className="tab-d">{f.d}</span>
                  </span>
                  {feature === i && autoplay && (
                    <span className="tab-bar"><i key={feature} style={{ animationDuration: `${ROTATE_MS}ms`, animationPlayState: paused ? 'paused' : 'running' }} /></span>
                  )}
                </button>
              ))}
            </div>

            <div className="stage plate" aria-live="polite">
              <span className="stage-k">{FEATURES[feature].k}</span>
              {FEATURES.map((f, i) => (
                <div key={f.k} className={`stage-view${feature === i ? ' on' : ''}`} aria-hidden={feature !== i}>{f.v}</div>
              ))}
            </div>
          </div>

          <div className="also reveal">
            {ALSO.map((a) => (
              <div className="also-item" key={a.t}>
                <span className="also-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{a.p}</svg>
                </span>
                <div><h4>{a.t}</h4><p>{a.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DYNAMIC PRICING ─────────────────────────────────────────────── */}
      <section id="pricing" className="pricing">
        <div className="wrap">
          <div className="split-head reveal">
            <div>
              <p className="label">Dynamic pricing</p>
              <h2>Earn more on busy nights. Fill the quiet ones.</h2>
            </div>
            <p>
              BizNavigo watches demand for every night and suggests the right rate, with a
              reason. You approve in one tap and the new rate goes live everywhere you sell.
            </p>
          </div>
          <PricingFlow />
        </div>
      </section>

      {/* ── CONTROL ─────────────────────────────────────────────────────── */}
      <section className="control">
        <div className="wrap control-grid">
          {/* Product only: the owner's rules screen and an approval waiting. */}
          <div className="plate control-plate reveal">
            <div className="rules-card">
              <div className="rules-head"><b>Your rules</b><span>Coorg Hills Retreat</span></div>
              {[
                ['Ask me before any discount', true],
                ['Never go below ₹5,800 a night', true],
                ['Quiet hours, 10 pm to 7 am', true],
                ['Reply to reviews automatically', false],
              ].map(([r, on]) => (
                <div className="rule" key={r as string}><span>{r as string}</span><span className={`tog${on ? '' : ' off'}`} /></div>
              ))}
            </div>
            <div className="approve-card">
              <span className="approve-ic"><Check /></span>
              <div><b>Needs your approval</b><span>Saturday rate ₹7,400 · long weekend</span></div>
              <em>Approve</em>
            </div>
          </div>
          <div className="control-copy reveal">
            <p className="label">You stay in charge</p>
            <h2>The AI does the work. You make the decisions.</h2>
            <p>Nothing reaches a guest that you wouldn&rsquo;t say yourself. Anything unusual comes straight to you.</p>
            <ul className="ticks">
              <li><b>Start supervised.</b> Approve replies and rates as you go.</li>
              <li><b>Hand over gradually.</b> Let it do more when you&rsquo;re comfortable.</li>
              <li><b>Gets better every season.</b> It learns your rooms, your guests and which nights sell first.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR (asymmetric gallery) ───────────────────────────── */}
      <section id="who" className="who">
        <div className="wrap">
          <div className="split-head reveal">
            <div>
              <p className="label">Who it&rsquo;s for</p>
              <h2>Built for owner-run properties.</h2>
            </div>
            <p>Small enough that every booking matters, and that nobody has a spare person to sit on the phone.</p>
          </div>
          <div className="gallery reveal">
            {[
              { c: 'g1', t: 'Resorts', d: 'Competing with chains that have a full revenue team.', img: PHOTOS.resort, alt: 'A resort infinity pool among palms' },
              { c: 'g2', t: 'Homestays', d: 'Where the owner is also the host.', img: PHOTOS.homestay, alt: 'A bed on an open deck facing the hills' },
              { c: 'g3', t: 'Villas & cottages', d: 'Sold whole or by the room.', img: PHOTOS.poolVilla, alt: 'A private villa with its own pool' },
              { c: 'g4', t: 'Boutique hotels', d: 'Small inventory, high standards.', img: PHOTOS.boutique, alt: 'A boutique hotel suite' },
            ].map((s) => (
              <figure className={`tile ${s.c}`} key={s.t}>
                <img src={photo(s.img, 1000)} alt={s.alt} loading="lazy" />
                <figcaption><h4>{s.t}</h4><p>{s.d}</p></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── GETTING STARTED ─────────────────────────────────────────────── */}
      <section id="start" className="start">
        <div className="wrap">
          <div className="split-head reveal">
            <div>
              <p className="label">Getting started</p>
              <h2>Live in a day.</h2>
            </div>
            <p>We do the setup. You approve. Nothing reaches a guest until you&rsquo;ve seen it.</p>
          </div>
          <ol className="steps reveal">
            {[
              { t: 'A 20-minute call', d: 'How you price, what you will and won’t agree to, and where bookings come from today.' },
              { t: 'We set it up around you', d: 'Your rooms, rates, rules and tone of voice. No forms, no new habits.' },
              { t: 'You approve, then let go', d: 'It works alongside you. You hand over more when you’re ready.' },
            ].map((s, i) => (
              <li key={s.t}><span className="step-n">0{i + 1}</span><h4>{s.t}</h4><p>{s.d}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── PROOF ───────────────────────────────────────────────────────────
          Add a real, permissioned quote from a pilot owner here when you have
          one. Do not publish an invented testimonial. */}

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="faq-sec">
        <div className="wrap faq-grid">
          <div className="faq-side reveal">
            <p className="label">FAQ</p>
            <h2>Questions owners ask first.</h2>
            <p>Something else? Write to us. A person replies, usually the same day.</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-outline">Ask a question</a>
          </div>
          <div className="faq reveal">
            {[
              { q: 'Is it really AI, or a scripted bot?', a: 'It’s AI. It understands free-form questions and follows the whole conversation. What it says is always limited to your rooms, your rates and your rules.' },
              { q: 'What happens when it doesn’t know an answer?', a: 'It tells the guest it’s checking, asks you, and remembers your answer for next time.' },
              { q: 'Will guests know they’re not talking to me?', a: 'They’re talking to your property, with your prices and your policies. Anything that needs your judgement comes straight to you.' },
              { q: 'Do I have to change how I run things?', a: 'No. We fit around your rates, policies and habits. If something doesn’t suit you, we turn it off.' },
              { q: 'What does it cost?', a: 'It depends on the size of your property and what you want handled, so we quote it on the call.' },
              { q: 'Is my guest data safe?', a: 'Yes. Your guest data belongs to you, is never sold or shared with other properties, and leaves with you if you go.' },
            ].map((f, i) => (
              <details key={f.q} open={i === 0}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section id="demo" className="final-sec">
        <div className="final plate reveal">
          <div className="final-in">
            <p className="label">Book a demo</p>
            <h2>Someone is asking about your rooms right now.</h2>
            <p>See BizNavigo working on your own property in a 20-minute demo. We&rsquo;ll tell you honestly if it&rsquo;s a fit.</p>
            <div className="acts">
              <Cta href={DEMO_MAILTO}>Book a free demo</Cta>
              <a href={WHATSAPP_URL} className="btn btn-outline" target="_blank" rel="noreferrer">Message us on WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a href="/" className="logo"><img src="/logo.png" alt="" />BizNavigo</a>
              <p>The AI front desk for independent hotels, resorts and homestays.</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="foot-mail">{CONTACT_EMAIL}</a>
            </div>
            <div className="foot-col">
              <h6>Product</h6>
              <a href="#platform">Platform</a>
              <a href="#start">Getting started</a>
            </div>
            <div className="foot-col">
              <h6>For guests</h6>
              <a href="/resorts">Find a stay</a>
            </div>
            <div className="foot-col">
              <h6>Company</h6>
              <a href="#demo">Book a demo</a>
              <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
              <a href="/privacy-policy">Privacy policy</a>
              <a href="/terms">Terms of service</a>
              <a href="/data-deletion">Data deletion</a>
            </div>
          </div>
          <div className="foot-bot">
            <p>&copy; {new Date().getFullYear()} BizNavigo. All rights reserved.</p>
            <p>Official Meta Tech Provider · Made in India</p>
          </div>
        </div>
        <div className="wordmark" aria-hidden="true">BizNavigo</div>
      </footer>

    </div>
  );
};

export default Home;
