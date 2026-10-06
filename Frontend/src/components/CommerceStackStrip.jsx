import React from 'react';
import { FileText, Plus, BarChart, ShoppingCart } from 'lucide-react';

// Re-using SVGs for the brands
const ShopifySVG = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="#95BF47"><path d="M15.4 3.7c-.1-.1-.3-.2-.5-.2-.1 0-1.4.2-3.8.9-2.5.7-4.8 1.4-4.9 1.4-.4.1-.7.4-.8.8l-1.9 14.3 10.7 2.1 4.5-17.6c.1-.4-.1-.8-.4-1l-2.9-.7zM12.9 1.5c-.3 0-.6.2-.7.5l-1.8 3.9 3.5 1 1.7-4.8c-.1-.3-.4-.5-.7-.6h-2z"/></svg>;
const AmazonSVG = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="#FF9900"><path d="M13.68 19.04c-1.3.69-3.08 1.15-4.96 1.15-4.14 0-7.55-1.55-9.84-4.36-.26-.32-.23-.74.07-.98.3-.24.71-.24.99.03 2.05 1.95 5.16 3.32 8.78 3.32 1.76 0 3.4-.41 4.6-.96.48-.22 1.05.02 1.25.5.21.48-.12.98-.6 1.22l-.29.08z"/><path d="M14.67 19.04c-.45-.48-.56-1.15-.36-1.78l1.41-4.3c.12-.37.52-.57.88-.45.37.12.57.52.45.88l-1.01 3.1 3.16-1.04c.37-.12.77.08.89.45.12.37-.08.77-.45.89l-4.14 1.36c-.32.1-.64.03-.83-.11z"/><path d="M17.15 6.64c-.7-1.12-1.9-1.93-3.32-2.28-1.52-.37-3.13-.17-4.49.56-1.36.73-2.3 1.98-2.6 3.48-.12.58.26 1.14.84 1.26.58.12 1.14-.26 1.26-.84.21-1.03.86-1.89 1.79-2.39.93-.5 2.04-.64 3.08-.39.98.24 1.8 1.05 2.21 2.02l-3.21.08c-2.38.06-4.49 1.5-5.32 3.65-.58 1.51-.43 3.2.43 4.58.86 1.38 2.25 2.21 3.86 2.32 1.72.12 3.35-.61 4.41-1.92v1.07c0 .54.44.98.98.98s.98-.44.98-.98V7.5c0-.31-.14-.6-.39-.78l-.01-.08zM14.28 12c-.53 1.03-1.6 1.7-2.77 1.7-.85 0-1.63-.43-2.09-1.17-.45-.74-.53-1.65-.21-2.45.38-.97 1.3-1.61 2.35-1.64l2.74-.07v3.63z"/></svg>;
const MetaSVG = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="#0668E1"><path d="M22.46 10.98a6.52 6.52 0 0 0-4.66-1.92c-1.8 0-3.48.82-4.57 2.17a6.6 6.6 0 0 0-4.58-2.17c-3.6 0-6.52 2.94-6.52 6.55 0 3.6 2.92 6.54 6.52 6.54 1.8 0 3.48-.82 4.58-2.17 1.09 1.35 2.77 2.17 4.57 2.17 3.6 0 6.52-2.94 6.52-6.54 0-1.75-.68-3.41-1.86-4.63z" /></svg>;
const GoogleSVG = () => <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>;
const FlipkartSVG = () => <svg viewBox="0 0 24 24" width="20" height="20" fill="#2874F0"><rect width="24" height="24" rx="4"/><text x="12" y="17.5" fontSize="18" fontFamily="sans-serif" fontStyle="italic" fontWeight="bold" textAnchor="middle" fill="#FFE500">f</text></svg>;

const STACK_ITEMS = [
  { name: 'Amazon', icon: <AmazonSVG /> },
  { name: 'Flipkart', icon: <FlipkartSVG /> },
  { name: 'Meta Ads', icon: <MetaSVG /> },
  { name: 'Google Ads', icon: <GoogleSVG /> },
  { name: 'WooCommerce', icon: <ShoppingCart size={20} color="#96588a" /> },
  { name: 'Bol', icon: <div style={{fontWeight: 900, color: '#0000a4', letterSpacing: '-1px'}}>bol.</div> },
  { name: 'Google Analytics', icon: <BarChart size={20} color="#F9AB00" /> },
  { name: 'CSV', icon: <FileText size={20} color="#888" /> },
  { name: 'Many more', icon: <Plus size={20} color="#7864E6" />, isDashed: true },
  { name: 'Shopify', icon: <ShopifySVG /> },
];

export function CommerceStackStrip() {
  return (
    <div className="stack-strip-wrapper">
      <div className="stack-strip-title">BUILT FOR YOUR COMMERCE STACK</div>
      
      {/* We use two identical tracks to create the infinite seamless scroll effect */}
      <div className="stack-track-container">
        <div className="stack-track">
          {STACK_ITEMS.map((item, idx) => (
            <div key={`a-${idx}`} className={`stack-badge ${item.isDashed ? 'dashed' : ''}`}>
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
          {/* Duplicate set for seamless looping */}
          {STACK_ITEMS.map((item, idx) => (
            <div key={`b-${idx}`} className={`stack-badge ${item.isDashed ? 'dashed' : ''}`}>
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
          {/* Third duplicate set for extra wide screens */}
          {STACK_ITEMS.map((item, idx) => (
            <div key={`c-${idx}`} className={`stack-badge ${item.isDashed ? 'dashed' : ''}`}>
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Left/Right fading gradients for smooth edge disappearance */}
      <div className="stack-fade-left"></div>
      <div className="stack-fade-right"></div>
    </div>
  );
}

export default CommerceStackStrip;
