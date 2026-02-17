import { useEffect, useState } from 'react';

export default function AnimatedCounter({ target, suffix = '', isActive }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setValue(0);
      return;
    }

    let startValue = 0;
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(startValue));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, target]);

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
