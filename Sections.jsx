// Sections.jsx — how it works, features, quote, FAQ, CTA, footer
const { useState } = React;

function HowItWorks() {
  const steps = [
    {
      n: '01',
      label: 'SETUP',
      body: 'Enter your role, hourly rate, block-out time, and scheduled block duration. Thirty seconds, once per trip.',
      img: './assets/mockup-setup.png',
      alt: 'Setup screen',
    },
    {
      n: '02',
      label: 'COUNTDOWN',
      body: 'OverBlock counts down to the exact moment you exceed scheduled block. An amber timer. Nothing else.',
      img: './assets/mockup-countdown.png',
      alt: 'Countdown screen',
    },
    {
      n: '03',
      label: 'EARN',
      body: 'The moment you cross, mint-teal numbers start climbing. Per-pilot, per-crew, glanceable from any distance.',
      img: './assets/mockup-earnings.png',
      alt: 'Earnings screen',
    },
  ];

  return (
    <section className="how">
      <div className="how__inner">
        <div className="section__kicker">HOW IT WORKS</div>
        <h2 className="section__title">Three screens. No noise.</h2>
        <div className="how__grid">
          {steps.map(s => (
            <div key={s.n} className="how__step">
              <div className="how__step-top">
                <div className="how__num">{s.n}</div>
                <div className="how__label">{s.label}</div>
                <p className="how__body">{s.body}</p>
              </div>
              <img src={s.img} alt={s.alt} className="how__img"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { t: 'PER-PILOT SPLIT',     b: 'Captain and First Officer tracked separately. Different rates, different OT multipliers, one crew total.' },
    { t: 'LOCAL OR ZULU',       b: 'Enter block-out in whatever timezone your brain is already in. HHMM in, HH:MM:SS out.' },
    { t: 'RIG / CREDIT AWARE',  b: 'Optional credit adjustment handles rig rules so the effective rate reflects what you actually made.' },
    { t: 'NO SIGN-IN, NO CLOUD',b: 'All math happens on device. No accounts, no servers, no telemetry. Your schedule stays yours.' },
    { t: 'COCKPIT READABLE',    b: 'Designed to be read at a glance in dim light at arm\'s length. No ornament. No soft shapes.' },
    { t: 'HAPTIC ON OVERBLOCK', b: 'A single heavy impact the moment scheduled block ticks over. You feel it before you see it.' },
  ];

  return (
    <section className="features">
      <div className="features__inner">
        <div className="section__kicker">FEATURES</div>
        <h2 className="section__title">Built like an instrument.</h2>
        <div className="features__grid">
          {items.map(i => (
            <div key={i.t} className="feature">
              <div className="feature__t">{i.t}</div>
              <p className="feature__b">{i.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="quote-section">
      <div className="quote-section__inner">
        <div className="quote__mark" aria-hidden="true">"</div>
        <blockquote className="quote__body">
          Every pilot has done this math on a cocktail napkin at 3am.
          OverBlock is the first tool that shows it the way we actually think about it —
          the clock is running, this is what we're owed.
        </blockquote>
        <div className="quote__builtby">
          BUILT BY A FRONTIER AIRLINES FIRST OFFICER
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  const qs = [
    {
      q: 'Does OverBlock work for any airline?',
      a: 'Yes. OverBlock is a calculator — it doesn\'t integrate with any airline system. You enter your rate, your block-out time, and your scheduled block. It handles the rest, regardless of carrier.',
    },
    {
      q: 'What about rig and credit rules?',
      a: 'OverBlock supports an optional credit adjustment (in minutes) applied at session start. This covers the most common rig patterns. We don\'t claim to model every CBA in the US — that complexity is intentionally left to you.',
    },
    {
      q: 'Does it store or upload my data?',
      a: 'No. Every session is local to the device. Nothing is uploaded, nothing is synced, nothing is logged. Close the app and the session is gone.',
    },
    {
      q: 'When does beta open?',
      a: 'TestFlight invites roll weekly. Request access below and we\'ll send a link as soon as a slot opens.',
    },
    {
      q: 'Android?',
      a: 'Not today. iOS only for V1.',
    },
  ];

  return (
    <section className="faq">
      <div className="faq__inner">
        <div className="section__kicker">FAQ</div>
        <h2 className="section__title">Common questions.</h2>
        <div className="faq__list">
          {qs.map((item, i) => (
            <div key={i} className="faq__item">
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{item.q}</span>
                <span className="faq__plus">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <div className="faq__a">{item.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="cta-section">
      <div className="cta-section__glow" aria-hidden="true"/>
      <div className="cta-section__inner">
        <h2 className="cta-section__title">Get the beta.</h2>
        <p className="cta-section__sub">iPhone · iOS 26 · TestFlight invites rolling weekly</p>
        <form className="cta-section__form" onSubmit={(e) => { e.preventDefault(); alert('Thanks — we\'ll be in touch.'); }}>
          <input type="email" placeholder="pilot@airline.com" required/>
          <button type="submit">REQUEST BETA ACCESS</button>
        </form>
        <div className="cta-section__badge">
          <div className="appstore-badge">
            <div className="appstore-badge__top">COMING TO THE</div>
            <div className="appstore-badge__bottom">App Store</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <div className="footer__wordmark">OVERBLOCK</div>
          <div className="footer__tagline">Real-time overblock pay for airline pilots.</div>
        </div>
        <div className="footer__links">
          <a href="mailto:debrey2021@gmail.com">Support</a>
          <a href="#">Privacy</a>
        </div>
        <div className="footer__meta">
          © 2026 OverBlock. Not affiliated with any airline or pilot union.
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { HowItWorks, Features, Testimonial, Faq, FinalCta, Footer });
