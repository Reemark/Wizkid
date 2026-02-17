import { useEffect } from 'react';

/**
 * Custom hook for handling keyboard navigation
 * @param {Function} onNext - Callback when moving forward
 * @param {Function} onPrev - Callback when moving backward
 * @param {boolean} enabled - Whether keyboard handling is enabled
 */
export default function useKeyboard(onNext, onPrev, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event) => {
      const key = event.key;

      // Forward navigation keys
      if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(key)) {
        event.preventDefault();
        onNext();
      }
      // Backward navigation keys
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(key)) {
        event.preventDefault();
        onPrev();
      }
    };

    const handleWheel = (event) => event.preventDefault();

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [onNext, onPrev, enabled]);
}
