import { useEffect } from 'react';

/**
 * Custom hook to lock/unlock body scroll
 * @param {boolean} locked - Whether scroll should be locked
 */
export default function useScrollLock(locked = false) {
  useEffect(() => {
    if (locked) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [locked]);
}
