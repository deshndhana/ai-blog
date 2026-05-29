import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" className="logo gradient-text" style={{ textDecoration: 'none' }}>
          Lumina AI
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="https://www.linkedin.com/in/dhananjaya-deshapriya" target="_blank" rel="noopener noreferrer" className="nav-link">
            LinkedIn
          </a>
          <a href="https://www.linkedin.com/in/dhananjaya-deshapriya" target="_blank" rel="noopener noreferrer" className="nav-link">
            Contact Me
          </a>
        </div>
      </div>
    </nav>
  );
}
