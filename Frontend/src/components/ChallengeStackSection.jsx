import React, { useEffect, useRef, useState } from 'react';
import { LayoutDashboard, ListChecks, TrendingDown } from 'lucide-react';

const challengeCards = [
  {
    id: '01',
    icon: LayoutDashboard,
    title: 'Scattered signals.',
    text: 'Sales, ads, inventory and costs live in different places. The commercial picture gets lost between them.',
    accent: '#6145e7',
    leftLabel: 'DATA SILOS',
    leftTitle: <>More dashboards won't<br/>answer "What's next?"</>,
    leftText: 'When sales, marketing, and inventory data live in separate tools, your team spends hours just trying to find the truth.',
  },
  {
    id: '02',
    icon: ListChecks,
    title: 'Manual decisions.',
    text: 'Spreadsheets, agencies and analysis explain what happened. Your team still has to work out what to do next.',
    accent: '#c08040',
    leftLabel: 'MANUAL BOTTLENECKS',
    leftTitle: <>Analysis doesn't<br/>equal execution.</>,
    leftText: 'Knowing what happened yesterday doesn\'t fix today. Your team still has to manually pull the levers to optimize performance.',
  },
  {
    id: '03',
    icon: TrendingDown,
    title: 'Hidden profit leaks.',
    text: 'A growing channel can still lose margin. Missed opportunities and overlooked costs leave growth on the table.',
    accent: '#4e9e7a',
    leftLabel: 'MISSED OPPORTUNITIES',
    leftTitle: <>Hidden leaks<br/>drain your margins.</>,
    leftText: 'Every minute spent interpreting data is a minute you aren\'t optimizing. Delayed actions lead to wasted ad spend and lost profit.',
  },
];

export function ChallengeStackSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardProgress, setCardProgress] = useState(0);

  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!sectionRef.current) return;

        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;

        const scrolled = -rect.top;
        const totalScroll = sectionHeight - viewportHeight;

        if (totalScroll <= 0) return;

        const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
        const cardCount = challengeCards.length;
        const raw = progress * cardCount;
        const idx = Math.min(Math.floor(raw), cardCount - 1);
        const within = raw - Math.floor(raw);

        setActiveIndex(idx);
        setCardProgress(within);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="challenge-stack-section">
      <div className="challenge-sticky-area">
        {/* Left Column */}
        <div className="challenge-left-col">
          <div className="challenge-stack-header" style={{ position: 'relative', minHeight: '400px' }}>
            {challengeCards.map((card, i) => (
              <div 
                key={card.id} 
                style={{ 
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  left: 0,
                  opacity: activeIndex === i ? 1 : 0,
                  visibility: activeIndex === i ? 'visible' : 'hidden',
                  transition: 'opacity 0.4s ease, visibility 0.4s ease',
                  width: '100%',
                  pointerEvents: activeIndex === i ? 'auto' : 'none'
                }}
              >
                <span className="section-label" style={{ color: 'var(--stelloid-dark)', opacity: 0.7, fontWeight: 600 }}>
                  {card.leftLabel}
                </span>
                <h2 className="section-title" style={{ marginTop: '24px', fontSize: 'clamp(2.5rem, 3.5vw, 3.8rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {card.leftTitle}
                </h2>
                <p className="hero-copy" style={{ marginTop: '32px', fontSize: '1.1rem', color: 'var(--stelloid-dark)', opacity: 0.85, lineHeight: 1.6, maxWidth: '500px' }}>
                  {card.leftText}
                </p>
                <div style={{ marginTop: '48px' }}>
                  <button className="hero-secondary-btn" style={{ borderRadius: '100px', padding: '14px 28px', border: '1px solid rgba(0,0,0,0.8)' }}>
                    Learn about Platform
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="challenge-right-col">
          <div className="challenge-card-viewport">
            {challengeCards.map((card, i) => {
              const Icon = card.icon;

              let translateY = '100%';
              let zIndex = i + 1;
              let opacity = 0;
              let scale = 1;

              if (i < activeIndex) {
                translateY = '0%';
                opacity = 1;
                scale = 0.93 - (activeIndex - i) * 0.03;
              } else if (i === activeIndex) {
                translateY = '0%';
                opacity = 1;
                scale = 1;
              } else if (i === activeIndex + 1) {
                const eased = 1 - Math.pow(1 - cardProgress, 3);
                translateY = `${(1 - eased) * 100}%`;
                opacity = 0.2 + eased * 0.8;
                scale = 0.96 + eased * 0.04;
              }

              return (
                <div
                  key={card.id}
                  className="challenge-card-layer"
                  style={{
                    transform: `translateY(${translateY}) scale(${scale})`,
                    zIndex,
                    opacity: i <= activeIndex + 1 ? opacity : 0,
                  }}
                >
                  <div className="cc-inner">
                    <div className="cc-icon-wrap" style={{ color: card.accent, marginBottom: '24px' }}>
                      <Icon size={80} strokeWidth={1} />
                    </div>
                    <div className="cc-body">
                      <h3 className="cc-title">{card.title}</h3>
                      <p className="cc-text">{card.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChallengeStackSection;
