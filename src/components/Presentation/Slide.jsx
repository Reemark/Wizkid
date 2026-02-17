import { useMemo, useState } from 'react';

function slideClassByDirection(direction) {
  if (direction > 0) {
    return 'slide-enter-forward';
  }

  if (direction < 0) {
    return 'slide-enter-backward';
  }

  return 'slide-enter-forward';
}

const INTERACTIVE_SELECTOR = 'button, a, input, textarea, select, iframe, video';

export default function Slide({ slide, direction, children, onReveal }) {
  const animationClass = useMemo(() => slideClassByDirection(direction), [direction]);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const x = ((event.clientX / window.innerWidth) - 0.5) * -14;
    const y = ((event.clientY / window.innerHeight) - 0.5) * -10;
    setParallax({ x, y });
  };

  const handleClick = (event) => {
    if (event.target.closest(INTERACTIVE_SELECTOR)) {
      return;
    }

    if (onReveal) {
      onReveal();
    }
  };

  return (
    <section
      className={`slide ${animationClass}`}
      aria-label={`Slide ${slide.id}: ${slide.title}`}
      data-slide-key={slide.key}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setParallax({ x: 0, y: 0 })}
      onClick={handleClick}
    >
      <div className="slide-background" aria-hidden="true">
        {slide.backgroundVideo || slide.isVideoBackground ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="slide-media"
            style={{ transform: `scale(1.08) translate3d(${parallax.x}px, ${parallax.y}px, 0)` }}
          >
            <source src={slide.backgroundVideo || slide.backgroundImage} type="video/mp4" />
          </video>
        ) : (
          <img
            src={slide.backgroundImage}
            alt="Wizkid"
            className="slide-media"
            style={{ transform: `scale(1.08) translate3d(${parallax.x}px, ${parallax.y}px, 0)` }}
          />
        )}

        <div className="slide-overlay" />
        <div className="slide-gradient-glow" />
      </div>

      <div className="slide-content">{children}</div>
    </section>
  );
}
