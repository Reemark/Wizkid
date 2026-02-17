import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Line, Marker } from 'react-simple-maps';
import AnimatedCounter from '../shared/AnimatedCounter';
import InteractiveGallery from './InteractiveGallery';
import { assetUrl } from '../../utils/assetUrl';

function FactCard({ label, value, delay = '0s' }) {
  return (
    <article className="glass-card reveal" style={{ animationDelay: delay }}>
      <p className="fact-label">{label}</p>
      <p className="fact-value">{value}</p>
    </article>
  );
}

function RevealBlock({ step, revealStep, className = '', style, children }) {
  const isVisible = revealStep >= step;
  return (
    <div className={`click-reveal ${isVisible ? 'is-visible' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}

function IconBadge({ type, label }) {
  return (
    <span className="icon-badge">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {type === 'music' ? <path d="M16 4v11.2a3.5 3.5 0 1 1-1-2.4V7.2l-6 1.8v8.2a3.5 3.5 0 1 1-1-2.4V8.2c0-.44.29-.83.71-.96l7.99-2.4A1 1 0 0 1 18 5.8v9.4h-2V4z" /> : null}
        {type === 'star' ? <path d="m12 3 2.66 5.39 5.95.87-4.3 4.19 1.02 5.93L12 16.6l-5.33 2.78 1.02-5.93-4.3-4.19 5.95-.87z" /> : null}
        {type === 'globe' ? <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.06a15.6 15.6 0 0 0-1.24-5 8.04 8.04 0 0 1 4.3 5ZM12 4.02c.93 1.2 1.72 3.2 2 5.98h-4c.28-2.78 1.07-4.78 2-5.98ZM8.37 6a15.6 15.6 0 0 0-1.24 5H4.07a8.04 8.04 0 0 1 4.3-5ZM4.07 13h3.06c.2 1.8.64 3.52 1.24 5a8.04 8.04 0 0 1-4.3-5ZM12 19.98c-.93-1.2-1.72-3.2-2-5.98h4c-.28 2.78-1.07 4.78-2 5.98ZM15.63 18c.6-1.48 1.04-3.2 1.24-5h3.06a8.04 8.04 0 0 1-4.3 5Z" /> : null}
      </svg>
      {label}
    </span>
  );
}

const videoCards = [
  {
    title: 'One Dance',
    youtubeId: '4JipHEz53sU',
    description: 'Le titre qui a accelere son impact mondial.',
  },
  {
    title: 'Essence',
    youtubeId: 'm77FDcKg96Q',
    description: 'L hymne Afrobeats qui a conquis les charts.',
  },
  {
    title: 'Live Performance',
    youtubeId: 'qTRQiwaU7GI',
    description: 'Une presence scenique qui captive tout le public.',
  },
];

const wizkidWebImages = {
  grammyPortrait: 'https://i8.amplience.net/i/naras/wizkid_MI0005473154-MN0003081520',
  stageClassic: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Wizkid_at_Iyanya%27s_album_launch_concert%2C_2013.jpg',
  stageCloseup: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Wizkid_at_Iyanya%27s_album_launch_concert%2C_2013_%28cropped%29.jpg',
  canex2025: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Wizkid_in_Canex_-_Algiers_2025.jpg',
  instagramProfile: 'https://cdn.hypeauditor.com/img/instagram/user/29071770.jpg?sign=26f556de0aa9b3f957d7a4a56898399f&till=1771333200&w=150',
};

const grammyTrophyImage = 'https://www.yabaleftonline.ng/wp-content/uploads/2021/06/wiz-p.jpg';
const localFallbackImage = assetUrl('Wizkid.webp');

function WizkidImageStrip() {
  return (
    <div className="wizkid-strip">
      <img src={wizkidWebImages.grammyPortrait} alt="Wizkid portrait" loading="lazy" onError={(event) => { event.currentTarget.src = localFallbackImage; }} />
      <img src={wizkidWebImages.canex2025} alt="Wizkid live in Algiers 2025" loading="lazy" onError={(event) => { event.currentTarget.src = localFallbackImage; }} />
      <img src={wizkidWebImages.stageClassic} alt="Wizkid performing on stage" loading="lazy" onError={(event) => { event.currentTarget.src = localFallbackImage; }} />
    </div>
  );
}

const worldGeoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const globalCities = [
  { id: 'lagos', country: 'Nigeria', city: 'Lagos', coordinates: [3.3792, 6.5244] },
  { id: 'london', country: 'United Kingdom', city: 'London', coordinates: [-0.1276, 51.5072] },
  { id: 'new-york', country: 'United States', city: 'New York', coordinates: [-74.006, 40.7128] },
  { id: 'toronto', country: 'Canada', city: 'Toronto', coordinates: [-79.3832, 43.6532] },
];

function WorldMapHighlights() {
  const origin = globalCities[0].coordinates;

  return (
    <div className="world-map world-map-real">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 145 }}
        width={920}
        height={430}
        className="world-map-svg"
      >
        <Geographies geography={worldGeoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} className="map-country" />
            ))
          }
        </Geographies>

        {globalCities.slice(1).map((destination) => (
          <Line
            key={`line-${destination.id}`}
            from={origin}
            to={destination.coordinates}
            stroke="#d5b56e"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeDasharray="4 4"
            className="map-connection"
          />
        ))}

        {globalCities.map((place) => (
          <Marker key={place.id} coordinates={place.coordinates}>
            <g className="map-pin">
              <circle r={4.5} />
              <circle r={9} className="map-pin-ring" />
            </g>
            <text x={10} y={-10} className="map-label">
              {place.city}, {place.country}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}

export default function SlideContent({ slide, isActive, revealStep = 0, isPresenterPreview = false }) {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveVideo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo]);

  switch (slide.key) {
    case 'opening':
      return (
        <div className="opening-layout keynote-grid">
          <p className="biggest-presentation top-headline reveal" style={{ animationDelay: '0.05s' }}>
            The Biggest Presentation
          </p>
          <p className="eyebrow reveal">World Class Keynote</p>
          <h1 className="hero-title typing-title" aria-label={slide.title}>
            <span className="typing-text">{slide.title}</span>
          </h1>
          <p className="hero-subtitle reveal" style={{ animationDelay: '0.35s' }}>
            {slide.subtitle}
          </p>
          <RevealBlock step={1} revealStep={revealStep} className="opening-badges" style={{ animationDelay: '0.45s' }}>
            <span>Afrobeats</span>
            <span>Culture</span>
            <span>Global Impact</span>
          </RevealBlock>
          <RevealBlock step={2} revealStep={revealStep} className="icon-row">
            <IconBadge type="music" label="Sound" />
            <IconBadge type="star" label="Stardom" />
            <IconBadge type="globe" label="Worldwide" />
          </RevealBlock>
          <RevealBlock step={3} revealStep={revealStep}>
            <p className="presenter-meta">{slide.presenter} | {slide.date}</p>
          </RevealBlock>
        </div>
      );

    case 'identity':
      return (
        <div className="content-stack identity-layout">
          <div>
            <h2 className="slide-title reveal">Who Is Wizkid?</h2>
            <RevealBlock step={1} revealStep={revealStep}>
              <p className="slide-lead">Ayodeji Ibrahim Balogun is one of the strongest African creative forces of his generation.</p>
            </RevealBlock>
            <RevealBlock step={2} revealStep={revealStep} className="identity-tags">
              <span>Lagos, Nigeria</span>
              <span>Afrobeats / R&B</span>
              <span>Global Icon</span>
            </RevealBlock>
            <RevealBlock step={3} revealStep={revealStep}>
              <div className="facts-grid">
                <FactCard label="Origin" value="Surulere" delay="0.1s" />
                <FactCard label="Craft" value="Melody + Rhythm" delay="0.15s" />
                <FactCard label="Identity" value="African Excellence" delay="0.2s" />
              </div>
            </RevealBlock>
            <RevealBlock step={3} revealStep={revealStep}>
              <WizkidImageStrip />
            </RevealBlock>
          </div>
          <div className="identity-video-wrap reveal" style={{ animationDelay: '0.25s' }}>
            {isPresenterPreview ? (
              <div className="presenter-media-placeholder">Video preview disabled in presenter window</div>
            ) : (
              <video className="identity-video" controls preload="auto" playsInline>
                <source src={slide.videoFile} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      );

    case 'beginnings':
      return (
        <div className="content-stack wide">
          <h2 className="slide-title reveal">Humble Beginnings</h2>
          <RevealBlock step={1} revealStep={revealStep}>
            <p className="slide-lead">From the streets of Lagos to global arenas, his rise started with discipline and obsession.</p>
          </RevealBlock>
          <RevealBlock step={2} revealStep={revealStep}>
            <div className="timeline-row timeline-sequence">
              <article className="timeline-node"><p className="timeline-year">1990</p><p>Born in Lagos</p></article>
              <article className="timeline-node"><p className="timeline-year">11 Years</p><p>First recording sessions</p></article>
              <article className="timeline-node"><p className="timeline-year">Teen Years</p><p>First group: Glorious Five</p></article>
              <article className="timeline-node"><p className="timeline-year">Turning Point</p><p>Signed, focused, unstoppable</p></article>
            </div>
          </RevealBlock>
          <RevealBlock step={3} revealStep={revealStep} className="icon-row">
            <IconBadge type="music" label="Early Talent" />
            <IconBadge type="star" label="Work Ethic" />
          </RevealBlock>
        </div>
      );

    case 'stardom':
      return (
        <div className="content-stack wide">
          <h2 className="slide-title reveal">Rise to Stardom</h2>
          <RevealBlock step={1} revealStep={revealStep}>
            <div className="stardom-board timeline-sequence">
              <FactCard label="Breakout" value="Holla at Your Boy" delay="0.05s" />
              <FactCard label="Debut Album" value="Superstar (2011)" delay="0.1s" />
              <FactCard label="Effect" value="Pan-African Phenomenon" delay="0.15s" />
            </div>
          </RevealBlock>
          <RevealBlock step={2} revealStep={revealStep} className="icon-row">
            <IconBadge type="star" label="Hit Maker" />
            <IconBadge type="globe" label="Cross Border" />
          </RevealBlock>
          <RevealBlock step={3} revealStep={revealStep}>
            <p className="signature-line">One single changed everything. One album confirmed greatness.</p>
          </RevealBlock>
        </div>
      );

    case 'global':
      return (
        <div className="content-stack wide">
          <h2 className="slide-title reveal">Global Breakthrough</h2>
          <RevealBlock step={1} revealStep={revealStep}>
            <p className="slide-lead">One Dance with Drake transformed Wizkid from continental star to global chart authority.</p>
          </RevealBlock>
          <RevealBlock step={2} revealStep={revealStep}>
            <WorldMapHighlights />
          </RevealBlock>
          <RevealBlock step={3} revealStep={revealStep} className="global-metrics">
            <span>#1 in multiple countries</span>
            <span>Billions of streams</span>
            <span>Afrobeats on world radios</span>
          </RevealBlock>
        </div>
      );

    case 'afrobeats':
      return (
        <div className="content-stack wide">
          <h2 className="slide-title reveal">Afrobeats Revolution</h2>
          <div className="afrobeats-layout">
            <div className="afrobeats-video-wrap reveal" style={{ animationDelay: '0.2s' }}>
              {isPresenterPreview ? (
                <div className="presenter-media-placeholder">YouTube preview disabled in presenter window</div>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/XRXUSCBzDIg"
                  title="Wizkid - Afrobeats Revolution"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
            <div className="afrobeats-copy">
              <RevealBlock step={1} revealStep={revealStep}>
                <p className="quote-mini">He did not export a sound only. He exported identity.</p>
              </RevealBlock>
              <RevealBlock step={2} revealStep={revealStep}>
                <div className="pillars-grid">
                  <FactCard label="Sound" value="Afrobeats mainstream" delay="0.1s" />
                  <FactCard label="Culture" value="African pride globally" delay="0.15s" />
                  <FactCard label="Legacy" value="Doors opened for many" delay="0.2s" />
                </div>
              </RevealBlock>
              <RevealBlock step={3} revealStep={revealStep} className="icon-row">
                <IconBadge type="music" label="Rhythm" />
                <IconBadge type="globe" label="Movement" />
              </RevealBlock>
            </div>
          </div>
        </div>
      );

    case 'awards':
      return (
        <div className="content-stack wide">
          <h2 className="slide-title reveal">Awards & Records</h2>
          <RevealBlock step={1} revealStep={revealStep}>
            <article className="grammy-highlight">
              <img
                src={grammyTrophyImage}
                alt="Grammy Award trophy"
                loading="lazy"
                onError={(event) => { event.currentTarget.src = localFallbackImage; }}
              />
              <div className="grammy-highlight-copy">
                <p className="fact-label">2021 Grammy - Best Music Video</p>
                <p className="fact-value">Brown Skin Girl: Beyonce, Blue Ivy, SAINt JHN & Wizkid</p>
                <p>Victoire historique partagee avec Beyonce.</p>
                <div className="grammy-badge-row">
                  <span className="grammy-badge">Winner</span>
                  <span className="grammy-badge">Best Music Video</span>
                  <span className="grammy-badge">Global Recognition</span>
                </div>
              </div>
            </article>
          </RevealBlock>
          <RevealBlock step={1} revealStep={revealStep}>
            <div className="counters-grid trophy-grid">
              <article className="glass-card"><p className="fact-label">Grammy</p><p className="fact-value">Winner</p></article>
              <article className="glass-card"><p className="fact-label">BET Awards</p><p className="fact-value">Multi-Winner</p></article>
              <article className="glass-card"><p className="fact-label">Streams</p><p className="fact-value"><AnimatedCounter target={5} suffix="B+" isActive={isActive} /></p></article>
              <article className="glass-card"><p className="fact-label">Monthly Reach</p><p className="fact-value"><AnimatedCounter target={30} suffix="M+" isActive={isActive} /></p></article>
            </div>
          </RevealBlock>
          <RevealBlock step={2} revealStep={revealStep} className="icon-row">
            <IconBadge type="star" label="Elite Awards" />
            <IconBadge type="globe" label="Global Charts" />
          </RevealBlock>
        </div>
      );

    case 'videos':
      return (
        <div className="content-stack wide">
          <h2 className="slide-title reveal">Video Experience</h2>
          <RevealBlock step={1} revealStep={revealStep}>
            <p className="slide-lead">Click a card to launch a focused playback.</p>
          </RevealBlock>
          <RevealBlock step={2} revealStep={revealStep}>
            <div className="video-grid video-grid-premium">
              {videoCards.map((video) => (
                <button
                  key={video.youtubeId}
                  type="button"
                  className="video-card clickable-video"
                  onClick={() => !isPresenterPreview && setActiveVideo(video)}
                  disabled={isPresenterPreview}
                >
                  <div className="video-thumb-wrap">
                    <img src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} alt={video.title} className="video-thumb" />
                    <span className="play-badge">{isPresenterPreview ? 'Preview' : 'Play'}</span>
                  </div>
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </button>
              ))}
            </div>
          </RevealBlock>
          {!isPresenterPreview ? <InteractiveGallery /> : null}

          {activeVideo && !isPresenterPreview ? (
            <div className="video-modal-backdrop" role="dialog" aria-modal="true" onClick={() => setActiveVideo(null)}>
              <div className="video-modal-content" onClick={(event) => event.stopPropagation()}>
                <div className="video-modal-header">
                  <h3>{activeVideo.title}</h3>
                  <button type="button" className="close-video-modal" onClick={() => setActiveVideo(null)}>Fermer</button>
                </div>
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : null}
        </div>
      );

    case 'legacy':
      return (
        <div className="content-stack wide legacy-layout">
          <div className="legacy-header">
            <h2 className="legacy-title-plain">INFLUENCE & LEGACY</h2>
            <p className="slide-lead">Beyond music, Wizkid shaped how African creativity is perceived in fashion, media, and youth culture.</p>
          </div>
          <div className="legacy-video-wrap">
            <div className="legacy-video-stack">
              <div className="legacy-video-card">
                <p className="legacy-video-label">Performance 1</p>
                {isPresenterPreview ? (
                  <div className="presenter-media-placeholder">Video preview disabled in presenter window</div>
                ) : (
                  <video className="legacy-video" controls preload="auto" playsInline>
                    <source src={slide.videoFile} type="video/mp4" />
                  </video>
                )}
              </div>
              {slide.secondVideoFile ? (
                <div className="legacy-video-card">
                  <p className="legacy-video-label">Performance 2</p>
                  {isPresenterPreview ? (
                    <div className="presenter-media-placeholder">Video preview disabled in presenter window</div>
                  ) : (
                    <video className="legacy-video" controls preload="auto" playsInline>
                      <source src={slide.secondVideoFile} type="video/mp4" />
                    </video>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          <div className="legacy-grid">
            <FactCard label="Artists" value="A whole new generation inspired" delay="0.1s" />
            <FactCard label="Fashion" value="Style references worldwide" delay="0.15s" />
            <FactCard label="Culture" value="African identity amplified" delay="0.2s" />
            <FactCard label="Reputation" value="Global respect sustained" delay="0.25s" />
          </div>
          <div className="icon-row">
            <IconBadge type="music" label="Influence" />
            <IconBadge type="star" label="Legacy" />
            <IconBadge type="globe" label="Impact" />
          </div>
        </div>
      );

    case 'greatest':
      return (
        <div className="content-stack centered manifesto-wrap">
          <h2 className="slide-title reveal">Why He Is the Greatest African Artist</h2>
          <RevealBlock step={1} revealStep={revealStep}>
            <p className="slide-lead">Consistency. Authenticity. Global proof. Cultural responsibility.</p>
          </RevealBlock>
          <RevealBlock step={2} revealStep={revealStep}>
            <div className="manifesto-grid">
              <span>Global charts domination</span>
              <span>Iconic collaborations</span>
              <span>Culture-first storytelling</span>
              <span>Multi-generational influence</span>
            </div>
          </RevealBlock>
          <RevealBlock step={3} revealStep={revealStep}>
            <p className="signature-line">He did not follow the global sound. He changed it.</p>
          </RevealBlock>
        </div>
      );

    case 'message':
      return (
        <div className="content-stack centered ending finale-wrap">
          <p className="eyebrow reveal">Final Message</p>
          <h2 className="slide-title reveal" style={{ animationDelay: '0.15s' }}>Inspirational Message</h2>
          <RevealBlock step={1} revealStep={revealStep}>
            <p className="quote">"From Lagos dreams to global stages, African excellence has no ceiling."</p>
          </RevealBlock>
          <RevealBlock step={2} revealStep={revealStep} className="icon-row">
            <IconBadge type="star" label="Thank You" />
          </RevealBlock>
          <RevealBlock step={2} revealStep={revealStep}>
            <div className="film-strip">
              <div className="film-strip-track">
                <p>A story of vision, rhythm, and legacy.</p>
                <p>From Lagos streets to global stages.</p>
                <p>Wizkid inspired a generation.</p>
                <p>Afrobeats became a global language.</p>
                <p>African excellence, worldwide respect.</p>
                <p>Thank you for watching.</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      );

    default:
      return null;
  }
}
