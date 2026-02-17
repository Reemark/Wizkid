import { socialLinks, socialStats } from '../../data/socialLinks';
import Counter from '../shared/Counter';
import './SocialMedia.css';

export default function SocialMedia() {
  return (
    <section className="social-section">
      <div className="social-header glass-card-premium">
        <h2 className="social-title">Réseaux Sociaux</h2>
        <p className="social-tagline">Rejoignez des millions de fans à travers le monde</p>
      </div>

      <div className="social-stats-container glass-card-premium">
        <div className="stat-item card-3d">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">
              <Counter target={42.6} suffix="M+" />
            </div>
            <span className="stat-label">Total Followers</span>
          </div>
        </div>

        <div className="stat-item card-3d">
          <div className="stat-icon">🎵</div>
          <div className="stat-content">
            <div className="stat-value">
              <Counter target={15} suffix="M+" />
            </div>
            <span className="stat-label">Monthly Listeners</span>
          </div>
        </div>

        <div className="stat-item card-3d">
          <div className="stat-icon">▶️</div>
          <div className="stat-content">
            <div className="stat-value">
              <Counter target={5} suffix="B+" />
            </div>
            <span className="stat-label">Total Streams</span>
          </div>
        </div>

        <div className="stat-item card-3d">
          <div className="stat-icon">👁️</div>
          <div className="stat-content">
            <div className="stat-value">
              <Counter target={2} suffix="B+" />
            </div>
            <span className="stat-label">Video Views</span>
          </div>
        </div>
      </div>

      <div className="social-grid">
        {socialLinks.map((link, index) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card glass-card card-3d"
            style={{ '--social-color': link.color, '--card-index': index }}
          >
            <div className="social-glow" style={{ backgroundColor: link.color }} />

            <div className="social-icon-wrapper">
              <span className="social-icon">{link.icon}</span>
              {link.verified && (
                <span className="verified-badge glass-badge" title="Verified">
                  ✓
                </span>
              )}
            </div>

            <div className="social-info">
              <h3 className="social-name">{link.name}</h3>
              <p className="social-handle">{link.handle}</p>

              {link.followers && (
                <div className="social-stat glass-card">
                  <span className="social-stat-value">{link.followers}</span>
                  <span className="social-stat-label">Followers</span>
                </div>
              )}

              {link.subscribers && (
                <div className="social-stat glass-card">
                  <span className="social-stat-value">{link.subscribers}</span>
                  <span className="social-stat-label">Subscribers</span>
                </div>
              )}

              {link.monthlyListeners && (
                <div className="social-stat glass-card">
                  <span className="social-stat-value">{link.monthlyListeners}</span>
                  <span className="social-stat-label">Monthly Listeners</span>
                </div>
              )}
            </div>

            <div className="social-cta">
              <span>Suivre →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
