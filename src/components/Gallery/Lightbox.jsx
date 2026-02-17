import { useEffect, useState } from 'react';
import useScrollLock from '../../hooks/useScrollLock';

export default function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const [isZoomed, setIsZoomed] = useState(false);

  useScrollLock(true);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
      if (e.key === 'z' || e.key === 'Z') setIsZoomed(!isZoomed);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onClose, onNavigate, isZoomed]);

  const currentImage = images[currentIndex];

  return (
    <div className="lightbox-backdrop frosted-glass" onClick={onClose}>
      <button className="lightbox-close glass-button" onClick={onClose} aria-label="Fermer">
        ✕
      </button>

      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <div className={`lightbox-image-wrapper ${isZoomed ? 'zoomed' : ''}`}>
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="lightbox-image"
            onClick={() => setIsZoomed(!isZoomed)}
          />
        </div>

        <div className="lightbox-info glass-card-premium">
          <h3 className="lightbox-title">{currentImage.alt}</h3>
          <p className="lightbox-meta">
            📅 {currentImage.year} • 📍 {currentImage.location}
          </p>
          <p className="lightbox-zoom-hint">
            {isZoomed ? '🔍 Cliquez pour dézoomer' : '🔍 Cliquez pour zoomer'}
          </p>
        </div>

        <button
          className="lightbox-nav lightbox-prev glass-button"
          onClick={() => onNavigate('prev')}
          aria-label="Image précédente"
        >
          ‹
        </button>
        <button
          className="lightbox-nav lightbox-next glass-button"
          onClick={() => onNavigate('next')}
          aria-label="Image suivante"
        >
          ›
        </button>

        <div className="lightbox-counter glass-badge">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
