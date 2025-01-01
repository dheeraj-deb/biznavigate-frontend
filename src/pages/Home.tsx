/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import './home.css';

const Home: React.FC = () => {
  useEffect(() => {
    const nav = document.getElementById('biz-nav') as HTMLElement | null;
    const handleScroll = () => {
      nav?.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
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
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
    };
  }, []);

  const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <div className="home-root">

      {/* NAV */}
      <header className="nav" id="biz-nav">
        <div className="wrap nav-in">
          <a href="/" className="logo">
            <span className="mark"><img src="/logo.png" alt="BizNavigo logo" /></span>
            BizNavigo<span className="dot">.</span>
          </a>
          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#dashboard">Dashboard</a>
            <a href="#pricing">Plans</a>
          </nav>
          <div className="nav-cta">
            <a href="#" className="btn btn-ghost">Sign in</a>
            <a href="#demo" className="btn btn-primary">Book a free demo</a>
          </div>
          <button className="menu-btn" aria-label="Menu">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="hero-pill">
              <span className="tag">2026</span> <b>Omnichannel</b> AI booking agent for resorts
            </span>
            <h1 className="hero-h display">
              Turn every enquiry into a{' '}
              <span className="hl">
                direct booking
                <svg viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M2 8C40 3 160 3 198 7" stroke="#C6F24E" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>{' '}
              on autopilot.
            </h1>
            <p className="hero-sub">
              One AI agent answers your guests across every channel, quotes live rates, and closes the booking into one calendar, one inbox, one CRM.
            </p>
            <div className="hero-actions">
              <a href="#demo" className="btn btn-primary">
                Book a free demo
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div className="hero-trust">
              <div>
                <div className="stars">★★★★★</div>
                <span>Loved by independent resort owners</span>
              </div>
              <div className="sep" />
              <span><b style={{ color: 'var(--ink)', fontWeight: 600 }}>0%</b> OTA commission on direct bookings</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="channels">
              <div className="chan">
                <span className="ic" style={{ background: '#25D366' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                    <path d="M12 2a10 10 0 00-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm4.4 12c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8 1-.3.1-.5 0a6.5 6.5 0 01-1.9-1.2 7.2 7.2 0 01-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3 2.8 2.8 0 00-.9 2.1A4.9 4.9 0 009 12.3a11 11 0 004.2 3.7c.6.2 1 .4 1.4.5a3.4 3.4 0 001.5.1c.5-.1 1.4-.6 1.6-1.1a2 2 0 00.1-1.1c0-.2-.2-.2-.4-.4z" />
                  </svg>
                </span>
                WhatsApp
              </div>
              <div className="chan">
                <span className="ic" style={{ background: '#0E6B4F' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                    <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0zM3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" strokeLinecap="round" />
                  </svg>
                </span>
                Website chat
              </div>
              <div className="chan">
                <span className="ic" style={{ background: '#4285F4' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
                    <path d="M12 11v2.6h4.3a4.3 4.3 0 01-4.3 3.1 4.7 4.7 0 010-9.4 4.4 4.4 0 013 1.2l1.9-1.9A7 7 0 1012 19a6.6 6.6 0 006.8-7 5.6 5.6 0 00-.1-1.1z" />
                  </svg>
                </span>
                Google
              </div>
            </div>
            <div className="funnel-line" />
            <div className="app">
              <div className="app-bar">
                <span className="d" /><span className="d" /><span className="d" />
                <span className="t">Misty Hills Resort</span>
                <span className="live"><i />AI on duty</span>
              </div>
              <div className="app-body">
                <div className="stat-row">
                  <div className="stat"><div className="l">Collected today</div><div className="v green">&#8377;68k</div></div>
                  <div className="stat"><div className="l">Occupied</div><div className="v">5<small>/8</small></div></div>
                  <div className="stat"><div className="l">New leads</div><div className="v">12</div></div>
                </div>
                <div className="cott"><span className="lbl">Stays tonight</span></div>
                <div className="cott-grid">
                  <div className="cu">&#10003;</div><div className="cu">&#10003;</div><div className="cu">&#10003;</div><div className="cu">&#10003;</div>
                  <div className="cu">&#10003;</div><div className="cu empty">&#183;</div><div className="cu empty">&#183;</div><div className="cu empty">&#183;</div>
                </div>
                <div className="chat">
                  <div className="hd">
                    <div className="av">R</div>
                    <div><div className="nm">Riya &#183; AI agent</div><div className="rl">replying across 3 channels</div></div>
                  </div>
                  <div className="bub in"><span className="src">via Google Business</span>Do you have a stay free this weekend? 2 adults.</div>
                  <div className="bub out">Yes! Lake View Cottage is free Sat&#8211;Sun. &#8377;6,500/night with breakfast. Shall I hold it for you?</div>
                </div>
              </div>
            </div>
            <div className="floatcard fc-1">
              <span className="ic" style={{ background: 'var(--mist)', color: 'var(--green)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div><div className="ttl">No double bookings</div><div className="desc">Calendar synced live</div></div>
            </div>
            <div className="floatcard fc-2">
              <span className="ic" style={{ background: '#FDE7DC', color: '#B5470F' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z" strokeLinejoin="round" />
                </svg>
              </span>
              <div><div className="ttl">Hot lead spotted</div><div className="desc">AI scored 92 &#183; ready to book</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* CHANNEL STRIP */}
      <div className="strip">
        <div className="wrap strip-in">
          <span className="lab">One agent, every channel guests use:</span>
          <div className="chans">
            <span className="ci">
              <svg viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 00-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2z" /></svg>
              WhatsApp
            </span>
            <span className="ci">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0E6B4F" strokeWidth="2">
                <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
              </svg>
              Website chatbot
            </span>
            <span className="ci">
              <svg viewBox="0 0 24 24" fill="#4285F4">
                <path d="M12 11v2.6h4.3a4.3 4.3 0 01-4.3 3.1 4.7 4.7 0 010-9.4 4.4 4.4 0 013 1.2l1.9-1.9A7 7 0 1012 19a6.6 6.6 0 006.8-7 5.6 5.6 0 00-.1-1.1z" />
              </svg>
              Google Business
            </span>
            <span className="ci">
              <svg viewBox="0 0 24 24" fill="none" stroke="#E8913A" strokeWidth="2">
                <path d="M3 8l9 6 9-6M3 8v10h18V8M3 8l9-5 9 5" strokeLinejoin="round" />
              </svg>
              Direct bookings
            </span>
          </div>
        </div>
      </div>

      {/* META TECH PROVIDER */}
      <div className="meta-strip">
        <div className="wrap meta-in">
          <span className="meta-badge">
            <span className="wa">
              <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 00-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2z" /></svg>
            </span>
            <span style={{ textAlign: 'left' as const }}>
              <span className="mt">Official Meta Tech Provider</span>
              <span className="ms">Verified on the WhatsApp Business Platform</span>
            </span>
          </span>
          <span className="meta-verify">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
            </svg>
            Built on official, approved WhatsApp APIs
          </span>
        </div>
      </div>

      {/* PROBLEM */}
      <section>
        <div className="wrap">
          <div className="leak reveal">
            <div className="leak-grid">
              <div>
                <span className="eyebrow">Stop the commission bleed</span>
                <h2>Keep the guests OTAs charge you 20% to reach.</h2>
                <p>Every enquiry that lands on WhatsApp, your site, or Google is a guest you already own. BizNavigo converts them direct.</p>
              </div>
              <div className="cmp">
                <div className="cmp-row bad">
                  <div className="who">
                    <span className="ico" style={{ background: 'rgba(255,255,255,.1)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                        <path d="M3 8l9 6 9-6M3 8v10h18V8M3 8l9-5 9 5" strokeLinejoin="round" />
                      </svg>
                    </span>
                    OTA booking
                  </div>
                  <div><span style={{ fontSize: '12px', opacity: 0.7 }}>commission</span> <span className="pct">&#8722;22%</span></div>
                </div>
                <div className="cmp-row bad">
                  <div className="who">
                    <span className="ico" style={{ background: 'rgba(255,255,255,.1)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                        <path d="M12 8v4M12 16h.01" strokeLinecap="round" /><circle cx="12" cy="12" r="9" />
                      </svg>
                    </span>
                    Missed enquiry
                  </div>
                  <div><span style={{ fontSize: '12px', opacity: 0.7 }}>lost</span> <span className="pct">&#8722;100%</span></div>
                </div>
                <div className="cmp-row good">
                  <div className="who">
                    <span className="ico" style={{ background: 'rgba(198,242,78,.25)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C6F24E" strokeWidth="2.2">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    BizNavigo direct
                  </div>
                  <div><span style={{ fontSize: '12px', opacity: 0.8 }}>you keep</span> <span className="pct">100%</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section id="features" style={{ paddingTop: '40px' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Built to run itself</span>
            <h2>Your whole front desk, run by AI.</h2>
            <p>Every guest handled, first message to final payment.</p>
          </div>
          <div className="bento">
            <div className="card c-wide reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>One AI agent across every channel</h3>
              <p>Riya answers in seconds and closes the booking. Every conversation lands in one place.</p>
              <div className="double-vis">
                <span className="ota-chip"><span className="dt" style={{ background: '#25D366' }} />WhatsApp</span>
                <span className="ota-chip"><span className="dt" style={{ background: '#0E6B4F' }} />Website</span>
                <span className="ota-chip"><span className="dt" style={{ background: '#4285F4' }} />Google</span>
                <span className="shield">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  One inbox
                </span>
              </div>
            </div>
            <div className="card c-tall reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Never sell the same stay twice</h3>
              <p>One booking anywhere closes it everywhere instantly.</p>
              <span className="tagk">Always protected</span>
            </div>
            <div className="card c-third reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Know who is ready to book</h3>
              <p>Every enquiry comes in scored. Spend time on guests likely to book.</p>
              <div className="lead-vis">
                <div className="lead-item">
                  <span className="av2" style={{ background: '#0E6B4F' }}>RM</span>
                  <div><div style={{ fontSize: '12.5px', fontWeight: 600 }}>Ramesh M.</div></div>
                  <span className="sc hot">92 hot</span>
                </div>
                <div className="lead-item">
                  <span className="av2" style={{ background: '#E8913A' }}>AK</span>
                  <div><div style={{ fontSize: '12.5px', fontWeight: 600 }}>Anita K.</div></div>
                  <span className="sc warm">61 warm</span>
                </div>
              </div>
            </div>
            <div className="card c-third reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 109-9M3 12a9 9 0 019-9M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>No lead ever goes cold</h3>
              <p>Quiet enquiries get nudged. Past guests get brought back. All automatic.</p>
              <span className="tagk">Win-backs on autopilot</span>
            </div>
            <div className="card c-third reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v5H4zM4 13h7v7H4zM15 13h5v7h-5z" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Every booking, one place</h3>
              <p>Every channel, one view. Rates, check-ins, invoices handled.</p>
              <span className="tagk">Resort-first</span>
            </div>
            <div className="card c-half reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="7" r="3" /><circle cx="17" cy="9" r="2.5" />
                  <path d="M2 20c0-3 3-5 7-5s7 2 7 5M16 14c3 0 6 1.5 6 5" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Your partners always see the latest</h3>
              <p>Tour operators and travel agents see your live availability. No calls, no stale spreadsheets.</p>
              <div className="partner-vis">
                <div className="pnode"><div className="nm">Your resort</div><div className="rl">up to date</div></div>
                <span className="psync">&#8594;</span>
                <div className="pnode"><div className="nm">Tour operator</div><div className="rl">in step</div></div>
                <span className="psync">&#8594;</span>
                <div className="pnode"><div className="nm">Travel agent</div><div className="rl">in step</div></div>
              </div>
            </div>
            <div className="card c-half reveal">
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M8 4v16" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>AI employees that never sleep</h3>
              <p>Name them, assign a role, and they run. Morning brief waiting for you every day.</p>
              <div className="double-vis">
                <span className="ota-chip"><span className="dt" style={{ background: '#0E6B4F' }} />Riya &#183; reception</span>
                <span className="ota-chip"><span className="dt" style={{ background: '#E8913A' }} />Arjun &#183; follow-ups</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Live in a day</span>
            <h2>From setup to first booking, fast.</h2>
            <p>No tech team needed. If you can use WhatsApp, you can run BizNavigo.</p>
          </div>
          <div className="steps">
            <div className="step reveal">
              <div className="no">1</div>
              <h3>We get you set up</h3>
              <p>We handle setup with you, guided start to finish, usually in a day.</p>
            </div>
            <div className="step reveal">
              <div className="no">2</div>
              <h3>Add your stays</h3>
              <p>Add stays with photos and rates. Your AI agent starts answering guests immediately.</p>
            </div>
            <div className="step reveal">
              <div className="no">3</div>
              <h3>Watch direct bookings land</h3>
              <p>Guests get instant replies and book themselves. You wake up to confirmed stays.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD SHOWCASE */}
      <section id="dashboard">
        <div className="wrap">
          <div className="show reveal">
            <div className="show-head">
              <span className="eyebrow">Built for owners, not IT teams</span>
              <h2>The whole resort, on one screen.</h2>
              <p>Money in, who is arriving, what your AI closed overnight, readable in one glance.</p>
            </div>
            <div className="show-app">
              <div className="dash">
                <aside className="side">
                  <div className="brand">
                    <span className="m"><img src="/logo.png" alt="BizNavigo" /></span>
                    BizNavigo
                  </div>
                  <div className="nav-i on">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" />
                      <rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
                    </svg>
                    Today
                  </div>
                  <div className="nav-i">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" />
                    </svg>
                    Calendar
                  </div>
                  <div className="nav-i">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 11l9-7 9 7M5 10v10h14V10" strokeLinejoin="round" />
                    </svg>
                    Stays
                  </div>
                  <div className="nav-i">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinejoin="round" />
                    </svg>
                    Chats
                  </div>
                  <div className="nav-i">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="7" r="3" /><path d="M2 20c0-3 3-5 7-5s7 2 7 5" strokeLinecap="round" />
                    </svg>
                    Leads
                  </div>
                  <div className="nav-i">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M4 10h16M9 4v16" strokeLinejoin="round" />
                    </svg>
                    AI staff
                  </div>
                </aside>
                <main className="main">
                  <div className="greet">
                    <div><h4>Good morning, Suresh</h4><div className="sub">Tuesday, 24 June</div></div>
                    <div className="ai-on"><i />AI on duty</div>
                  </div>
                  <div className="kpis">
                    <div className="kpi"><div className="l">Collected today</div><div className="v">&#8377;68,000</div></div>
                    <div className="kpi"><div className="l">Occupancy</div><div className="v">5<small>/8</small></div></div>
                    <div className="kpi"><div className="l">Avg stay</div><div className="v">2.6<small> nt</small></div></div>
                    <div className="kpi"><div className="l">Dues pending</div><div className="v">&#8377;8,000</div></div>
                  </div>
                  <div className="panes">
                    <div className="pane">
                      <h5>Arriving today <span className="nudge">2 guests</span></h5>
                      <div className="arr">
                        <span className="a2" style={{ background: '#0E6B4F' }}>RM</span>
                        <div className="info">
                          <div className="nm">Ramesh family &#183; 4 guests</div>
                          <div className="meta">Lake View &#183; meals + bonfire</div>
                        </div>
                        <span className="pill paid">Paid</span>
                      </div>
                      <div className="arr">
                        <span className="a2" style={{ background: '#E8913A' }}>AK</span>
                        <div className="info">
                          <div className="nm">Anita &amp; Kiran &#183; 2 guests</div>
                          <div className="meta">Tree House &#183; 3 nights</div>
                        </div>
                        <span className="pill due">&#8377;4k due</span>
                      </div>
                      <h5 style={{ marginTop: '16px' }}>Stays tonight</h5>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px' }}>
                        <div className="cu">Lake</div><div className="cu">Garden</div><div className="cu">Valley</div><div className="cu">Tree</div>
                        <div className="cu">Honey</div><div className="cu empty">River</div><div className="cu empty">Bamboo</div><div className="cu empty">Cliff</div>
                      </div>
                    </div>
                    <div className="pane">
                      <h5>Riya handled overnight</h5>
                      <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center', marginBottom: '14px' }}>
                        <div><div style={{ fontWeight: 700, fontSize: '19px' }}>18</div><div style={{ fontSize: '10px', color: 'var(--ink-soft)' }}>enquiries</div></div>
                        <div><div style={{ fontWeight: 700, fontSize: '19px' }}>3</div><div style={{ fontSize: '10px', color: 'var(--ink-soft)' }}>booked</div></div>
                        <div><div style={{ fontWeight: 700, fontSize: '19px', color: '#B5470F' }}>2</div><div style={{ fontSize: '10px', color: 'var(--ink-soft)' }}>need you</div></div>
                      </div>
                      <h5>Bookings by channel</h5>
                      <div className="chrow"><span className="dt" style={{ width: '9px', height: '9px', borderRadius: '2px', background: '#25D366' }} /><span className="nm">WhatsApp direct</span><span className="ct">9</span></div>
                      <div className="bar"><i style={{ width: '60%', background: '#25D366' }} /></div>
                      <div className="chrow"><span className="dt" style={{ width: '9px', height: '9px', borderRadius: '2px', background: '#4285F4' }} /><span className="nm">Google Business</span><span className="ct">4</span></div>
                      <div className="bar"><i style={{ width: '27%', background: '#4285F4' }} /></div>
                      <div className="chrow"><span className="dt" style={{ width: '9px', height: '9px', borderRadius: '2px', background: '#0E6B4F' }} /><span className="nm">Website chatbot</span><span className="ct">2</span></div>
                      <div className="bar"><i style={{ width: '13%', background: '#0E6B4F' }} /></div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OWNER APP */}
      <section id="app" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="app-wrap">
            <div className="app-text reveal">
              <span className="eyebrow">In your pocket</span>
              <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', marginTop: '14px' }}>Your whole resort, on your phone.</h2>
              <p style={{ fontSize: '16px', color: 'var(--ink-soft)', marginTop: '14px' }}>Every booking, lead, and due in your pocket.</p>
              <div className="app-feats">
                <div className="app-feat">
                  <span className="afi">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h4>Know the second it happens</h4>
                    <p>New booking, payment received, guest checking in, you get a ping right away.</p>
                  </div>
                </div>
                <div className="app-feat">
                  <span className="afi">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 108 0 4 4 0 00-8 0M23 21v-2a4 4 0 00-3-3.87" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h4>Every lead, saved for you</h4>
                    <p>No enquiry slips through. See who asked and follow up in a tap.</p>
                  </div>
                </div>
                <div className="app-feat">
                  <span className="afi">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <h4>Always know what to do next</h4>
                    <p>A clear daily view of arrivals, dues and anything that needs you.</p>
                  </div>
                </div>
              </div>
              <div className="store-row">
                <a href="#demo" className="store-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.04c-.03-2.6 2.12-3.84 2.21-3.9-1.2-1.76-3.08-2-3.75-2.03-1.6-.16-3.12.94-3.93.94-.8 0-2.05-.92-3.37-.9-1.74.03-3.34 1.01-4.23 2.57-1.8 3.13-.46 7.76 1.29 10.3.85 1.24 1.87 2.63 3.2 2.58 1.28-.05 1.77-.83 3.32-.83 1.55 0 1.99.83 3.35.8 1.38-.02 2.26-1.26 3.11-2.51.98-1.44 1.38-2.84 1.4-2.91-.03-.01-2.69-1.03-2.72-4.08M14.5 4.5c.71-.86 1.19-2.05 1.06-3.24-1.02.04-2.26.68-2.99 1.54-.65.76-1.23 1.98-1.08 3.14 1.14.09 2.3-.58 3.01-1.44" /></svg>
                  <span><span className="sl">Download on the</span><span className="sb">App Store</span></span>
                </a>
                <a href="#demo" className="store-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 2.4c-.3.3-.5.8-.5 1.4v16.4c0 .6.2 1.1.5 1.4l.1.1L13 12.1v-.2L3.7 2.3M16.5 15.3L13.3 12 16.5 8.7l3.8 2.2c1.1.6 1.1 1.7 0 2.3l-3.8 2.1M13.3 12L3.6 21.6c.4.3.9.4 1.5.1l11.4-6.4M16.5 8.7L5.1 2.3c-.6-.3-1.1-.2-1.5.1L13.3 12" /></svg>
                  <span><span className="sl">Get it on</span><span className="sb">Google Play</span></span>
                </a>
              </div>
            </div>
            <div className="app-phone-col reveal">
              <div className="app-badge-float abf-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div><div className="bt">New booking</div><div className="bs">&#8377;6,500 &#183; Lake View</div></div>
              </div>
              <div className="app-badge-float abf-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 108 0 4 4 0 00-8 0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div><div className="bt">New lead</div><div className="bs">Asked about weekend</div></div>
              </div>
              <div className="app-phone">
                <div className="app-screen">
                  <div className="app-top">
                    <div className="hi">Good morning</div>
                    <div className="rn">Misty Hills Resort</div>
                    <span className="pill"><i /> AI handling enquiries</span>
                  </div>
                  <div className="app-body-inner">
                    <div className="app-notif">
                      <span className="ni" style={{ background: 'var(--mist)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div><div className="nt">Booking confirmed</div><div className="ns">Ramesh family &#183; Lake View &#183; 2 nights</div></div>
                      <span className="ntime">2m</span>
                    </div>
                    <div className="app-notif">
                      <span className="ni" style={{ background: '#FDEEDD' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#E8913A" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 108 0 4 4 0 00-8 0" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div><div className="nt">New lead captured</div><div className="ns">Anita asked about this weekend</div></div>
                      <span className="ntime">9m</span>
                    </div>
                    <div className="app-notif">
                      <span className="ni" style={{ background: 'var(--mist)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" />
                          <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <div><div className="nt">Payment received</div><div className="ns">&#8377;6,500 advance &#183; auto-confirmed</div></div>
                      <span className="ntime">14m</span>
                    </div>
                    <div className="app-cta-row">
                      <span className="ab p">View today</span>
                      <span className="ab g">All leads</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Plans that grow with you</span>
            <h2>One platform, priced to your property.</h2>
            <p>We will tailor it to your size in a quick call.</p>
          </div>
          <div className="price-grid">
            <div className="plan reveal">
              <div className="nm">STARTER</div>
              <div className="tierbar"><i className="on" /><i /><i /></div>
              <div className="quote">Built for independent stays</div>
              <div className="quote-sub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Made to fit a small budget
              </div>
              <ul>
                <li><CheckIcon />AI chatbot that answers and books</li>
                <li><CheckIcon />Instant booking alerts</li>
                <li><CheckIcon />Every lead captured</li>
                <li><CheckIcon />Owner app + web dashboard</li>
                <li><CheckIcon />Up to 5 stays</li>
              </ul>
              <a href="#demo" className="btn btn-ghost">Get a quote</a>
            </div>
            <div className="plan feat reveal">
              <span className="badge">Most popular</span>
              <div className="nm">GROWTH</div>
              <div className="tierbar"><i className="on" /><i className="on" /><i /></div>
              <div className="quote">For resorts going all-in</div>
              <div className="quote-sub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M13 2L3 14h7l-1 8 10-12h-7z" strokeLinejoin="round" />
                </svg>
                Most owners start here
              </div>
              <ul>
                <li><span className="incl">Everything in Starter, plus</span></li>
                <li><CheckIcon />AI across every channel</li>
                <li><CheckIcon />Smart leads + auto follow-ups</li>
                <li><CheckIcon />Take payments in chat</li>
              </ul>
              <a href="#demo" className="btn btn-primary">Book a free demo</a>
            </div>
            <div className="plan reveal">
              <div className="nm">PARTNER</div>
              <div className="tierbar"><i className="on" /><i className="on" /><i className="on" /></div>
              <div className="quote">For groups and chains</div>
              <div className="quote-sub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" strokeLinejoin="round" />
                </svg>
                Tailored to your network
              </div>
              <ul>
                <li><span className="incl">Everything in Growth, plus</span></li>
                <li><CheckIcon />Partners always in sync</li>
                <li><CheckIcon />Multiple properties + AI employees</li>
                <li><CheckIcon />Priority support</li>
              </ul>
              <a href="#demo" className="btn btn-ghost">Talk to us</a>
            </div>
          </div>
          <div className="price-trust reveal">
            {['No setup fees', 'Cancel anytime', 'No long contracts', 'Pay only for what fits'].map((t) => (
              <span className="pt" key={t}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="demo">
        <div className="wrap">
          <div className="final reveal">
            <h2>Your next guest is already messaging you.</h2>
            <p>See how BizNavigo turns enquiries into direct bookings in a free 20-minute demo.</p>
            <div className="acts">
              <a href="mailto:biznavigateapp@gmail.com?subject=Demo Request" className="btn btn-lime">
                Book a free demo
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://wa.me/919999999999?text=Hi%20BizNavigo" className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.25)' }}>
                Message us on WhatsApp
              </a>
            </div>
            <p className="fine">No credit card &#183; Set up in a day &#183; Made for Indian resorts</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a href="/" className="logo">
                <span className="mark"><img src="/logo.png" alt="BizNavigo logo" /></span>
                BizNavigo<span className="dot">.</span>
              </a>
              <p>The omnichannel AI booking agent for resorts. Win direct bookings, keep your commissions.</p>
              <a href="https://biznavigo.com/resorts" style={{ display: 'inline-block', marginTop: '12px', fontSize: '13px', color: 'var(--ink-soft)' }}>
                Resort booking platform &#8594; <span style={{ color: 'var(--green)', fontWeight: 600 }}>biznavigo.com/resorts</span>
              </a>
              <span className="foot-badge" style={{ marginTop: '10px' }}>
                <span className="wa"><svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 00-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2z" /></svg></span>
                <span>Official Meta Tech Provider</span>
              </span>
              <a href="mailto:biznavigateapp@gmail.com" className="foot-mail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" />
                </svg>
                biznavigateapp@gmail.com
              </a>
            </div>
            <div className="foot-col">
              <h6>Product</h6>
              <a href="#features">Features</a>
              <a href="#dashboard">Dashboard</a>
              <a href="#pricing">Plans</a>
              <a href="#how">How it works</a>
            </div>
            <div className="foot-col">
              <h6>Verticals</h6>
              <a href="#">Resorts &amp; stays</a>
              <a href="#">Cottages &amp; homestays</a>
              <a href="#">Boutique hotels</a>
              <a href="#">Partner network</a>
            </div>
            <div className="foot-col">
              <h6>Company</h6>
              <a href="#">About</a>
              <a href="mailto:biznavigateapp@gmail.com">Contact</a>
              <a href="#demo">Book a demo</a>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
          <div className="foot-bot">
            <p>&#169; 2026 BizNavigo. All rights reserved.</p>
            <p className="made">Built in India for Indian resorts</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
