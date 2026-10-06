import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ShopifySVG = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="#95BF47"><path d="M15.4 3.7c-.1-.1-.3-.2-.5-.2-.1 0-1.4.2-3.8.9-2.5.7-4.8 1.4-4.9 1.4-.4.1-.7.4-.8.8l-1.9 14.3 10.7 2.1 4.5-17.6c.1-.4-.1-.8-.4-1l-2.9-.7zM12.9 1.5c-.3 0-.6.2-.7.5l-1.8 3.9 3.5 1 1.7-4.8c-.1-.3-.4-.5-.7-.6h-2z"/></svg>;
const AmazonSVG = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="#FF9900"><path d="M13.68 19.04c-1.3.69-3.08 1.15-4.96 1.15-4.14 0-7.55-1.55-9.84-4.36-.26-.32-.23-.74.07-.98.3-.24.71-.24.99.03 2.05 1.95 5.16 3.32 8.78 3.32 1.76 0 3.4-.41 4.6-.96.48-.22 1.05.02 1.25.5.21.48-.12.98-.6 1.22l-.29.08z"/><path d="M14.67 19.04c-.45-.48-.56-1.15-.36-1.78l1.41-4.3c.12-.37.52-.57.88-.45.37.12.57.52.45.88l-1.01 3.1 3.16-1.04c.37-.12.77.08.89.45.12.37-.08.77-.45.89l-4.14 1.36c-.32.1-.64.03-.83-.11z"/><path d="M17.15 6.64c-.7-1.12-1.9-1.93-3.32-2.28-1.52-.37-3.13-.17-4.49.56-1.36.73-2.3 1.98-2.6 3.48-.12.58.26 1.14.84 1.26.58.12 1.14-.26 1.26-.84.21-1.03.86-1.89 1.79-2.39.93-.5 2.04-.64 3.08-.39.98.24 1.8 1.05 2.21 2.02l-3.21.08c-2.38.06-4.49 1.5-5.32 3.65-.58 1.51-.43 3.2.43 4.58.86 1.38 2.25 2.21 3.86 2.32 1.72.12 3.35-.61 4.41-1.92v1.07c0 .54.44.98.98.98s.98-.44.98-.98V7.5c0-.31-.14-.6-.39-.78l-.01-.08zM14.28 12c-.53 1.03-1.6 1.7-2.77 1.7-.85 0-1.63-.43-2.09-1.17-.45-.74-.53-1.65-.21-2.45.38-.97 1.3-1.61 2.35-1.64l2.74-.07v3.63z"/></svg>;
const MetaSVG = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="#0668E1"><path d="M22.46 10.98a6.52 6.52 0 0 0-4.66-1.92c-1.8 0-3.48.82-4.57 2.17a6.6 6.6 0 0 0-4.58-2.17c-3.6 0-6.52 2.94-6.52 6.55 0 3.6 2.92 6.54 6.52 6.54 1.8 0 3.48-.82 4.58-2.17 1.09 1.35 2.77 2.17 4.57 2.17 3.6 0 6.52-2.94 6.52-6.54 0-1.75-.68-3.41-1.86-4.63z" /></svg>;
const GoogleSVG = () => <svg viewBox="0 0 24 24" width="22" height="22"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>;
const FlipkartSVG = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="#2874F0"><rect width="24" height="24" rx="4"/><text x="12" y="17.5" fontSize="18" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold" textAnchor="middle" fill="#FFE500">f</text></svg>;
const InventorySVG = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#7A5CF5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path></svg>;

const SRC = [
  { Svg: ShopifySVG, ring: 0, angle: 0 },
  { Svg: AmazonSVG, ring: 1, angle: 2.4 },
  { Svg: MetaSVG, ring: 2, angle: 1.5 },
  { Svg: GoogleSVG, ring: 0, angle: 3.5 },
  { Svg: FlipkartSVG, ring: 1, angle: -0.8 },
  { Svg: InventorySVG, ring: 2, angle: -1.7 }
];

const RINGS = [
  { rx: 0.1, ry: 0, rz: -0.2, radius: 2.3 }, 
  { rx: 1.0, ry: 0.5, rz: 0.1, radius: 2.5 },
  { rx: -0.7, ry: -0.3, rz: 0.2, radius: 2.7 }
];

const DEC = [
  ['Goal', 'Grow revenue', '◎', ''],
  ['Opportunity', 'Low-performing SKUs detected', '⌕', ''],
  ['Weekly action', 'Increase ad spend on high-intent keywords', '✦', ''],
  ['Impact', '+18% projected revenue', '▲', 'imp']
];

