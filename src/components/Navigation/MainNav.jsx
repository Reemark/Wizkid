import { useState, useEffect } from 'react';
import './MainNav.css';

export default function MainNav({ currentSection, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'cover', label: 'Accueil', icon: '🏠' },
    { id: 'video', label: 'Vidéo', icon: '🎬' },
    { id: 'slides', label: 'Timeline', icon: '📊' },
    { id: 'gallery', label: 'Galerie', icon: '🖼️' },
    { id: 'discography', label: 'Discographie', icon: '💿' },
    { id: 'social', label: 'Social', icon: '🌐' },
  ];

  const handleNavClick = (sectionId) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`main-nav frosted-glass ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand" onClick={() => handleNavClick('cover')}>
            <span className="brand-icon">⭐</span>
            <span className="brand-text">WIZKID</span>
          </div>

          <button
            className="mobile-menu-toggle glass-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-link glass-button ${currentSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}
