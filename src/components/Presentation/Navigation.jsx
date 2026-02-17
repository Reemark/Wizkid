export default function Navigation({ currentIndex, totalSlides, onNext, onPrev }) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  return (
    <div className="deck-navigation" aria-label="Slide navigation controls">
      <button type="button" onClick={onPrev} disabled={isFirst} className="nav-button" aria-label="Previous slide">
        <span aria-hidden="true">←</span>
      </button>

      <p className="nav-index">
        Slide {currentIndex + 1} / {totalSlides}
      </p>

      <button type="button" onClick={onNext} disabled={isLast} className="nav-button nav-button-next" aria-label="Next slide">
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
