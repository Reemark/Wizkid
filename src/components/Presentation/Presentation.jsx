import { useMemo, useState } from 'react';
import { slides } from '../../data/slides';
import useKeyboard from '../../hooks/useKeyboard';
import Counter from '../shared/Counter';
import Slide from './Slide';
import './Presentation.css';

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [revealedBySlide, setRevealedBySlide] = useState({});

  const total = slides.length;
  const progress = useMemo(() => ((current + 1) / total) * 100, [current, total]);

  const next = () => setCurrent((s) => Math.min(s + 1, total - 1));
  const prev = () => setCurrent((s) => Math.max(s - 1, 0));

  const advancePresentation = () => {
    const currentSlide = slides[current];
    const bulletCount = currentSlide.bullets ? currentSlide.bullets.length : 0;
    const revealedCount = revealedBySlide[current] ?? 0;

    if (bulletCount > 0 && revealedCount < bulletCount) {
      setRevealedBySlide((prevState) => ({
        ...prevState,
        [current]: revealedCount + 1,
      }));
      return;
    }

    next();
  };

  const onPresentationClick = (event) => {
    const blocked = event.target.closest('button, a, iframe, video, .controls, .hud');
    if (blocked) return;
    advancePresentation();
  };

  useKeyboard(advancePresentation, prev, true);

  return (
    <main className="presentation" aria-label="Wizkid presentation" onClick={onPresentationClick}>
      <div className="slides">
        {slides.map((slide, index) => (
          <Slide
            key={slide.id}
            slide={slide}
            isActive={index === current}
            revealedCount={revealedBySlide[index] ?? 0}
            Counter={Counter}
          />
        ))}
      </div>

      <div className="controls">
        <button type="button" className="nav-btn" onClick={prev} disabled={current === 0} aria-label="Slide précédente">
          &#10094;
        </button>
        <button type="button" className="nav-btn" onClick={next} disabled={current === total - 1} aria-label="Slide suivante">
          &#10095;
        </button>
      </div>

      <div className="hud">
        <div className="progress-wrap">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <div className="slide-counter">
          {current + 1} / {total}
        </div>
      </div>
    </main>
  );
}
