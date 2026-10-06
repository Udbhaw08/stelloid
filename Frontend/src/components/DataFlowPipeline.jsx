import { useEffect, useRef, useState } from 'react';

const DATA_SOURCES = [
  { name: 'Shopify', desc: 'Orders & products', color: '#5e8e3e', icon: 'S', x: '2%', y: '14%', r: '-2deg' },
  { name: 'Google Ads', desc: 'Ad performance', color: '#fbbc04', icon: 'G', x: '0%', y: '42%', r: '1.5deg' },
  { name: 'Inventory', desc: 'Stock levels', color: '#7a5cf5', icon: '▤', x: '6%', y: '70%', r: '-1deg' },
  { name: 'Amazon', desc: 'Sales & ads', color: '#ff9900', icon: 'a', x: '31%', y: '2%', r: '1.5deg' },
  { name: 'Meta Ads', desc: 'Ad performance', color: '#0866ff', icon: 'M', x: '33%', y: '30%', r: '-1.5deg' },
  { name: 'Flipkart', desc: 'Sales & ads', color: '#2874f0', icon: 'F', x: '30%', y: '56%', r: '2deg' },
  { name: 'Spreadsheets', desc: 'Custom data', color: '#16a05a', icon: '▦', x: '34%', y: '82%', r: '-1deg' }
];

export default function DataFlowPipeline() {
  const pwrapRef = useRef(null);
  const pboxRef = useRef(null);
  const cardsRef = useRef([]);
  const pathsRef = useRef([]);
  const [isInView, setIsInView] = useState(true);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const pwrap = pwrapRef.current;
    const pbox = pboxRef.current;
    if (!pwrap || !pbox) return;

    function updateLines() {
      if (!pwrap || !pbox) return;
      const wr = pwrap.getBoundingClientRect();
      const br = pbox.getBoundingClientRect();
      const isMobile = window.innerWidth <= 700;

      cardsRef.current.forEach((card, i) => {
        const group = pathsRef.current[i];
        if (!card || !group) return;

        const cr = card.getBoundingClientRect();
        let x1, y1, x2, y2, d;

        if (isMobile) {
          x1 = cr.left + cr.width / 2 - wr.left;
          y1 = cr.bottom - wr.top;
          x2 = br.left + br.width / 2 - wr.left;
          y2 = br.top - wr.top;
          d = `M${x1} ${y1} C${x1} ${(y1 + y2) / 2},${x2} ${(y1 + y2) / 2},${x2} ${y2}`;
        } else {
          x1 = cr.right - wr.left;
          y1 = cr.top + cr.height / 2 - wr.top;
          x2 = br.left - wr.left;
          y2 = br.top + br.height / 2 - wr.top;
          const m = (x1 + x2) / 2;
          d = `M${x1} ${y1} C${m} ${y1},${m} ${y2},${x2} ${y2}`;
        }

        const paths = group.querySelectorAll('path');
        paths.forEach((p) => {
          p.setAttribute('d', d);
          if (p.classList.contains('flow-pulse')) {
            try {
              const len = p.getTotalLength();
              p.style.setProperty('--len', `${len}`);
            } catch {
              // ignore
            }
          }
        });
      });
    }

    const t1 = setTimeout(updateLines, 50);
    const t2 = setTimeout(updateLines, 200);
    const t3 = setTimeout(updateLines, 500);

    window.addEventListener('resize', updateLines);

    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(() => updateLines());
      ro.observe(pwrap);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updateLines);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <div className={`pwrap ${isInView ? 'in' : ''}`} id="pwrap" ref={pwrapRef}>
      <svg id="plines" aria-hidden="true">
        <defs>
          {DATA_SOURCES.map((d, i) => (
            <linearGradient id={`flow-grad-${i}`} key={i} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={d.color} stopOpacity="0" />
              <stop offset="20%" stopColor={d.color} stopOpacity="1" />
              <stop offset="80%" stopColor="#6d4bf5" stopOpacity="1" />
              <stop offset="100%" stopColor="#6d4bf5" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {DATA_SOURCES.map((d, i) => (
          <g 
            key={i} 
            ref={(el) => (pathsRef.current[i] = el)} 
            style={{ 
              '--i': i,
              opacity: activeId === null || activeId === i ? 1 : 0.1,
              transition: 'opacity 0.3s ease'
            }}
          >
            <path className="flow-track" />
            <path className="flow-stream" />
            <path className="flow-pulse" stroke={`url(#flow-grad-${i})`} />
          </g>
        ))}
      </svg>

      {DATA_SOURCES.map((d, i) => (
        <div
          key={d.name}
          className="pc"
          ref={(el) => (cardsRef.current[i] = el)}
          onClick={() => setActiveId(activeId === i ? null : i)}
          style={{
            '--x': d.x,
            '--y': d.y,
            '--r': d.r,
            '--i': i,
            opacity: activeId === null || activeId === i ? 1 : 0.3,
            transition: 'opacity 0.3s ease',
            cursor: 'pointer'
          }}
        >
          <div className="card">
            <div className="ic" style={{ background: d.color }}>
              {d.icon}
            </div>
            <div>
              <div className="t">{d.name}</div>
              <div className="s">{d.desc}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Target Decision Box */}
      <div className="pbox" id="pbox" ref={pboxRef}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 1c1 6 5 10 11 11-6 1-10 5-11 11-1-6-5-10-11-11C7 11 11 7 12 1z"
            fill="#6d4bf5"
          />
        </svg>
        <div>
          <b>Stelloid</b>
          <small>AI decision layer</small>
        </div>
      </div>
    </div>
  );
}
