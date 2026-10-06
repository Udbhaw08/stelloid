import { ArrowRight, Check } from 'lucide-react';
import HeroGlobe3D from './HeroGlobe3D';

function SectionBadge({ children }) {
  return (
    <div className="section-badge">
      <span className="badge-dot" />
      <span>{children}</span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero-section section-spacing">
      <div className="container hero-layout-grid">
        {/* Left column: Signature typography & copy */}
        <div className="hero-copy-column">
          <SectionBadge>Your AI Chief Commercial Officer</SectionBadge>

          <h1 className="hero-title">
            Recover missed sales.
            <span>
              Stop <em>margin leakage.</em>
            </span>
          </h1>

          <p className="hero-copy">
            For multichannel e-commerce brands, Stelloid turns business goals into weekly actions for profitable growth. See where to focus, understand the evidence, and decide what happens next.
          </p>

          <div className="hero-cta-wrap">
            <div className="hero-cta-buttons">
              <button className="primary-button hero-button">
                Book a demo
                <ArrowRight size={16} />
              </button>
            </div>
            <p className="micro-copy">Your brand context. No live data needed.</p>
          </div>

          <div className="trust-strip">
            <div className="trust-item">
              <Check size={14} />
              <span>Read-only access</span>
            </div>
            <div className="trust-item">
              <Check size={14} />
              <span>Every action human-approved</span>
            </div>
            <div className="trust-item">
              <Check size={14} />
              <span>No customer PII required</span>
            </div>
          </div>
        </div>

        {/* Right column: 3D interactive model */}
        <div className="hero-stage-column">
          <HeroGlobe3D />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
