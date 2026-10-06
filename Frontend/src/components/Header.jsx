

const navItems = ['How it works', 'Product', 'Why Stelloid'];

export default function Header() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <div className="brand-mark">
          <img src="/black-logo.png" alt="Stelloid" style={{ height: '32px', width: 'auto' }} />
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
          <a href="#" className="signin-link" style={{ whiteSpace: 'nowrap' }}>Sign in</a>
          <button className="secondary-button nav-button">Book a demo</button>
        </div>
      </div>
    </header>
  );
}
