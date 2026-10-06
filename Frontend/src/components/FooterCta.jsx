

export function FooterCta() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand-block">
          <div className="brand-mark">
            <img src="/black-logo.png" alt="Stelloid" style={{ height: '32px', width: 'auto' }} />
          </div>
          <p>The AI Chief Commercial Officer<br />for multichannel e-commerce brands.</p>
        </div>

        <div className="footer-links-block">
          <a href="mailto:contact@stelloid.io">contact@stelloid.io ↗</a>
          <div className="footer-sub-links">
            <a href="#">Product demo ↗</a>
            <a href="#">Stelloid.io ↗</a>
          </div>
        </div>
      </div>

      <div className="container footer-legal">
        <span>© 2026 Stelloid AI</span>
        <span style={{ marginLeft: '8px' }}>Read-only access. Human-approved actions.</span>
      </div>
    </footer>
  );
}
