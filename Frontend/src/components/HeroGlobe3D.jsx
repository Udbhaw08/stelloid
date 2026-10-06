import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SRC = [
  { name: 'Shopify', desc: 'Orders & products', color: '#5e8e3e', icon: 'S' },
  { name: 'Amazon', desc: 'Sales & ads', color: '#ff9900', icon: 'a' },
  { name: 'Meta Ads', desc: 'Ad performance', color: '#0866ff', icon: 'M' },
  { name: 'Google Ads', desc: 'Ad performance', color: '#fbbc04', icon: 'G' },
  { name: 'Flipkart', desc: 'Sales & ads', color: '#2874f0', icon: 'F' },
  { name: 'Inventory', desc: 'Stock & product data', color: '#7a5cf5', icon: '▤' }
];

const DEC = [
  { tag: 'GOAL', title: 'Grow revenue', icon: '◎', className: '' },
  { tag: 'OPPORTUNITY', title: 'Low-performing SKUs detected', icon: '⌕', className: '' },
  { tag: 'WEEKLY ACTION', title: 'Increase ad spend on high-intent keywords', icon: '✦', className: '' },
  { tag: 'IMPACT', title: '+18% projected revenue', icon: '▲', className: 'imp' }
];

export default function HeroGlobe3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const orbRef = useRef(null);
  const orbWrapperRef = useRef(null);
  const nodeRefs = useRef([]);
  const decRefs = useRef([]);

  useEffect(() => {
    const stage = containerRef.current;
    const canvas = canvasRef.current;
    const links = svgRef.current;
    const orbw = orbWrapperRef.current;
    const orb = orbRef.current;
    if (!stage || !canvas || !links || !orbw || !orb) return;

    let animId;
    let isDisposed = false;

    // Show elements immediately
    orbw.classList.add('show');
    DEC.forEach((_, i) => {
      if (decRefs.current[i]) decRefs.current[i].classList.add('show');
    });
    SRC.forEach((_, i) => {
      if (nodeRefs.current[i]) nodeRefs.current[i].classList.add('show');
    });

    // Create SVG paths for decision connections
    while (links.firstChild) {
      links.removeChild(links.firstChild);
    }
    const dlPaths = DEC.map(() => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', '#6d4bf5');
      p.setAttribute('stroke-dasharray', '3 5');
      p.setAttribute('stroke-width', '1.2');
      links.appendChild(p);
      return p;
    });

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);

    // Particle texture
    const texCanvas = document.createElement('canvas');
    texCanvas.width = texCanvas.height = 64;
    const g = texCanvas.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, '#ffffff');
    gr.addColorStop(0.4, 'rgba(255,255,255,0.9)');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
    const particleTex = new THREE.CanvasTexture(texCanvas);

    // Globe Group
    const globe = new THREE.Group();
    scene.add(globe);

    const N = 650;
    const P = [];
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const c1 = new THREE.Color('#7a5cf5');
    const c2 = new THREE.Color('#3b6cff');
    const tc = new THREE.Color();

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rr = Math.sqrt(Math.max(0, 1 - y * y));
      const th = i * 2.39996;
      const v = new THREE.Vector3(Math.cos(th) * rr, y, Math.sin(th) * rr).multiplyScalar(1.6);
      P.push(v);
      v.toArray(pos, i * 3);
      tc.copy(c1).lerp(c2, Math.random());
      tc.toArray(col, i * 3);
    }

    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pg.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const pm = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      opacity: 0.9
    });
    globe.add(new THREE.Points(pg, pm));

    // Network lines between close points
    const seg = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (P[i].distanceTo(P[j]) < 0.34) {
          seg.push(P[i].x, P[i].y, P[i].z, P[j].x, P[j].y, P[j].z);
        }
      }
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.Float32BufferAttribute(seg, 3));
    const lm = new THREE.LineBasicMaterial({
      color: 0x8f7bff,
      transparent: true,
      opacity: 0.22,
      depthWrite: false
    });
    globe.add(new THREE.LineSegments(lg, lm));

    // Inner sphere core
    const sm = new THREE.MeshBasicMaterial({
      color: 0xb9a4ff,
      transparent: true,
      opacity: 0.06,
      depthWrite: false
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.58, 40, 28), sm));

    // Outer orbit rings
    const rm = new THREE.LineBasicMaterial({
      color: 0x5b7cff,
      transparent: true,
      opacity: 0.25
    });
    [[0.5, 0, 2.2], [1.2, 0.6, 2.6]].forEach((a) => {
      const pts = [];
      for (let i = 0; i <= 128; i++) {
        const t = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(t) * a[2], 0, Math.sin(t) * a[2]));
      }
      const l = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), rm);
      l.rotation.set(a[0], a[1], 0);
      globe.add(l);
    });

    // Ambient floating particles
    const AN = 110;
    const ap = new Float32Array(AN * 3);
    for (let i = 0; i < AN; i++) {
      ap[i * 3] = (Math.random() - 0.5) * 9;
      ap[i * 3 + 1] = (Math.random() - 0.5) * 6;
      ap[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const ag = new THREE.BufferGeometry();
    ag.setAttribute('position', new THREE.BufferAttribute(ap, 3));
    const am = new THREE.PointsMaterial({
      size: 0.05,
      map: particleTex,
      color: 0x9a86ff,
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    });
    const amb = new THREE.Points(ag, am);
    scene.add(amb);

    // Connecting lines from nodes to center
    const nlm = new THREE.LineBasicMaterial({
      color: 0x6d4bf5,
      transparent: true,
      opacity: 0.25,
      depthWrite: false
    });
    const nl = SRC.map(() => {
      const gGeom = new THREE.BufferGeometry();
      gGeom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      scene.add(new THREE.Line(gGeom, nlm));
      return gGeom;
    });

    // Energy pulse points
    const pp = new Float32Array(SRC.length * 3);
    const pgm = new THREE.BufferGeometry();
    pgm.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    const pmm = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTex,
      color: 0x3b6cff,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });
    scene.add(new THREE.Points(pgm, pmm));

    let W = stage.clientWidth || 600;
    let H = stage.clientHeight || 580;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let ps = 0;
    let spin = 0;
    let orbX = W * 0.5;
    let orbY = H * 0.38;
    let rx = 160;
    let ry = 140;
    let ppu = 100;
    const t0 = performance.now();
    const vec = new THREE.Vector3();

    function handleResize() {
      if (!stage || isDisposed) return;
      W = stage.clientWidth || 600;
      H = stage.clientHeight || 580;
      renderer.setSize(W, H, false);

      const isNarrow = W < 680;
      orbX = W * 0.5;
      orbY = H * (isNarrow ? 0.34 : 0.38);
      rx = Math.min(W * 0.35, 175);
      ry = rx * 0.88;

      camera.aspect = W / H;
      camera.setViewOffset(W, H, W / 2 - orbX, H / 2 - orbY, W, H);
      camera.updateProjectionMatrix();

      ppu = (H / 2) / (Math.tan((20 * Math.PI) / 180) * 7.6);
      globe.scale.setScalar(isNarrow ? 0.68 : 0.88);
      links.setAttribute('viewBox', `0 0 ${W} ${H}`);

      orbw.style.left = `${orbX}px`;
      orbw.style.top = `${orbY}px`;
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(() => handleResize());
      ro.observe(stage);
    }

    const handlePointerMove = (e) => {
      const rect = stage.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        ty = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      }
    };
    window.addEventListener('pointermove', handlePointerMove);

    const projectToScreen = (x, y, z) => {
      vec.set(x, y, z).project(camera);
      return [(vec.x * 0.5 + 0.5) * W, (-vec.y * 0.5 + 0.5) * H];
    };

    function tick(now) {
      if (isDisposed) return;
      const t = (now - t0) / 1000;
      const raw = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.6)));
      ps += (raw - ps) * 0.07;
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;

      const isOrbHovered = orb.matches(':hover');
      spin += 0.0018 + (isOrbHovered ? 0.006 : 0);
      globe.rotation.y = spin + mx * 0.25;
      globe.rotation.x = my * 0.12;
      amb.rotation.y = t * 0.01;

      pm.opacity = 0.9;
      lm.opacity = 0.18 + ps * 0.08;
      sm.opacity = 0.06;
      rm.opacity = 0.22;
      am.opacity = 0.5;
      nlm.opacity = 0.18 + 0.45 * ps;
      pmm.opacity = 0.5 + 0.5 * ps;

      camera.position.set(mx * 0.3, -my * 0.2, 7.6);
      camera.lookAt(0, 0, 0);

      const k = 1 - 0.28 * ps;
      const rxw = (rx * k) / ppu;
      const ryw = (ry * k) / ppu;
      const sc = W < 600 ? 0.8 : 0.95;

      // Orbiting source nodes
      SRC.forEach((_, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;

        const a = (i / SRC.length) * Math.PI * 2 + t * 0.07;
        const x = Math.cos(a) * rxw;
        const y = Math.sin(a) * ryw + Math.sin(t * 0.8 + i) * 0.05;
        const z = Math.sin(a) * rxw * 0.6;

        const [px, py] = projectToScreen(x, y, z);
        const s = (0.88 + 0.12 * (z / rxw)) * sc;

        el.style.transform = `translate(${px + mx * 8}px,${py}px) translate(-50%,-50%) scale(${s})`;
        el.style.zIndex = z > 0 ? '4' : '1';

        const arr = nl[i].attributes.position.array;
        arr[0] = x;
        arr[1] = y;
        arr[2] = z;
        arr[3] = arr[4] = arr[5] = 0;
        nl[i].attributes.position.needsUpdate = true;

        const q = (t * 0.25 + i / SRC.length) % 1;
        pp[i * 3] = x * (1 - q);
        pp[i * 3 + 1] = y * (1 - q);
        pp[i * 3 + 2] = z * (1 - q);
      });
      pgm.attributes.position.needsUpdate = true;

      // 4 Decision Cards positioned below the globe in a 2x2 grid (matches the reference image)
      const firstDecCard = decRefs.current[0]?.firstElementChild;
      const cw = firstDecCard ? firstDecCard.offsetWidth * sc : 180 * sc;
      const halfGap = 10;
      const leftColX = orbX - cw / 2 - halfGap;
      const rightColX = orbX + cw / 2 + halfGap;
      const row1Y = H * 0.72 + Math.sin(t * 0.5) * 3;
      const row2Y = H * 0.88 + Math.sin(t * 0.5 + 1.2) * 3;

      const decCoords = [
        { x: leftColX, y: row1Y },
        { x: rightColX, y: row1Y },
        { x: leftColX, y: row2Y },
        { x: rightColX, y: row2Y }
      ];

      DEC.forEach((_, i) => {
        const d = decRefs.current[i];
        if (!d) return;
        const { x, y } = decCoords[i];
        d.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) scale(${sc})`;

        const p = dlPaths[i];
        if (p) {
          const anchorX = x > orbX ? x - cw / 2 : x + cw / 2;
          const midX = (orbX + anchorX) / 2;
          p.setAttribute('d', `M${orbX} ${orbY} C${midX} ${orbY},${midX} ${y},${anchorX} ${y}`);
          p.setAttribute('opacity', (0.28 + 0.5 * ps).toString());
        }
      });

      orbw.style.transform = `translate(-50%,-50%) scale(${1 + ps * 0.12})`;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      if (ro) ro.disconnect();

      // Dispose three.js resources
      renderer.dispose();
      pg.dispose();
      pm.dispose();
      lg.dispose();
      lm.dispose();
      sm.dispose();
      rm.dispose();
      ag.dispose();
      am.dispose();
      nlm.dispose();
      pgm.dispose();
      pmm.dispose();
      particleTex.dispose();
      nl.forEach((line) => line.dispose());
    };
  }, []);

  return (
    <div className="hero-stage" ref={containerRef} id="stage">
      <canvas id="c" ref={canvasRef} />
      <svg id="links" ref={svgRef} />

      {/* Center 3D Stelloid Decision Orb */}
      <div className="stage-item show" id="orbw" ref={orbWrapperRef}>
        <div className="stage-orb" id="orb" ref={orbRef}>
          <div className="stage-orb-inner">
            <svg viewBox="0 0 24 24" className="stage-orb-star" aria-hidden="true">
              <path
                d="M12 1c1 6 5 10 11 11-6 1-10 5-11 11-1-6-5-10-11-11C7 11 11 7 12 1z"
                fill="#5a3df0"
              />
            </svg>
            <b className="stage-orb-title">Stelloid</b>
            <small className="stage-orb-sub">AI decision layer</small>
          </div>
        </div>
      </div>

      {/* Orbiting Source Cards */}
      {SRC.map((item, idx) => (
        <div
          key={item.name}
          className="stage-item show"
          ref={(el) => (nodeRefs.current[idx] = el)}
        >
          <div className="stage-card">
            <div className="stage-ic" style={{ backgroundColor: item.color }}>
              {item.icon}
            </div>
            <div>
              <div className="stage-card-t">{item.name}</div>
              <div className="stage-card-s">{item.desc}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Decision / Goal Cards */}
      {DEC.map((item, idx) => (
        <div
          key={item.tag}
          className="stage-item show"
          ref={(el) => (decRefs.current[idx] = el)}
        >
          <div className={`stage-card stage-dec ${item.className}`}>
            <div className="stage-ic">{item.icon}</div>
            <div>
              <div className="stage-dec-tag">{item.tag}</div>
              <div className="stage-dec-title">{item.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
