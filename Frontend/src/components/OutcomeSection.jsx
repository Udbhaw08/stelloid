import { ArrowUpRight, Sparkles } from 'lucide-react';

function SectionBadge({ children }) {
  return (
    <div className="section-badge">
      <span className="badge-dot" />
      <span>{children}</span>
    </div>
  );
}

export function OutcomeSection() {
  return (
    <section className="section section-spacing final-cta-section">
      <div className="container final-cta">
        <div className="final-cta-copy">
          <SectionBadge>See Stelloid in action</SectionBadge>
          <h2 className="cta-title">
            Make next week
            <span>count.</span>
          </h2>
          <p>
            A focused walkthrough using your brand context. Explore how a commercial goal becomes an evidence-backed weekly plan.
          </p>
          <button className="primary-button hero-button">
            Book a demo
            <ArrowUpRight size={16} />
          </button>
          <span className="micro-copy inline">No live data required to start.</span>
        </div>

        <div className="agenda-panel">
          <div className="agenda-icon"><Sparkles size={36} /></div>
          <p>IN YOUR WALKTHROUGH</p>
          <div className="agenda-item">
            <span>Your goal</span>
            <ArrowUpRight size={18} />
          </div>
          <div className="agenda-item">
            <span>Your economics</span>
            <ArrowUpRight size={18} />
          </div>
          <div className="agenda-item">
            <span>Your next move</span>
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </section>
  );
}
