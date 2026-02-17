import { useState } from 'react';
import { galleryImages, galleryCategories } from '../../data/gallery';
import Lightbox from './Lightbox';
import './Gallery.css';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section className="gallery-section">
      <div className="gallery-header glass-card-premium">
        <h2 className="gallery-title">Galerie Photo</h2>
        <p className="gallery-subtitle">Découvrez Wizkid à travers les moments marquants</p>

        <div className="gallery-filters">
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn glass-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-label">{category.label}</span>
            </button>
          ))}
        </div>

        <div className="gallery-counter">
          {filteredImages.length} photo{filteredImages.length > 1 ? 's' : ''}
        </div>
      </div>

      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <article
            key={image.id}
            className="gallery-card glass-card card-3d"
            onClick={() => openLightbox(index)}
          >
            <div className="gallery-image-wrapper">
              <img
                src={image.thumbnail}
                alt={image.alt}
                loading="lazy"
                className="gallery-image"
              />
              <div className="gallery-overlay glass-card-premium">
                <span className="gallery-zoom-icon">🔍</span>
                <h3 className="gallery-image-title">{image.alt}</h3>
                <p className="gallery-meta">
                  {image.year} • {image.location}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={filteredImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </section>
  );
}
