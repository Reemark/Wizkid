import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { slides } from './data/slides';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import Slide from './components/Presentation/Slide';
import SlideContent from './components/Presentation/SlideContent';
import Navigation from './components/Presentation/Navigation';
import ProgressBar from './components/Presentation/ProgressBar';
import SlideDots from './components/Presentation/SlideDots';
import AudioControl from './components/Presentation/AudioControl';

const TRANSITION_LOCK_MS = 700;

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [revealStep, setRevealStep] = useState(0);
  const lockRef = useRef(false);

  const activeSlide = slides[activeIndex];
  const maxRevealSteps = activeSlide.revealSteps ?? 0;
  const progress = useMemo(() => ((activeIndex + 1) / slides.length) * 100, [activeIndex]);

  useEffect(() => {
    setRevealStep(0);
  }, [activeIndex]);

  const advanceRevealOrSlide = useCallback(() => {
    if (revealStep < maxRevealSteps) {
      setRevealStep((prev) => Math.min(prev + 1, maxRevealSteps));
      return;
    }

    if (lockRef.current || activeIndex >= slides.length - 1) {
      return;
    }

    lockRef.current = true;
    setDirection(1);
    setActiveIndex((prev) => prev + 1);
    window.setTimeout(() => {
      lockRef.current = false;
    }, TRANSITION_LOCK_MS);
  }, [activeIndex, maxRevealSteps, revealStep]);

  const goPrev = useCallback(() => {
    if (lockRef.current || activeIndex <= 0) {
      return;
    }

    lockRef.current = true;
    setDirection(-1);
    setActiveIndex((prev) => prev - 1);
    window.setTimeout(() => {
      lockRef.current = false;
    }, TRANSITION_LOCK_MS);
  }, [activeIndex]);

  const goToIndex = useCallback((targetIndex) => {
    if (lockRef.current || targetIndex === activeIndex || targetIndex < 0 || targetIndex >= slides.length) {
      return;
    }

    lockRef.current = true;
    setDirection(targetIndex > activeIndex ? 1 : -1);
    setActiveIndex(targetIndex);
    window.setTimeout(() => {
      lockRef.current = false;
    }, TRANSITION_LOCK_MS);
  }, [activeIndex]);

  useKeyboardNavigation({ onNext: advanceRevealOrSlide, onPrev: goPrev });

  return (
    <main className="keynote-shell relative h-full w-full overflow-hidden text-slate-100">
      <ProgressBar progress={progress} />

      <div className="pointer-events-none fixed left-4 top-4 z-40 rounded-full border border-white/20 bg-black/45 px-3 py-1 text-[0.64rem] uppercase tracking-[0.22em] text-slate-300">
        {activeSlide.title}
      </div>

      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <Slide
          key={activeSlide.id}
          slide={activeSlide}
          direction={direction}
          onReveal={advanceRevealOrSlide}
        >
          <SlideContent slide={activeSlide} revealStep={revealStep} isActive />
        </Slide>
      </AnimatePresence>

      <Navigation
        currentIndex={activeIndex}
        totalSlides={slides.length}
        onNext={advanceRevealOrSlide}
        onPrev={goPrev}
      />

      <SlideDots
        slides={slides}
        activeIndex={activeIndex}
        onSelect={goToIndex}
      />

      <AudioControl activeIndex={activeIndex} />

      {revealStep < maxRevealSteps && (
        <p className="pointer-events-none fixed bottom-14 left-4 z-40 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-amber-100/90 md:bottom-5">
          Cliquez pour révéler {revealStep}/{maxRevealSteps}
        </p>
      )}
    </main>
  );
}
