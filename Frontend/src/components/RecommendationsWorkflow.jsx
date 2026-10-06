import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Database, Activity, Box, TrendingUp, Zap, Split, Play, ChevronsUp, ChevronsDown, Pause, MessageSquare, LayoutDashboard } from 'lucide-react';

const EDGES = [
  { from: 'data', to: 'econ' },
  { from: 'data', to: 'inv' },
  { from: 'data', to: 'ads' },
  
  { from: 'econ', to: 'engine' },
  { from: 'inv', to: 'engine' },
  { from: 'ads', to: 'engine' },
  
  { from: 'engine', to: 'rules' },
  
  { from: 'rules', to: 'start' },
  { from: 'rules', to: 'inc' },
  { from: 'rules', to: 'red' },
  { from: 'rules', to: 'wait' },
  
  { from: 'start', to: 'output' },
  { from: 'inc', to: 'output' },
  { from: 'red', to: 'output' },
  { from: 'wait', to: 'output' },
  
  { from: 'output', to: 'demo' }
];

const PATHS = [
  ['data', 'econ', 'engine', 'rules', 'red', 'output', 'demo'],
  ['data', 'inv', 'engine', 'rules', 'wait', 'output', 'demo'],
  ['data', 'ads', 'engine', 'rules', 'start', 'output', 'demo'],
  ['data', 'ads', 'engine', 'rules', 'inc', 'output', 'demo']
];

