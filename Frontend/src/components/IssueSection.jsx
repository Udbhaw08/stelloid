import { BarChart3, ListChecks, Package, ShoppingBag } from 'lucide-react';
import DataFlowPipeline from './DataFlowPipeline';
import Reveal from './Reveal';

const inputSources = [
  { icon: ShoppingBag, label: 'Shopify' },
  { icon: Package, label: 'Amazon' },
  { icon: BarChart3, label: 'Meta Ads' },
  { icon: BarChart3, label: 'Google Ads' },
  { icon: ListChecks, label: 'CSV' },
];



export function IssueSection() {
  return (
    <section className="section section-light section-spacing">
      <Reveal>
        <div className="container data-integration-grid">
          {/* Left Block: Data you already have */}
          <div className="input-block">
            <div className="split-title">
              <p>The data you already have.</p>
              <p className="split-title-accent">A decision layer you don't.</p>
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
      </Reveal>
    </section>
  );
}

export default IssueSection;
