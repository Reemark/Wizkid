import { useEffect, useRef, useState } from 'react';
import { assetUrl } from '../../utils/assetUrl';

const TRACKS = [assetUrl('wizkid-opening.mp4'), assetUrl('wizkid-performance.mp4'), assetUrl('wizkid-live.mp4')];

function trackForSlide(index) {
  if (index <= 3) return TRACKS[0];
  if (index <= 7) return TRACKS[1];
  return TRACKS[2];
}

export default function AudioControl({ activeIndex }) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const targetTrack = trackForSlide(activeIndex);
    if (audio.dataset.track !== targetTrack) {
      audio.src = targetTrack;
      audio.dataset.track = targetTrack;
      audio.load();
    }

    if (activeIndex === 0) {
      audio.pause();
      return;
    }

    if (!isMuted) {
      audio.play().catch(() => {});
    }
  }, [activeIndex, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.2;
    audio.muted = isMuted;

    if (!isMuted && activeIndex > 0) {
      audio.play().catch(() => {});
    }
  }, [isMuted, activeIndex]);

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-5">
      <audio ref={audioRef} loop preload="metadata" />
      <button
        type="button"
        onClick={() => setIsMuted((prev) => !prev)}
        className="rounded-full border border-emerald-300/50 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-emerald-100 backdrop-blur-lg transition hover:bg-emerald-500/20"
        aria-label={isMuted ? 'Activer la musique' : 'Couper la musique'}
      >
        {isMuted ? 'Music Off' : 'Music On'}
      </button>
    </div>
  );
}
