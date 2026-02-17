export default function SlideDots({ slides, activeIndex, onSelect }) {
  return (
    <aside className="slide-dots" aria-label="Quick slide navigation">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={slide.id}
            type="button"
            className={`slide-dot ${isActive ? 'is-active' : ''}`}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            aria-current={isActive ? 'true' : 'false'}
            title={`${index + 1}. ${slide.title}`}
            onClick={() => onSelect(index)}
          >
            <span className="slide-dot-index">{index + 1}</span>
            <span className="slide-dot-title">{slide.title}</span>
          </button>
        );
      })}
    </aside>
  );
}
