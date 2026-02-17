import { useCallback, useEffect, useRef, useState } from 'react';
import { slides } from './data/slides';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import AudioControl from './components/Presentation/AudioControl';
import Navigation from './components/Presentation/Navigation';
import ProgressBar from './components/Presentation/ProgressBar';
import SlideDots from './components/Presentation/SlideDots';
import Slide from './components/Presentation/Slide';
import SlideContent from './components/Presentation/SlideContent';

const TRANSITION_LOCK_MS = 680;

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [revealStep, setRevealStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));
  const lockRef = useRef(false);
  const revealStepRef = useRef(0);
  const maxRevealRef = useRef(0);
  const appRef = useRef(null);

  const goToNext = useCallback(() => {
    if (revealStepRef.current < maxRevealRef.current) {
      setRevealStep((previous) => {
        const nextStep = Math.min(previous + 1, maxRevealRef.current);
        revealStepRef.current = nextStep;
        return nextStep;
      });
      return;
    }

    if (lockRef.current) {
      return;
    }

    setActiveIndex((previous) => {
      if (previous >= slides.length - 1) {
        return previous;
      }

      lockRef.current = true;
      setDirection(1);
      window.setTimeout(() => {
        lockRef.current = false;
      }, TRANSITION_LOCK_MS);

      return previous + 1;
    });
  }, []);

  const goToPrevious = useCallback(() => {
    if (lockRef.current) {
      return;
    }

    setActiveIndex((previous) => {
      if (previous <= 0) {
        return previous;
      }

      lockRef.current = true;
      setDirection(-1);
      window.setTimeout(() => {
        lockRef.current = false;
      }, TRANSITION_LOCK_MS);

      return previous - 1;
    });
  }, []);

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

  useKeyboardNavigation({ onNext: goToNext, onPrev: goToPrevious });

  const progress = (activeIndex / (slides.length - 1)) * 100;
  const activeSlide = slides[activeIndex];
  const maxRevealSteps = activeSlide.revealSteps ?? 0;

  useEffect(() => {
    setRevealStep(0);
    revealStepRef.current = 0;
    maxRevealRef.current = maxRevealSteps;
  }, [activeIndex]);

  const handleReveal = useCallback(() => {
    setRevealStep((previous) => {
      if (previous >= maxRevealSteps) {
        return previous;
      }
      const nextStep = previous + 1;
      revealStepRef.current = nextStep;
      return nextStep;
    });
  }, [maxRevealSteps]);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await (appRef.current ?? document.documentElement).requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (_) {
      // Ignore browser-level fullscreen permission errors.
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    const onKeyDown = (event) => {
      if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        toggleFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [toggleFullscreen]);

  return (
    <main className="app-shell" ref={appRef}>
      <ProgressBar progress={progress} />
      <p className="slide-meta">{activeSlide.title}</p>

      <Slide slide={activeSlide} direction={direction} key={activeSlide.id} onReveal={handleReveal}>
        <SlideContent slide={activeSlide} isActive revealStep={revealStep} />
      </Slide>

      <Navigation
        currentIndex={activeIndex}
        totalSlides={slides.length}
        onNext={goToNext}
        onPrev={goToPrevious}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />

      {activeIndex === 0 ? (
        <SlideDots
          slides={slides}
          activeIndex={activeIndex}
          onSelect={goToIndex}
        />
      ) : null}

      <AudioControl activeIndex={activeIndex} />

      {maxRevealSteps > 0 && revealStep < maxRevealSteps ? (
        <p className="reveal-hint">Click to reveal ({revealStep}/{maxRevealSteps})</p>
      ) : null}
    </main>
  );
}
