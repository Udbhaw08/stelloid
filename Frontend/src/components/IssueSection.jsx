import { BarChart3, LayoutDashboard, ListChecks, Package, ShoppingBag, TrendingDown } from 'lucide-react';
import DataFlowPipeline from './DataFlowPipeline';

const inputSources = [
  { icon: ShoppingBag, label: 'Shopify' },
  { icon: Package, label: 'Amazon' },
  { icon: BarChart3, label: 'Meta Ads' },
  { icon: BarChart3, label: 'Google Ads' },
  { icon: ListChecks, label: 'CSV' },
];

const challengeCards = [
  {
    id: '01',
    icon: LayoutDashboard,
    title: 'Scattered signals.',
    text: 'Sales, ads, inventory and costs live in different places. The commercial picture gets lost between them.',
    label: 'Too many sources',
  },
  {
    id: '02',
    icon: ListChecks,
    title: 'Manual decisions.',
    text: 'Spreadsheets, agencies and analysis explain what happened. Your team still has to work out what to do next.',
    label: 'Too much interpretation',
  },
  {
    id: '03',
    icon: TrendingDown,
    title: 'Hidden profit leaks.',
    text: 'A growing channel can still lose margin. Missed opportunities and overlooked costs leave growth on the table.',
    label: 'Too little clarity',
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

export function IssueSection() {
  return (
    <>
      <section className="section section-light section-spacing">
        <div className="container data-integration-grid">
          {/* Left Block: Data you already have */}
          <div className="input-block">
            <div className="split-title">
              <p>The data you already have.</p>
              <p className="split-title-accent">A decision layer you don’t.</p>
            </div>

            <div className="input-row">
              {inputSources.map(({ icon: Icon, label }) => (
                <div key={label} className="input-item">
                  <Icon size={18} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <p className="small-quiet">
              Example inputs, not a live-connector list. Pilots start with limited exports; connectors are added deliberately, with fields and access documented before activation.
            </p>
          </div>

          {/* Right Block: Animated Data Flow Pipeline into Stelloid */}
          <div className="pipeline-container">
            <DataFlowPipeline />
          </div>
        </div>
      </section>

      <section className="section section-spacing">
        <div className="container challenge-wrap">
          <SectionBadge>The goal-to-action gap</SectionBadge>
          <h2 className="section-title bigger-title">
            More dashboards won’t answer
            <span>“What should we do next?”</span>
          </h2>

          <div className="card-grid challenge-grid">
            {challengeCards.map(({ id, icon: Icon, title, text, label }) => (
              <article key={id} className="challenge-card">
                <div className="card-topline">
                  <span className="card-index">{id}</span>
                  <Icon size={24} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <strong>{label}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default IssueSection;
