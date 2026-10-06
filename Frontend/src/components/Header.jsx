import { Sparkles } from 'lucide-react';

const navItems = ['How it works', 'Product', 'Why Stelloid'];

export default function Header() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="brand-mark">
          <div className="brand-icon">
            <Sparkles size={22} />
          </div>
          <span>stelloid</span>
        </div>

        <nav className="nav-menu" aria-label="Main navigation">
          {navItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`nav-link${index === 0 ? ' active' : ''}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="#" className="signin-link">Sign in</a>
          <button className="primary-button nav-button">Book a demo</button>
        </div>
      </div>
    </header>
  );
}
