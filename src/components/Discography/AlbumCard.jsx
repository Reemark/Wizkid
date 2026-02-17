import { useState } from 'react';

export default function AlbumCard({ item, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <article
        className="album-card glass-card card-3d"
        style={{ '--album-color': item.color, '--card-index': index }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetails(true)}
      >
        <div className="album-cover-wrapper">
          <div className={`album-vinyl ${isHovered ? 'spinning' : ''}`}>
            <div className="vinyl-disc"></div>
          </div>
          <img src={item.cover} alt={item.title} className="album-cover" />
          {item.featured && <span className="album-badge glass-badge">⭐ Featured</span>}
        </div>

        <div className="album-info">
          <h3 className="album-title">{item.title}</h3>
          {item.artist && <p className="album-artist">{item.artist}</p>}
          <p className="album-year">{item.year}</p>
          <div className="album-meta">
            {item.tracks && <span className="album-tracks">🎵 {item.tracks} tracks</span>}
            {item.genre && (
              <div className="album-genres">
                {item.genre.slice(0, 2).map((g) => (
                  <span key={g} className="genre-tag glass-badge">
                    {g}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="album-actions">
          <button className="btn-details glass-button">📋 Détails</button>
        </div>
      </article>

      {showDetails && (
        <div className="album-modal-backdrop frosted-glass" onClick={() => setShowDetails(false)}>
          <div className="album-modal glass-card-premium" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close glass-button" onClick={() => setShowDetails(false)}>
              ✕
            </button>

            <div className="modal-content">
              <img src={item.cover} alt={item.title} className="modal-cover" />

              <div className="modal-info">
                <h2 className="modal-title">{item.title}</h2>
                {item.artist && <p className="modal-artist">{item.artist}</p>}
                <p className="modal-year">{item.year}</p>

                {item.description && <p className="modal-description">{item.description}</p>}

                {item.label && (
                  <p className="modal-label">
                    <strong>Label:</strong> {item.label}
                  </p>
                )}

                {item.releaseDate && (
                  <p className="modal-release">
                    <strong>Sortie:</strong> {new Date(item.releaseDate).toLocaleDateString('fr-FR')}
                  </p>
                )}

                {item.topTracks && (
                  <div className="modal-tracks">
                    <h3>Titres phares</h3>
                    <ul>
                      {item.topTracks.map((track) => (
                        <li key={track.id}>
                          {track.title} <span className="track-duration">({track.duration})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.streamingLinks && (
                  <div className="modal-streaming">
                    <h3>Écouter sur</h3>
                    <div className="streaming-links">
                      {item.streamingLinks.spotify && (
                        <a
                          href={item.streamingLinks.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="streaming-btn glass-button"
                        >
                          🎧 Spotify
                        </a>
                      )}
                      {item.streamingLinks.appleMusic && (
                        <a
                          href={item.streamingLinks.appleMusic}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="streaming-btn glass-button"
                        >
                          🍎 Apple Music
                        </a>
                      )}
                      {item.streamingLinks.youtube && (
                        <a
                          href={item.streamingLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="streaming-btn glass-button"
                        >
                          ▶️ YouTube
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
