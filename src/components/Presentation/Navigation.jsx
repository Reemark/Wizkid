export default function Navigation({
  currentIndex,
  totalSlides,
  onNext,
  onPrev,
  onToggleFullscreen,
  isFullscreen,
  onOpenPresenter,
  isPresenterWindow,
}) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;
  const iconStyle = { width: '14px', height: '14px', display: 'block' };

  return (
    <div className="deck-navigation" aria-label="Slide navigation controls">
      <button type="button" onClick={onPrev} disabled={isFirst} className="nav-button" aria-label="Previous slide">
        <svg viewBox="0 0 24 24" aria-hidden="true" style={iconStyle}>
          <path d="M15.5 5.5 9 12l6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <p className="nav-index">
        Slide {currentIndex + 1} / {totalSlides}
      </p>

      <button
        type="button"
        onClick={onToggleFullscreen}
        className="nav-button nav-button-screen"
        aria-label={isFullscreen ? 'Exit presentation mode' : 'Enter presentation mode'}
        title="Presentation mode (F)"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" style={iconStyle}>
          {isFullscreen ? (
            <path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M9 3H3v6M15 3h6v6M3 15v6h6M21 15v6h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </button>

      {!isPresenterWindow ? (
        <button
          type="button"
          onClick={onOpenPresenter}
          className="nav-button nav-button-presenter"
          aria-label="Open presenter window"
          title="Open presenter window"
        >
          P
        </button>
      ) : null}

      <button type="button" onClick={onNext} disabled={isLast} className="nav-button nav-button-next" aria-label="Next slide">
        <svg viewBox="0 0 24 24" aria-hidden="true" style={iconStyle}>
          <path d="M8.5 5.5 15 12l-6.5 6.5" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
