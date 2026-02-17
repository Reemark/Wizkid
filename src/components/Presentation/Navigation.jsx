export default function Navigation({ currentIndex, totalSlides, onNext, onPrev }) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-1rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-full border border-white/20 bg-slate-950/55 p-1.5 backdrop-blur-xl md:bottom-5">
      <button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-amber-300/60 hover:text-amber-200 disabled:cursor-not-allowed disabled:opacity-35"
        aria-label="Previous slide"
      >
        ? Prev
      </button>

      <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-300">
        {currentIndex + 1} / {totalSlides}
      </p>

      <button
        type="button"
        onClick={onNext}
        disabled={isLast}
        className="rounded-full border border-emerald-400/50 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-35"
        aria-label="Next slide"
      >
        Next ?
      </button>
    </div>
  );
}
