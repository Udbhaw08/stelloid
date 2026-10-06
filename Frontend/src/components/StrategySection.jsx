import { ListChecks, RefreshCw, ScanSearch, Target } from 'lucide-react';

const weeklyStages = [
  {
    icon: Target,
    title: 'Set the goal',
    text: 'Choose a timeframe, contribution-margin floor and inventory guardrails.',
    step: '01 / WEEKLY CYCLE',
  },
  {
    icon: ScanSearch,
    title: 'Diagnose the opportunity',
    text: 'Find sales opportunities and profit leaks at SKU × channel level.',
    step: '02 / WEEKLY CYCLE',
  },
  {
    icon: ListChecks,
    title: 'Review the weekly plan',
    text: 'See what to do, why it matters and when to stop. You approve the action.',
    step: '03 / WEEKLY CYCLE',
  },
  {
    icon: RefreshCw,
    title: 'Measure and repeat',
    text: 'Compare before and after. Use outcomes to inform next week’s plan.',
    step: '04 / WEEKLY CYCLE',
  },
];

function SectionBadge({ children }) {
  return (
    <div className="section-badge">
      <span className="badge-dot" />
      <span>{children}</span>
    </div>
  );
}

export function StrategySection() {
  return (
    <>
      <section className="section section-purple section-spacing">
        <div className="container loop-wrap">
          <div className="loop-heading-row">
            <div>
              <SectionBadge>How it works</SectionBadge>
              <h2 className="section-title loop-title">
                Your ambition.<br />A weekly action plan.
              </h2>
            </div>
            <p className="loop-intro">
              Not another report to interpret. A repeatable planning cycle that connects your commercial goal to a focused set of next moves.
            </p>
          </div>

          <div className="weekly-grid">
            {weeklyStages.map(({ icon: Icon, title, text, step }) => (
              <div key={title} className="weekly-card">
                <div className="weekly-icon">
                  <Icon size={22} />
                </div>
                <div className="weekly-divider" />
                <h3>{title}</h3>
                <p>{text}</p>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-spacing">
        <div className="container action-wrap">
          <div className="action-intro">
            <SectionBadge>02 / Know your next move</SectionBadge>
            <h2 className="section-title bigger-title">
              A next move.<br />
              <span className="italic-accent">Not a hunch.</span>
            </h2>
            <p>
              A weekly plan shows what to do, why, the supporting evidence, expected impact, confidence and a clear stop condition.
            </p>
            <p>
              Decide what to push, price, bundle, replenish, list or pause. The recommendation is Stelloid’s. The decision is yours.
            </p>

            <div className="other-moves">
              <p className="muted-note">Illustrative apparel-brand example · Example data</p>
              <strong>ALSO IN THE EXAMPLE PLAN</strong>
              <div className="move-item">
                <span className="move-tag">Meta</span>
                <h4>Shift 18% more prospecting spend to Canvas Cap.</h4>
                <p>CAC 16% below target · 4.8 weeks stock cover · CM 34%</p>
              </div>
              <div className="move-item">
                <span className="move-tag">Shopify</span>
                <h4>Offer an 8%-off two-pack Black Tee bundle.</h4>
                <p>7.2 weeks stock cover · Bundle CM 35%+</p>
              </div>
            </div>
          </div>

          <div className="recommendation-detail">
            <div className="rec-header">
              <span>Weekly action plan</span>
              <div className="status-badge light small">For review</div>
            </div>

            <div className="rec-divider" />

            <div className="rec-body">
              <p className="rec-kicker">AMAZON / COMPTON CAP</p>
              <h3>Launch an exact-match campaign at 70% of allowable CPC.</h3>
              <p>Conversion, stock and contribution margin support a controlled test. CPC headroom gives room to start conservatively.</p>
            </div>

            <div className="evidence-panel">
              <p>The evidence</p>
              <div className="evidence-grid">
                {[
                  ['8.3%', 'Conversion'],
                  ['6.1 weeks', 'Stock cover'],
                  ['31%', 'Contribution margin'],
                  ['+28%', 'CPC headroom'],
                ].map(([value, label]) => (
                  <div key={label} className="evidence-box">
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="impact-box">
              <p className="impact-kicker">MODELLED EXPECTED IMPACT</p>
              <h4>+9–13% product revenue over 7 days</h4>
              <span>An example projection, not achieved results or a guarantee.</span>
            </div>

            <div className="confidence-box">
              <p>Confidence · To be assessed in review</p>
              <span>Review the conversion, stock and margin evidence before approving.</span>
            </div>

            <div className="warning-box">
              <div className="warning-icon"><AlertTriangleIcon /></div>
              <div>
                <p>Stop condition</p>
                <span>Stop if ACOS exceeds 24% after 20 clicks, or stock cover falls below 21 days.</span>
              </div>
            </div>

            <div className="review-actions">
              <button className="primary-button small-button">Approve</button>
              <button className="secondary-button small-button">Defer</button>
            </div>

            <p className="final-note">Your team applies approved actions in your existing tools. Stelloid does not make changes autonomously.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function AlertTriangleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M12 3.5 21 18a1.5 1.5 0 0 1-1.3 2.2H4.3A1.5 1.5 0 0 1 3 18L12 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 9v4.5M12 17.5h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
