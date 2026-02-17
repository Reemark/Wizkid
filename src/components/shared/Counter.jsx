import { useEffect, useState } from 'react';

export default function Counter({ target, suffix = '' }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    const duration = 1300;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.floor(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <>
      {value.toLocaleString()}
      {suffix}
    </>
  );
}
