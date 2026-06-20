import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEO from "@/components/SEO";

const About = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".ddi-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ddi-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <SEO
        title="About Us | DigitalDynasty Imperium"
        description="We don't sell courses. We sell career independence. DDI equips young Nigerians with high-demand digital skills, real experience, and confidence to earn on their own terms."
        path="/about"
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .ddi-page {
          --ddi-purple: #49228C;
          --ddi-purple-mid: #7B4FBF;
          --ddi-purple-soft: #EDE5F8;
          --ddi-dark: #0D0A1A;
          --ddi-dark-2: #1A1530;
          --ddi-cream: #0D0A1A;
          --ddi-white: #1A1530;
          --ddi-muted: rgba(255,255,255,0.65);
          --ddi-border: rgba(255,255,255,0.08);
          --ddi-purple-soft: rgba(123,79,191,0.18);
          font-family: 'Inter', sans-serif;
          background: var(--ddi-cream);
          color: var(--ddi-dark);
          overflow-x: hidden;
        }

        .ddi-page .ddi-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .ddi-page .ddi-reveal.ddi-visible { opacity: 1; transform: none; }
        .ddi-page .ddi-reveal-delay-1 { transition-delay: 0.1s; }
        .ddi-page .ddi-reveal-delay-2 { transition-delay: 0.2s; }
        .ddi-page .ddi-reveal-delay-3 { transition-delay: 0.3s; }
        .ddi-page .ddi-reveal-delay-4 { transition-delay: 0.4s; }

        .ddi-page .ddi-hero {
          background: var(--ddi-dark);
          min-height: 80svh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 6rem 2rem 4rem;
          position: relative;
          overflow: hidden;
        }
        .ddi-page .ddi-hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(73,34,140,0.45) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(123,79,191,0.2) 0%, transparent 60%);
          pointer-events: none;
        }
        .ddi-page .ddi-hero-eyebrow {
          font-size: 11px; font-weight: 500; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--ddi-purple-mid); margin-bottom: 1.5rem;
        }
        .ddi-page .ddi-hero-title {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(42px, 7vw, 96px);
          font-weight: 800; line-height: 1.0;
          color: var(--ddi-white); margin-bottom: 2rem; max-width: 900px;
        }
        .ddi-page .ddi-hero-title em {
          font-family: 'Poppins', serif;
          font-style: italic; color: var(--ddi-purple-mid);
        }
        .ddi-page .ddi-hero-sub {
          font-size: clamp(16px, 2vw, 20px); font-weight: 300; line-height: 1.75;
          color: rgba(255,255,255,0.6); max-width: 560px; margin-bottom: 3rem;
        }
        .ddi-page .ddi-hero-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--ddi-purple); color: #fff;
          font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500;
          padding: 16px 32px; border-radius: 4px; text-decoration: none;
          border: none; cursor: pointer; transition: background 0.2s; width: fit-content;
        }
        .ddi-page .ddi-hero-cta:hover { background: var(--ddi-purple-mid); }

        .ddi-page .ddi-section { max-width: 1100px; margin: 0 auto; padding: 6rem 2rem; }

        .ddi-page .ddi-eyebrow {
          font-size: 11px; font-weight: 500; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--ddi-purple); margin-bottom: 1rem;
        }
        .ddi-page .ddi-h2 {
          font-family: 'Poppins', sans-serif;
          font-size: clamp(30px, 4vw, 52px); font-weight: 700; line-height: 1.1;
          color: var(--ddi-dark); margin-bottom: 1.5rem;
        }
        .ddi-page .ddi-h2 em {
          font-family: 'Poppins', serif; font-style: italic;
          color: var(--ddi-purple-mid); font-weight: 400;
        }
        .ddi-page .ddi-body {
          font-size: clamp(16px, 1.6vw, 18px); line-height: 1.8;
          color: var(--ddi-muted); max-width: 640px;
        }

        .ddi-page .ddi-sell-block { background: var(--ddi-cream); padding: 5rem 2rem; }
        .ddi-page .ddi-sell-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;
        }
        @media (max-width: 720px) { .ddi-page .ddi-sell-inner { grid-template-columns: 1fr; gap: 2.5rem; } }
        .ddi-page .ddi-sell-block .ddi-eyebrow { color: var(--ddi-purple); }
        .ddi-page .ddi-sell-block .ddi-h2 { color: var(--ddi-dark); }
        .ddi-page .ddi-sell-block .ddi-body { color: var(--ddi-muted); }
        .ddi-page .ddi-skills-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2px; }
        .ddi-page .ddi-skill-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0; border-bottom: 0.5px solid var(--ddi-border);
          font-family: 'Poppins', sans-serif; font-size: clamp(15px, 1.8vw, 18px);
          font-weight: 500; color: var(--ddi-dark); transition: color 0.2s; cursor: default;
        }
        .ddi-page .ddi-skill-item:hover { color: var(--ddi-purple); }
        .ddi-page .ddi-skill-arrow { font-size: 12px; color: var(--ddi-muted); transition: color 0.2s, transform 0.2s; }
        .ddi-page .ddi-skill-item:hover .ddi-skill-arrow { color: var(--ddi-purple); transform: translateX(4px); }

        .ddi-page .ddi-phases { background: var(--ddi-cream); }
        .ddi-page .ddi-phases-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1px; border: 1px solid var(--ddi-border); border-radius: 8px;
          overflow: hidden; margin-top: 3rem; background: var(--ddi-border);
        }
        .ddi-page .ddi-phase-card {
          background: var(--ddi-white); padding: 2rem 1.75rem 2.5rem;
          display: flex; flex-direction: column; gap: 0.75rem;
          transition: background 0.25s; cursor: default;
        }
        .ddi-page .ddi-phase-card:hover { background: var(--ddi-purple-soft); }
        .ddi-page .ddi-phase-num { font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ddi-purple-mid); }
        .ddi-page .ddi-phase-weeks { font-size: 11px; color: var(--ddi-muted); font-weight: 400; }
        .ddi-page .ddi-phase-title { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 700; color: var(--ddi-dark); line-height: 1.3; }
        .ddi-page .ddi-phase-desc { font-size: 13.5px; line-height: 1.7; color: var(--ddi-muted); }

        .ddi-page .ddi-stats { background: var(--ddi-purple); padding: 3rem 2rem; }
        .ddi-page .ddi-stats-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 2rem; text-align: center;
        }
        .ddi-page .ddi-stat-num { font-family: 'Poppins', sans-serif; font-size: 48px; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 0.4rem; }
        .ddi-page .ddi-stat-label { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.5; }

        .ddi-page .ddi-why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 3rem; }
        @media (max-width: 640px) { .ddi-page .ddi-why-grid { grid-template-columns: 1fr; } }
        .ddi-page .ddi-why-card {
          border: 0.5px solid var(--ddi-border); border-radius: 8px;
          padding: 2rem 1.75rem 2.5rem; background: var(--ddi-white);
          transition: box-shadow 0.25s, transform 0.25s; cursor: default;
        }
        .ddi-page .ddi-why-card:hover { box-shadow: 0 12px 40px rgba(73,34,140,0.08); transform: translateY(-3px); }
        .ddi-page .ddi-why-icon {
          width: 42px; height: 42px; background: var(--ddi-purple-soft); border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem; font-size: 20px; color: var(--ddi-purple);
        }
        .ddi-page .ddi-why-card h3 { font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700; color: var(--ddi-dark); margin-bottom: 0.6rem; }
        .ddi-page .ddi-why-card p { font-size: 14px; line-height: 1.75; color: var(--ddi-muted); }

        .ddi-page .ddi-who { background: var(--ddi-cream); padding: 6rem 2rem; border-top: 1px solid var(--ddi-border); }
        .ddi-page .ddi-who-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
        }
        @media (max-width: 720px) { .ddi-page .ddi-who-inner { grid-template-columns: 1fr; gap: 3rem; } }
        .ddi-page .ddi-who .ddi-eyebrow { color: var(--ddi-purple); }
        .ddi-page .ddi-who .ddi-h2 { color: var(--ddi-dark); margin-bottom: 1rem; }
        .ddi-page .ddi-who .ddi-body { color: var(--ddi-muted); margin-bottom: 1.5rem; max-width: 100%; }
        .ddi-page .ddi-values { display: flex; flex-direction: column; gap: 0; margin-top: 1rem; }
        .ddi-page .ddi-value-row { display: flex; align-items: flex-start; gap: 1rem; padding: 1.25rem 0; border-bottom: 0.5px solid var(--ddi-border); }
        .ddi-page .ddi-value-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ddi-purple); margin-top: 7px; flex-shrink: 0; }
        .ddi-page .ddi-value-name { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--ddi-dark); margin-bottom: 3px; }
        .ddi-page .ddi-value-desc { font-size: 13px; line-height: 1.65; color: var(--ddi-muted); }
        .ddi-page .ddi-personas { display: flex; flex-direction: column; gap: 12px; }
        .ddi-page .ddi-persona-chip {
          background: var(--ddi-white); border: 0.5px solid var(--ddi-border); border-radius: 6px;
          padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 4px;
          transition: background 0.2s; cursor: default;
        }
        .ddi-page .ddi-persona-chip:hover { background: var(--ddi-purple-soft); }
        .ddi-page .ddi-persona-name { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: var(--ddi-dark); }
        .ddi-page .ddi-persona-desc { font-size: 13px; color: var(--ddi-muted); line-height: 1.5; }

        .ddi-page .ddi-vision { background: var(--ddi-cream); padding: 6rem 2rem; text-align: center; }
        .ddi-page .ddi-vision-inner { max-width: 800px; margin: 0 auto; }
        .ddi-page .ddi-vision-quote {
          font-family: 'Poppins', serif; font-style: italic;
          font-size: clamp(24px, 3.5vw, 42px); line-height: 1.4;
          color: var(--ddi-dark); margin-bottom: 1.5rem;
        }
        .ddi-page .ddi-vision-quote span { color: var(--ddi-purple); }
        .ddi-page .ddi-vision-attr { font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ddi-muted); }

        .ddi-page .ddi-closing { background: var(--ddi-purple); padding: 6rem 2rem; text-align: center; }
        .ddi-page .ddi-closing-inner { max-width: 680px; margin: 0 auto; }
        .ddi-page .ddi-closing h2 { font-family: 'Poppins', sans-serif; font-size: clamp(28px, 4vw, 52px); font-weight: 800; color: #fff; line-height: 1.1; margin-bottom: 1.25rem; }
        .ddi-page .ddi-closing p { font-size: 17px; line-height: 1.75; color: rgba(255,255,255,0.6); margin-bottom: 2.5rem; }
        .ddi-page .ddi-closing-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .ddi-page .ddi-btn-primary {
          background: #fff; color: var(--ddi-purple);
          font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500;
          padding: 16px 32px; border-radius: 4px; border: none; cursor: pointer;
          text-decoration: none; transition: opacity 0.2s;
        }
        .ddi-page .ddi-btn-primary:hover { opacity: 0.9; }
        .ddi-page .ddi-btn-ghost {
          background: transparent; color: #fff;
          font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 500;
          padding: 16px 32px; border-radius: 4px; border: 1.5px solid rgba(255,255,255,0.35);
          cursor: pointer; text-decoration: none; transition: border-color 0.2s;
        }
        .ddi-page .ddi-btn-ghost:hover { border-color: rgba(255,255,255,0.7); }

        @media (max-width: 640px) {
          .ddi-page .ddi-hero { padding: 5rem 1.25rem 3rem; min-height: 70svh; }
          .ddi-page .ddi-hero-sub { margin-bottom: 2rem; }
          .ddi-page .ddi-hero-cta { width: 100%; justify-content: center; padding: 14px 20px; }
          .ddi-page .ddi-section { padding: 4rem 1.25rem; }
          .ddi-page .ddi-sell-block { padding: 4rem 1.25rem; }
          .ddi-page .ddi-who { padding: 4rem 1.25rem; }
          .ddi-page .ddi-vision { padding: 4rem 1.25rem; }
          .ddi-page .ddi-closing { padding: 4rem 1.25rem; }
          .ddi-page .ddi-stats { padding: 2.5rem 1.25rem; }
          .ddi-page .ddi-stats-inner { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .ddi-page .ddi-stat-num { font-size: 36px; }
          .ddi-page .ddi-phases-grid { grid-template-columns: 1fr; }
          .ddi-page .ddi-closing-btns { flex-direction: column; gap: 10px; }
          .ddi-page .ddi-btn-primary,
          .ddi-page .ddi-btn-ghost { width: 100%; text-align: center; padding: 14px 20px; }
          .ddi-page .ddi-skill-item { font-size: 15px; padding: 14px 0; }
        }
      `}</style>

      <div className="ddi-page">
        {/* HERO */}
        <section className="ddi-hero">
          <div className="ddi-hero-bg" />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p className="ddi-hero-eyebrow ddi-reveal">Digital Dynasty Imperium · Lagos, Nigeria</p>
            <h1 className="ddi-hero-title ddi-reveal ddi-reveal-delay-1">
              We don't sell courses.<br />
              We sell <em>career independence.</em>
            </h1>
            <p className="ddi-hero-sub ddi-reveal ddi-reveal-delay-2">
              Built for young Nigerians who refuse to be left behind. DDI equips you with high-demand digital skills, real-world experience, and the confidence to earn on your own terms — permanently.
            </p>
            <Link to="/services" className="ddi-hero-cta ddi-reveal ddi-reveal-delay-3">
              Claim your seat →
            </Link>
          </div>
        </section>

        {/* WHAT WE SELL */}
        <section className="ddi-sell-block">
          <div className="ddi-sell-inner">
            <div>
              <p className="ddi-eyebrow ddi-reveal">What we sell</p>
              <h2 className="ddi-h2 ddi-reveal ddi-reveal-delay-1">
                Skills that pay.<br />
                <em>Confidence that lasts.</em>
              </h2>
              <p className="ddi-body ddi-reveal ddi-reveal-delay-2">
                Every skill we teach has a clear earning pathway — freelance, agency, remote employment, or your own business. We don't teach theory for its own sake. We teach what works in the market, right now, for someone starting from exactly where you are.
              </p>
            </div>
            <div>
              <ul className="ddi-skills-list ddi-reveal ddi-reveal-delay-1">
                {[
                  "Content Writing",
                  "Social Media Management",
                  "Copywriting",
                  "Graphic Design",
                  "Video Editing & AI Video Creation",
                  "Web Development",
                ].map((skill) => (
                  <li key={skill} className="ddi-skill-item">
                    {skill}
                    <span className="ddi-skill-arrow">→</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HOW WE DO IT */}
        <section className="ddi-phases">
          <div className="ddi-section">
            <p className="ddi-eyebrow ddi-reveal">How we do it</p>
            <h2 className="ddi-h2 ddi-reveal ddi-reveal-delay-1">
              A structured journey.<br />
              <em>Not just a class.</em>
            </h2>
            <p className="ddi-body ddi-reveal ddi-reveal-delay-2">
              DDI is an 8-week programme with a clear four-phase structure. Every phase has a purpose. Every week ends with an outcome you can point to. This is not passive learning — it is active transformation.
            </p>

            <div className="ddi-phases-grid">
              {[
                { num: "Phase 01", weeks: "Weeks 1–5", title: "Theory & Foundations", desc: "You build a solid foundation — from core principles to intermediate application. Instructor-led, with guided exercises at every step so you never just sit and listen." },
                { num: "Phase 02", weeks: "Weeks 6–7", title: "Intensive Practical", desc: "No new theory. Only application. Real client briefs, simulations, and peer-reviewed work. You leave with actual deliverables — not just notes." },
                { num: "Phase 03", weeks: "Week 8 — Compulsory", title: "Bootcamp", desc: "Your career launch week runs alongside the final practical phase. Monetisation masterclasses, industry guests, live pitching, and your personal 90-day income plan." },
                { num: "Phase 04", weeks: "Post-Programme", title: "Internship Pathway", desc: "DDI arranges placements with vetted partner organisations. Real work, real contribution, and a verified portfolio piece before you apply for your first client or role." },
              ].map((phase, i) => (
                <div key={phase.num} className={`ddi-phase-card ddi-reveal ddi-reveal-delay-${i + 1}`}>
                  <div>
                    <p className="ddi-phase-num">{phase.num}</p>
                    <p className="ddi-phase-weeks">{phase.weeks}</p>
                  </div>
                  <h3 className="ddi-phase-title">{phase.title}</h3>
                  <p className="ddi-phase-desc">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className="ddi-stats">
          <div className="ddi-stats-inner">
            {[
              { num: "8", label: "Weeks to transform\nyour earning power" },
              { num: "70%", label: "Minimum score\nrequired to certify" },
              { num: "75%", label: "Attendance required\nto certify" },
              { num: "18–40", label: "Age range we\nbuild careers for" },
            ].map((s) => (
              <div key={s.num} className="ddi-reveal">
                <div className="ddi-stat-num">{s.num}</div>
                <div className="ddi-stat-label" style={{ whiteSpace: "pre-line" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* WHY WE DO IT */}
        <section className="ddi-phases">
          <div className="ddi-section">
            <p className="ddi-eyebrow ddi-reveal">Why we do it</p>
            <h2 className="ddi-h2 ddi-reveal ddi-reveal-delay-1">
              The old system isn't working.<br />
              <em>We refuse to pretend otherwise.</em>
            </h2>
            <p className="ddi-body ddi-reveal ddi-reveal-delay-2">
              A degree is not a guarantee anymore. The job market is brutal. AI is reshaping every industry. And most young Nigerians are left to figure it out alone. DDI exists because career independence shouldn't be a privilege — it should be a right.
            </p>

            <div className="ddi-why-grid">
              {[
                { icon: "🔓", title: "To unlock access", body: "High-quality digital training shouldn't require expensive equipment, foreign visas, or connections. DDI is built to work for you — wherever you are, with whatever you have." },
                { icon: "🏆", title: "To hold a real standard", body: "DDI does not certify every Dynast who shows up. We certify every Dynast who meets the benchmark. A certificate that means nothing protects no one." },
                { icon: "🌍", title: "To compete globally", body: "Nigerian talent is world-class. DDI trains you to the standard that global clients, agencies, and remote employers expect — then helps you reach them." },
                { icon: "⚡", title: "To stay ahead of AI", body: "AI is not the enemy. It's a tool — and DDI teaches you to use it. Our Dynasts don't fear automation. They use it to work faster, earn more, and go further." },
              ].map((card, i) => (
                <div key={card.title} className={`ddi-why-card ddi-reveal ddi-reveal-delay-${i + 1}`}>
                  <div className="ddi-why-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="ddi-who">
          <div className="ddi-who-inner">
            <div>
              <p className="ddi-eyebrow ddi-reveal">Who we are</p>
              <h2 className="ddi-h2 ddi-reveal ddi-reveal-delay-1">Not a classroom.<br /><em>A movement.</em></h2>
              <p className="ddi-body ddi-reveal ddi-reveal-delay-2">
                Digital Dynasty Imperium is a Lagos-based career transformation programme for Nigerian youths aged 18–40. We call our students Dynasts — because the word carries weight. A Dynast isn't a passive learner. A Dynast is someone building something that lasts.
              </p>
              <p className="ddi-body ddi-reveal ddi-reveal-delay-3">
                Our coaches aren't academics behind desks. They're digital professionals who have walked the path and know exactly what it takes to earn from it.
              </p>

              <div className="ddi-values ddi-reveal ddi-reveal-delay-4">
                {[
                  { name: "Commitment", desc: "We follow through on every promise — to the programme, to standards, and to our Dynasts." },
                  { name: "Transparency", desc: "We tell you what DDI costs, what it demands, and what it delivers. No overpromising." },
                  { name: "Time Management", desc: "We respect your time. Sessions start on time. Deadlines mean something here." },
                  { name: "Fair Judgement", desc: "Every Dynast is assessed on merit. Excellence is rewarded. Shortcuts are not." },
                ].map((v) => (
                  <div key={v.name} className="ddi-value-row">
                    <div className="ddi-value-dot" />
                    <div>
                      <div className="ddi-value-name">{v.name}</div>
                      <div className="ddi-value-desc">{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ddi-muted)", marginBottom: "1.25rem" }} className="ddi-reveal">
                Who we build for
              </p>
              <div className="ddi-personas">
                {[
                  { name: "The Undergraduate", desc: "Still in school and refusing to graduate broke. Building a head start before the rest even begin." },
                  { name: "The Fresh Graduate", desc: "Degree in hand, direction unclear. Looking for a skill that creates options — not just a better CV." },
                  { name: "The NYSC Corps Member", desc: "One year to build something that outlasts service. Determined not to waste a single week of it." },
                  { name: "The Working Professional", desc: "Employed, but aware that one employer is not a plan. Building a second income stream — or a full exit." },
                ].map((p, i) => (
                  <div key={p.name} className={`ddi-persona-chip ddi-reveal ddi-reveal-delay-${i + 1}`}>
                    <span className="ddi-persona-name">{p.name}</span>
                    <span className="ddi-persona-desc">{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VISION QUOTE */}
        <section className="ddi-vision">
          <div className="ddi-vision-inner">
            <p className="ddi-eyebrow ddi-reveal" style={{ textAlign: "center" }}>What we aim to achieve</p>
            <blockquote className="ddi-vision-quote ddi-reveal ddi-reveal-delay-1">
              "To equip and train youths in high-demand digital skills — empowering them with the knowledge, tools, and confidence to achieve{" "}
              <span>career independence</span>."
            </blockquote>
            <p className="ddi-vision-attr ddi-reveal ddi-reveal-delay-2">The DDI Mission</p>
            <p className="ddi-body ddi-reveal ddi-reveal-delay-3" style={{ margin: "2rem auto 0", textAlign: "center", maxWidth: "560px" }}>
              We are not building a school. We are building a generation of Dynasts who never get stuck at the mercy of an employer, never fear being replaced, and never have to beg for an opportunity. One cohort at a time. Across Africa.
            </p>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="ddi-closing" id="join">
          <div className="ddi-closing-inner">
            <h2 className="ddi-reveal">Ready to start<br />your Journey?</h2>
            <p className="ddi-reveal ddi-reveal-delay-1">
              The next cohort is forming. Claim your seat, meet your cohort, and take the first real step toward earning on your own terms.
            </p>
            <div className="ddi-closing-btns ddi-reveal ddi-reveal-delay-2">
              <Link to="/services" className="ddi-btn-primary">Claim your seat</Link>
              <Link to="/services" className="ddi-btn-ghost">Explore courses</Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