export function RecommendationsWorkflow() {
  const [hovered, setHovered] = useState(null);
  const [paths, setPaths] = useState([]);
  const [scale, setScale] = useState(1);
  
  const wrapperRef = useRef(null);
  const nodesRef = useRef({});

  useLayoutEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      // If screen is smaller than 940px, scale down the 900px canvas to fit (with 40px margin)
      if (w < 940) {
        setScale((w - 40) / 900);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updatePaths = () => {
    if (!wrapperRef.current) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const currentScale = wrapperRect.width / wrapperRef.current.offsetWidth || 1;
    
    const newPaths = EDGES.map(edge => {
      const fromEl = nodesRef.current[edge.from];
      const toEl = nodesRef.current[edge.to];
      if (!fromEl || !toEl) return null;
      
      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();
      
      const startX = (fromRect.right - wrapperRect.left) / currentScale;
      const startY = (fromRect.top + fromRect.height / 2 - wrapperRect.top) / currentScale;
      
      // slightly offset endX to leave room for the arrow
      const endX = (toRect.left - wrapperRect.left) / currentScale - 4;
      const endY = (toRect.top + toRect.height / 2 - wrapperRect.top) / currentScale;
      
      return { ...edge, startX, startY, endX, endY };
    }).filter(Boolean);
    
    setPaths(newPaths);
  };

  useEffect(() => {
    updatePaths();
    
    let observer;
    if (window.ResizeObserver && wrapperRef.current) {
      observer = new ResizeObserver(updatePaths);
      observer.observe(wrapperRef.current);
    }
    
    window.addEventListener('resize', updatePaths);
    
    // timeout to catch fonts or layout shifts
    const t = setTimeout(updatePaths, 150);
    const t2 = setTimeout(updatePaths, 500);
    
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', updatePaths);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const isEdgeActive = (from, to) => {
    if (!hovered) return true;
    return PATHS.some(p => p.includes(hovered) && p.includes(from) && p.includes(to) && p.indexOf(to) === p.indexOf(from) + 1);
  };

  const isNodeActive = (id) => {
    if (!hovered) return true;
    return PATHS.some(p => p.includes(hovered) && p.includes(id));
  };

  const Node = ({ id, icon: Icon, title, width = 110, diamond = false }) => {
    const active = isNodeActive(id);
    const isDimmed = hovered && !active;
    return (
      <div 
        ref={el => { nodesRef.current[id] = el; }}
        className={`wf2-node ${active ? 'active' : ''} ${isDimmed ? 'dimmed' : ''} ${diamond ? 'diamond' : ''}`}
        style={{ width }}
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="wf2-icon"><Icon size={20} /></div>
        <div className="wf2-title">{title}</div>
      </div>
    );
  };

  return (
    <section className="section section-light" style={{ overflow: 'hidden', background: '#F7E7CE', padding: '56px 0 72px' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        <div className="loop-heading-row text-center" style={{ flexDirection: 'column', alignItems: 'center', marginBottom: '8px', gap: '12px' }}>
          <div className="section-badge" style={{ justifyContent: 'center', background: '#fff' }}>
            <span className="badge-dot" style={{ background: '#B76E79' }} />
            <span style={{ color: '#B76E79' }}>System Architecture</span>
          </div>
          <h2 className="section-title">
            How Stelloid documentation<br />
            <span className="italic-accent" style={{ color: '#B76E79' }}>system works</span>
          </h2>
        </div>

        <div className="wf2-wrapper" style={{ overflowX: 'hidden', padding: '20px 0' }}>
          <div className="wf2-canvas" ref={wrapperRef} style={{ 
            display: 'flex', 
            width: '900px',
            minWidth: '900px', 
            justifyContent: 'space-between', 
            position: 'relative', 
            padding: '0 20px', 
            minHeight: '500px',
            transform: `translate(${scale < 1 ? 20 : 0}px, 0) scale(${scale})`,
            transformOrigin: 'top left',
            marginBottom: scale < 1 ? `-${500 * (1 - scale)}px` : '0',
            margin: scale < 1 ? '0' : '0 auto'
          }}>
            
            {/* SVG Layer for Curves */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'visible' }}>
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#cbd5e1" />
                </marker>
                <marker id="arrowhead-active" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#B76E79" />
                </marker>
                
                <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B76E79" />
                  <stop offset="100%" stopColor="#E8B4B8" />
                </linearGradient>
              </defs>

              {paths.map((p, i) => {
                const active = isEdgeActive(p.from, p.to);
                const offset = (p.endX - p.startX) * 0.45;
                const d = `M ${p.startX} ${p.startY} C ${p.startX + offset} ${p.startY}, ${p.endX - offset} ${p.endY}, ${p.endX} ${p.endY}`;
                
                return (
                  <g key={i}>
                    {/* Base path */}
                    <path 
                      className="wf2-path-base" 
                      d={d} 
                      markerEnd="url(#arrowhead)" 
                    />
                    {/* Active path */}
                    <path 
                      className={`wf2-path-active ${active ? 'show' : 'hide'}`} 
                      d={d} 
                      markerEnd={active ? "url(#arrowhead-active)" : ""}
                    />
                  </g>
                )
              })}
            </svg>

            {/* DOM Nodes Layer */}
            <div className="wf2-col center">
              <Node id="data" icon={Database} title="Upload CSV / Data" />
            </div>

            <div className="wf2-col stretch">
              <Node id="econ" icon={Activity} title="Product Economics" />
              <Node id="inv" icon={Box} title="Inventory Analysis" />
              <Node id="ads" icon={TrendingUp} title="Ad Performance" />
            </div>

            <div className="wf2-col center">
              <Node id="engine" icon={Zap} title="Recommendation Engine" width={130} />
            </div>

            <div className="wf2-col center">
              <Node id="rules" icon={Split} title="Decision Rules" diamond width={100} />
            </div>

            <div className="wf2-col stretch">
              <Node id="start" icon={Play} title="START ADS" width={110} />
              <Node id="inc" icon={ChevronsUp} title="INCREASE SPEND" width={110} />
              <Node id="red" icon={ChevronsDown} title="REDUCE SPEND" width={110} />
              <Node id="wait" icon={Pause} title="WAIT / NO CHANGE" width={110} />
            </div>

            <div className="wf2-col center">
              <Node id="output" icon={MessageSquare} title="Recommendation & Explanation" width={130} />
            </div>

            <div className="wf2-col center">
              <Node id="demo" icon={LayoutDashboard} title="Demo Dashboard" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default RecommendationsWorkflow;
