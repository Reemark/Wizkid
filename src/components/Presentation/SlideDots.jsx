export default function SlideDots({ slides, activeIndex, onSelect }) {
  return (
    <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex" aria-label="Quick slide navigation">
      {slides.map((slide, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={slide.id}
            type="button"
            onClick={() => onSelect(index)}
            title={`${index + 1}. ${slide.title}`}
            className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
              isActive
                ? 'border-amber-300/80 bg-amber-300/20 text-amber-100'
                : 'border-white/20 bg-slate-950/55 text-slate-300 hover:border-emerald-300/60 hover:text-emerald-200'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive ? 'true' : 'false'}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[0.65rem] font-semibold">
              {index + 1}
            </span>
            <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-52 group-hover:opacity-100">
              {slide.title}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
