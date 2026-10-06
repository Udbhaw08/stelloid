import { ArrowRight, ArrowUpRight, TrendingDown, TrendingUp } from 'lucide-react';
import { Reveal } from './Reveal';

const conversionStats = [
  { label: 'Recoveries identified', value: '1.8K', tone: 'positive' },
  { label: 'Avg. weekly uplift', value: '+18.4%', tone: 'positive' },
  { label: 'At-risk SKUs', value: '342', tone: 'warning' },
];

export function ConversionSection() {
  return (
    <section className="section section-soft">
      <div className="container">
        <Reveal>
          <div className="section-header text-center">
            <span className="section-label">Example conversion impact</span>
            <h2 className="section-title">Turn missed opportunities into weekly wins.</h2>
          </div>
        </Reveal>

        <div className="conversion-layout">
          <Reveal delay={0.1}>
            <div className="conversion-panel">
              <div className="panel-topline">
                <div>
                  <p className="eyebrow">Import &gt; optimize</p>
                  <h3>Example conversion pipeline</h3>
                </div>
                <button className="ghost-button">
                  View flow <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="flow-steps">
                <div className="flow-step">
                  <span className="step-badge">01</span>
                  <div>
                    <h4>Import</h4>
                    <p>Monthly pricing and market data sync from your channels.</p>
                  </div>
                </div>
                <div className="flow-step">
                  <span className="step-badge">02</span>
                  <div>
                    <h4>Analyze</h4>
                    <p>AI flags margin leak, margin compression, and under-pricing drift.</p>
                  </div>
                </div>
                <div className="flow-step">
                  <span className="step-badge">03</span>
                  <div>
                    <h4>Recover</h4>
                    <p>Recommend and automate pricing updates with human approval.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="stats-stack">
            {conversionStats.map(({ label, value, tone }, index) => (
              <Reveal key={label} delay={0.15 + index * 0.08}>
                <div className={`metric-card ${tone}`}>
                  <div className="metric-icon">
                    {tone === 'positive' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                  </div>
                  <div>
                    <p className="metric-label">{label}</p>
                    <h3>{value}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
