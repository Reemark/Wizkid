import { useState } from 'react';
import { motion } from 'framer-motion';

const INTERACTIVE_SELECTOR = 'button, a, input, textarea, select, iframe, video';

const variants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
    scale: 1.02,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    scale: 0.99,
  }),
};

export default function Slide({ slide, direction, children, onReveal }) {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const x = ((event.clientX / window.innerWidth) - 0.5) * -20;
    const y = ((event.clientY / window.innerHeight) - 0.5) * -12;
    setParallax({ x, y });
  };

  const onSlideClick = (event) => {
    if (event.target.closest(INTERACTIVE_SELECTOR)) {
      return;
    }

    onReveal();
  };

  const mediaStyle = {
    transform: `scale(1.06) translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
  };

  return (
    <motion.section
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 grid place-items-center px-4 pb-24 pt-20 md:px-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setParallax({ x: 0, y: 0 })}
      onClick={onSlideClick}
      data-slide-key={slide.key}
      aria-label={`Slide ${slide.id}: ${slide.title}`}
    >
      <div className="absolute inset-0">
        {slide.backgroundVideo || slide.isVideoBackground ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover brightness-[0.45] saturate-75 transition-transform duration-300"
            style={mediaStyle}
          >
            <source src={slide.backgroundVideo || slide.backgroundImage} type="video/mp4" />
          </video>
        ) : (
          <img
            src={slide.backgroundImage}
            alt="Wizkid background"
            className="h-full w-full object-cover brightness-[0.45] saturate-75 transition-transform duration-300"
            style={mediaStyle}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-slate-950/60 to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(47,176,127,0.15),transparent_35%),radial-gradient(circle_at_20%_15%,rgba(216,181,111,0.2),transparent_35%)]" />
      </div>

      <div className="mobile-scroll relative z-10 w-full max-w-6xl">{children}</div>
    </motion.section>
  );
}
