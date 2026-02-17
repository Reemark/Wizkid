import { heroTitleLetters } from '../../data/slides';
import './Hero.css';

export default function Hero({ onContinue }) {
  return (
    <main className="hero-screen" style={{ '--hero-bg': 'url(/Wizkid.webp)' }}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-panel glass-card-premium">
          <p className="hero-kicker hero-line" style={{ '--delay': '120ms' }}>
            Global Icon
          </p>
          <h1 className="hero-line hero-word holographic-title" style={{ '--delay': '260ms' }}>
            {heroTitleLetters.map((letter, index) => (
              <span key={`${letter}-${index}`} className="hero-char" style={{ '--char-delay': `${index * 90}ms` }}>
                {letter}
              </span>
            ))}
          </h1>
          <p className="hero-goat hero-line" style={{ '--delay': '420ms' }}>
            THE KING OF AFROBEATS
          </p>
          <p className="hero-subtitle hero-line" style={{ '--delay': '560ms' }}>
            A living monument in modern music, inspiring millions around the world.
          </p>
          <button type="button" className="primary-btn glass-button hero-line" style={{ '--delay': '700ms' }} onClick={onContinue}>
            Watch Intro Video
          </button>
        </div>
      </div>
    </main>
  );
}
