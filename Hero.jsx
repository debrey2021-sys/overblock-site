// Hero.jsx — live earnings counter + device mockup
const { useState, useEffect, useRef } = React;

function LiveCounter({ rate = 312.5 }) {
  const [value, setValue] = useState(0);
  const [flash, setFlash] = useState(0);
  const lastMilestoneRef = useRef(0);
  const startRef = useRef(null);

  useEffect(() => {
    startRef.current = performance.now();
    let raf;
    const tick = (t) => {
      const elapsedSec = (t - startRef.current) / 1000;
      const v = (rate / 3600) * elapsedSec;
      setValue(v);
      const milestone = Math.floor(v / 10) * 10;
      if (milestone > lastMilestoneRef.current) {
        lastMilestoneRef.current = milestone;
        setFlash(1);
        setTimeout(() => setFlash(0), 1600);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rate]);

  return (
    <div className="live-counter">
      <div className="live-counter__flash" style={{ opacity: flash * 0.18 }}/>
      <div className="live-counter__label">CREW EARNINGS · LIVE</div>
      <div className="live-counter__value">
        <span className="live-counter__dollar">$</span>
        {value.toFixed(2)}
      </div>
      <div className="live-counter__meta">
        <span className="live-counter__dot"/>
        $312.50/HR · 1.25× OT · OVERBLOCK ACTIVE
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      {/* Ambient glow — decorative background element */}
      <div className="hero__glow" aria-hidden="true"/>

      <div className="hero__grid">
        {/* LEFT — copy + CTA */}
        <div className="hero__copy">
          <div className="hero__eyebrow">FOR US COMMERCIAL PILOTS</div>
          <h1 className="hero__headline">
            The minute you go<br/>overblock, you're<br/>
            <span className="hero__accent">earning.</span>
          </h1>
          <p className="hero__sub">
            OverBlock calculates the exact moment your flight exceeds scheduled block time
            and shows live per-pilot pay accumulating in real time. No math. No guessing.
          </p>
          <form className="hero__cta" onSubmit={(e) => { e.preventDefault(); alert('Thanks — we\'ll be in touch.'); }}>
            <input type="email" placeholder="pilot@airline.com" required className="hero__email"/>
            <button type="submit" className="hero__btn">REQUEST BETA</button>
          </form>
          <p className="hero__note">iPhone · iOS 26 · TestFlight invites rolling weekly</p>
        </div>

        {/* RIGHT — live counter stacked above device */}
        <div className="hero__right">
          <LiveCounter/>
          <div className="hero__device">
            <div className="hero__device-glow" aria-hidden="true"/>
            <img
              src="./assets/mockup-live-view.png"
              alt="OverBlock live earnings screen"
              className="hero__device-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Giant variant — full-width counter hero */
function GiantHero() {
  return (
    <section className="hero hero--giant">
      <div className="hero__glow" aria-hidden="true"/>
      <div className="hero__giant-inner">
        <div className="hero__eyebrow" style={{ textAlign: 'center', marginBottom: 32 }}>
          FOR US COMMERCIAL PILOTS · OVERBLOCK
        </div>
        <LiveCounter rate={520}/>
        <h1 className="hero__headline" style={{ textAlign: 'center', marginTop: 48 }}>
          The minute you go overblock,<br/>
          <span className="hero__accent">you're earning.</span>
        </h1>
        <form className="hero__cta hero__cta--centered" onSubmit={(e) => { e.preventDefault(); alert('Thanks!'); }}>
          <input type="email" placeholder="pilot@airline.com" required className="hero__email"/>
          <button type="submit" className="hero__btn">REQUEST BETA</button>
        </form>
      </div>
    </section>
  );
}

/* Split variant — countdown left, active right */
function SplitHero() {
  return (
    <section className="hero">
      <div className="hero__glow" aria-hidden="true"/>
      <div className="hero__split">
        <div className="hero__split-col">
          <div className="hero__eyebrow">STEP 1 · COUNTDOWN</div>
          <div className="hero__countdown-timer">00:07:32</div>
          <div className="hero__countdown-label">EARNINGS BEGIN IN</div>
          <img src="./assets/mockup-countdown.png" alt="Countdown screen" className="hero__split-img"/>
        </div>
        <div className="hero__split-divider"/>
        <div className="hero__split-col">
          <div className="hero__eyebrow">STEP 2 · EARNING</div>
          <LiveCounter/>
          <img src="./assets/mockup-earnings.png" alt="Earnings screen" className="hero__split-img"/>
        </div>
      </div>
      <div className="hero__split-foot">
        <h1 className="hero__headline" style={{ textAlign: 'center' }}>
          Two moments. <span className="hero__accent">One app.</span>
        </h1>
        <form className="hero__cta hero__cta--centered" onSubmit={(e) => { e.preventDefault(); alert('Thanks!'); }}>
          <input type="email" placeholder="pilot@airline.com" required className="hero__email"/>
          <button type="submit" className="hero__btn">REQUEST BETA</button>
        </form>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, GiantHero, SplitHero, LiveCounter });