export default function HeroGlobe3D() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const linksRef = useRef(null);
  const orbwRef = useRef(null);
  const orbRef = useRef(null);
  
  const nodeRefs = useRef([]);
  const decRefs = useRef([]);
  const pathRefs = useRef([]);

  useEffect(() => {
    const stage = stageRef.current;
    const links = linksRef.current;
    const orbw = orbwRef.current;
    const orb = orbRef.current;
    const c = canvasRef.current;
    
    if (!stage || !c || !links || !orbw || !orb) return;

    orbw.classList.remove('show');
    decRefs.current.forEach(el => el && el.classList.remove('show'));
    nodeRefs.current.forEach(el => el && el.classList.remove('show'));

    const r = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true });
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 50);

    const tex = (() => {
      const cv = document.createElement('canvas');
      cv.width = cv.height = 64;
      const g = cv.getContext('2d');
      const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, '#fff');
      gr.addColorStop(0.4, 'rgba(255,255,255,.9)');
      gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr;
      g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(cv);
    })();

    const globe = new THREE.Group();
    scene.add(globe);

    const N = 650, P = [], pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    const c1 = new THREE.Color('#B76E79'), c2 = new THREE.Color('#E8B4B8'), tc = new THREE.Color();
    
    for (let i = 0; i < N; i++) {
      const y = 1 - i / (N - 1) * 2;
      const rr = Math.sqrt(1 - y * y);
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

    const pm = new THREE.PointsMaterial({ size: 0.08, map: tex, vertexColors: true, transparent: true, depthWrite: false, opacity: 0 });
    globe.add(new THREE.Points(pg, pm));

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
    const lm = new THREE.LineBasicMaterial({ color: 0xE8B4B8, transparent: true, opacity: 0, depthWrite: false });
    globe.add(new THREE.LineSegments(lg, lm));

    const sm = new THREE.MeshBasicMaterial({ color: 0xE8B4B8, transparent: true, opacity: 0, depthWrite: false });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.58, 40, 28), sm));

    const rm = new THREE.LineBasicMaterial({ color: 0xB76E79, transparent: true, opacity: 0 });
    RINGS.forEach(a => {
      const pts = [];
      for (let i = 0; i <= 128; i++) {
        const t = i / 128 * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(t) * a.radius, 0, Math.sin(t) * a.radius));
      }
      const l = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), rm);
      l.rotation.set(a.rx, a.ry, a.rz);
      globe.add(l);
    });

    const AN = 110, ap = new Float32Array(AN * 3);
    for (let i = 0; i < AN; i++) {
      ap[i * 3] = (Math.random() - 0.5) * 9;
      ap[i * 3 + 1] = (Math.random() - 0.5) * 6;
      ap[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }

    const ag = new THREE.BufferGeometry();
    ag.setAttribute('position', new THREE.BufferAttribute(ap, 3));
    const am = new THREE.PointsMaterial({ size: 0.05, map: tex, color: 0xE8B4B8, transparent: true, opacity: 0, depthWrite: false });
    const amb = new THREE.Points(ag, am);
    scene.add(amb);

    const nlm = new THREE.LineBasicMaterial({ color: 0xB76E79, transparent: true, opacity: 0, depthWrite: false });
    const nl = SRC.map(() => {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      scene.add(new THREE.Line(g, nlm));
      return g;
    });

    const pp = new Float32Array(SRC.length * 3);
    const pgm = new THREE.BufferGeometry();
    pgm.setAttribute('position', new THREE.BufferAttribute(pp, 3));
    const pmm = new THREE.PointsMaterial({ size: 0.12, map: tex, color: 0xB76E79, transparent: true, opacity: 0, depthWrite: false });
    scene.add(new THREE.Points(pgm, pmm));

    let W = 1, H = 1, mx = 0, my = 0, tx = 0, ty = 0, ps = 0, spin = 0, narrow = false, orbX = 0, orbY = 0, rx = 0, ry = 0, ppu = 100;
    const t0 = performance.now();
    const v = new THREE.Vector3();
    
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0;
    let targetRotX = 0;

    const sm01 = (a, b, x) => {
      x = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return x * x * (3 - 2 * x);
    };

    function size() {
      W = stage.clientWidth;
      H = stage.clientHeight;
      if (W === 0 || H === 0) return;
      r.setSize(W, H, false);
      narrow = W < 600;
      orbX = narrow ? W / 2 : W * 0.42;
      orbY = narrow ? H * 0.34 : H / 2;
      rx = narrow ? Math.min(W * 0.3, 150) : Math.min(180, W * 0.25);
      ry = narrow ? rx * 0.85 : rx * 0.95;
      
      cam.aspect = W / H;
      cam.setViewOffset(W, H, W / 2 - orbX, H / 2 - orbY, W, H);
      cam.updateProjectionMatrix();
      ppu = (H / 2) / (Math.tan(20 * Math.PI / 180) * 7.6);
      
      globe.scale.setScalar(narrow ? 0.85 : 1.3);
      links.setAttribute('viewBox', `0 0 ${W} ${H}`);
      
      orbw.style.left = orbX + 'px';
      orbw.style.top = orbY + 'px';
    }

    window.addEventListener('resize', size);
    const resizeObserver = new window.ResizeObserver(size);
    resizeObserver.observe(stage);
    setTimeout(size, 10);

    const onPointerDown = e => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      stage.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const onPointerMove = e => {
      if (isDragging) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        targetRotY += dx * 0.006;
        targetRotX += dy * 0.006;
        prevX = e.clientX;
        prevY = e.clientY;
      } else {
        tx = e.clientX / window.innerWidth * 2 - 1;
        ty = e.clientY / window.innerHeight * 2 - 1;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      if (stage) stage.style.cursor = 'grab';
    };

    stage.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const timeouts = [];
    timeouts.push(setTimeout(() => orbw.classList.add('show'), 400));
    timeouts.push(setTimeout(() => decRefs.current[0]?.classList.add('show'), 1200));
    timeouts.push(setTimeout(() => decRefs.current[1]?.classList.add('show'), 1400));
    timeouts.push(setTimeout(() => decRefs.current[2]?.classList.add('show'), 1600));
    timeouts.push(setTimeout(() => decRefs.current[3]?.classList.add('show'), 1800));
    SRC.forEach((n, i) => {
      timeouts.push(setTimeout(() => nodeRefs.current[i]?.classList.add('show'), 700 + i * 60));
    });

    const proj = (x, y, z) => {
      v.set(x, y, z).project(cam);
      return [(v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H];
    };

    let animId;
    function tick(now) {
      if (!stage) return;
      const t = (now - t0) / 1000;
      
      const raw = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.6)));
      ps += (raw - ps) * 0.07;
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
      
      const g = sm01(0.4, 1.1, t);
      const L = sm01(1, 1.6, t);
      
      spin += 0.0012 + (orb.matches(':hover') ? 0.006 : 0);
      
      globe.rotation.y = spin + mx * 0.25 + targetRotY;
      globe.rotation.x = my * 0.12 + targetRotX;
      
      amb.rotation.y = t * 0.01;
      
      pm.opacity = 0.9 * g;
      lm.opacity = (0.16 + ps * 0.08) * g;
      sm.opacity = 0.05 * g;
      rm.opacity = 0.28 * g;
      am.opacity = 0.5 * g;
      nlm.opacity = (0.1 + 0.45 * ps) * L;
      pmm.opacity = (0.4 + 0.5 * ps) * L;
      
      cam.position.set(mx * 0.3, -my * 0.2, 7.6);
      cam.lookAt(0, 0, 0);
      
      const k = (1 - 0.28 * ps);
      const sc = narrow ? 0.9 : 1.25;
      
      SRC.forEach((n, i) => {
        const nodeEl = nodeRefs.current[i];
        if (!nodeEl) return;
        
        const rInfo = RINGS[n.ring];
        const localPos = new THREE.Vector3(Math.cos(n.angle) * rInfo.radius, 0, Math.sin(n.angle) * rInfo.radius);
        localPos.applyEuler(new THREE.Euler(rInfo.rx, rInfo.ry, rInfo.rz));
        
        const worldPos = localPos.clone().applyMatrix4(globe.matrixWorld);
        
        if (worldPos.z < -0.2) {
           nodeEl.style.opacity = Math.max(0, 1 + worldPos.z * 1.5);
        } else {
           nodeEl.style.opacity = nodeEl.classList.contains('show') ? 1 : 0;
        }

        const [px, py] = proj(worldPos.x, worldPos.y, worldPos.z);
        const floatY = Math.sin(t * 1.5 + i) * 6;
        const s = (0.88 + 0.12 * (worldPos.z / rInfo.radius)) * sc;
        
        nodeEl.style.transform = `translate(${px + mx * 8}px,${py + floatY}px) translate(-50%,-50%) scale(${s})`;
        nodeEl.style.zIndex = 2; // Always behind the center orb which is z-index 3
        
        const arr = nl[i].attributes.position.array;
        arr[0] = worldPos.x; arr[1] = worldPos.y; arr[2] = worldPos.z;
        arr[3] = 0; arr[4] = 0; arr[5] = 0; 
        nl[i].attributes.position.needsUpdate = true;
        
        const q = (t * 0.25 + i / SRC.length) % 1;
        pp[i * 3] = worldPos.x * (1 - q);
        pp[i * 3 + 1] = worldPos.y * (1 - q);
        pp[i * 3 + 2] = worldPos.z * (1 - q);
      });
      pgm.attributes.position.needsUpdate = true;
      
      const cw = 170 * sc; // Fixed width from CSS, avoids offsetWidth reflow
      
      DEC.forEach((d, i) => {
        const decEl = decRefs.current[i];
        const p = pathRefs.current[i];
        if (!decEl || !p) return;
        
        let x, y;
        if (narrow) {
          x = W / 2 + (i % 2 ? 1 : -1) * (cw / 2 + 6);
          y = H * (0.7 + Math.floor(i / 2) * 0.15);
        } else {
          x = W - cw / 2 - 20; // Added 14px padding from right edge
          y = H * (0.17 + 0.22 * i) + Math.sin(t * 0.6 + i) * 4;
        }
        decEl.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) scale(${sc})`;
        
        if (narrow) {
          p.setAttribute('opacity', 0);
        } else {
          const ex = x - cw / 2;
          const m = (orbX + ex) / 2;
          p.setAttribute('d', `M${orbX} ${orbY} C${m} ${orbY},${m} ${y},${ex} ${y}`);
          p.setAttribute('opacity', (0.12 + 0.6 * ps) * L * (decEl.classList.contains('show') ? 1 : 0));
        }
      });
      
      orbw.style.transform = `translate(-50%,-50%) scale(${1.2 + ps * 0.12})`;
      
      r.render(scene, cam);
      animId = requestAnimationFrame(tick);
    }
    
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', size);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (stage) stage.removeEventListener('pointerdown', onPointerDown);
      resizeObserver.disconnect();
      timeouts.forEach(clearTimeout);
      
      pg.dispose();
      pm.dispose();
      lg.dispose();
      lm.dispose();
      sm.dispose();
      rm.dispose();
      ag.dispose();
      am.dispose();
      pgm.dispose();
      pmm.dispose();
      nl.forEach(g => g.dispose());
      nlm.dispose();
      r.dispose();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hero-globe-3d-wrapper {
          --vio: #B76E79;
          --mut: #6b6a85;
          --ink: #14122b;
          --bd: rgba(183,110,121,.16);
          width: 100%;
          height: 720px;
          position: relative;
        }
        @media(max-width:760px){
          .hero-globe-3d-wrapper { height: 640px; }
        }
        .hero-globe-3d-wrapper #stage {
          position: relative;
          height: 100%;
          width: 100%;
          cursor: grab;
        }
        .hero-globe-3d-wrapper #stage:active {
          cursor: grabbing;
        }
        .hero-globe-3d-wrapper canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .hero-globe-3d-wrapper #links {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
          z-index: 1;
        }
        .hero-globe-3d-wrapper .item {
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
          transition: opacity .6s ease;
          will-change: transform;
          z-index: 2;
          pointer-events: auto;
        }
        .hero-globe-3d-wrapper .item.show {
          opacity: 1;
        }
        
        .hero-globe-3d-wrapper .node-icon-badge {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 6px 16px rgba(183,110,121,.12), 0 0 0 1px rgba(183,110,121,.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform .35s ease, box-shadow .35s ease;
          cursor: pointer;
          user-select: none;
        }
        .hero-globe-3d-wrapper .item.show .node-icon-badge:hover {
          transform: scale(1.15) !important;
          box-shadow: 0 10px 24px rgba(183,110,121,.2), 0 0 0 1px rgba(183,110,121,.15);
        }

        .hero-globe-3d-wrapper .card {
          width: 164px;
          padding: 10px 12px;
          border-radius: 14px;
          background: rgba(255,255,255,.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid var(--bd);
          box-shadow: 0 10px 28px -12px rgba(183,110,121,.25);
          display: flex;
          gap: 10px;
          align-items: center;
          transition: transform .35s ease,box-shadow .35s ease;
          color: var(--ink);
        }
        @media(max-width:700px){
          .hero-globe-3d-wrapper .card { width: 100%; }
        }
        .hero-globe-3d-wrapper .item.show .card:hover {
          transform: scale(1.07);
          box-shadow: 0 16px 40px -10px rgba(183,110,121,.45),0 0 0 1px rgba(183,110,121,.25);
        }
        
        .hero-globe-3d-wrapper .dec {
          width: 170px;
          align-items: flex-start;
        }
        @media(max-width:700px){
          .hero-globe-3d-wrapper .dec { width: 140px; }
        }
        .hero-globe-3d-wrapper .dec .ic {
          flex: none;
          width: 30px;
          height: 30px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          background: #F7E7CE;
          color: var(--vio);
        }
        .hero-globe-3d-wrapper .dec .t {
          color: var(--vio);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .07em;
          font-weight: 700;
        }
        .hero-globe-3d-wrapper .dec .s {
          color: var(--ink);
          font-size: 12px;
          font-weight: 500;
          margin-top: 3px;
          line-height: 1.3;
        }
        .hero-globe-3d-wrapper .dec.imp .ic {
          background: #F7E7CE;
          color: var(--vio);
        }
        .hero-globe-3d-wrapper .dec.imp .t {
          color: var(--vio);
        }
        .hero-globe-3d-wrapper .orb {
          width: 128px;
          height: 128px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          text-align: center;
          background: radial-gradient(circle at 35% 28%,#fff 0%,#F7E7CE 35%,#E8B4B8 72%,#B76E79 100%);
          box-shadow: 0 18px 60px -10px rgba(183,110,121,.55),inset 0 -12px 26px rgba(183,110,121,.3),inset 0 7px 18px rgba(255,255,255,.9);
          cursor: pointer;
          transition: transform 1s;
        }
        @media(max-width:700px){
          .hero-globe-3d-wrapper .orb {
            width: 100px;
            height: 100px;
          }
        }
        .hero-globe-3d-wrapper .orb svg {
          width: 26px;
          height: 26px;
          display: block;
          margin: 0 auto 3px;
        }
        @media(max-width:700px){
          .hero-globe-3d-wrapper .orb svg { width: 20px; height: 20px; }
        }
        .hero-globe-3d-wrapper .orb b {
          font-size: 16px;
          color: #4a2c31;
          letter-spacing: -.02em;
        }
        @media(max-width:700px){
          .hero-globe-3d-wrapper .orb b { font-size: 13px; }
        }
        .hero-globe-3d-wrapper .orb small {
          display: block;
          font-size: 8.5px;
          color: #B76E79;
          margin-top: 2px;
          letter-spacing: .04em;
        }
        .hero-globe-3d-wrapper #orbw {
          z-index: 3;
        }
      `}} />
      <div className="hero-globe-3d-wrapper">
        <div id="stage" ref={stageRef}>
          <canvas id="c" ref={canvasRef}></canvas>
          <svg id="links" ref={linksRef}>
            {DEC.map((_, i) => (
              <path key={i} ref={el => pathRefs.current[i] = el} fill="none" stroke="#B76E79" strokeDasharray="3 5" strokeWidth="1.2" />
            ))}
          </svg>
          <div className="item" id="orbw" ref={orbwRef}>
            <div className="orb" id="orb" ref={orbRef}>
              <div>
                <svg viewBox="0 0 24 24"><path d="M12 1c1 6 5 10 11 11-6 1-10 5-11 11-1-6-5-10-11-11C7 11 11 7 12 1z" fill="#B76E79"/></svg>
                <b>Stelloid</b>
                <small>AI decision layer</small>
              </div>
            </div>
          </div>
          
          {SRC.map((s, i) => (
            <div key={i} className="item source-node" ref={el => nodeRefs.current[i] = el}>
              <div className="node-icon-badge">
                <s.Svg />
              </div>
            </div>
          ))}
          
          {DEC.map((d, i) => (
            <div key={`dec-${i}`} className={`item`} ref={el => decRefs.current[i] = el}>
              <div className={`card dec ${d[3]}`}>
                <div className="ic">{d[2]}</div>
                <div>
                  <div className="t">{d[0]}</div>
                  <div className="s">{d[1]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
