import { useEffect, useRef, useState } from 'react';

const BASE_VOLUME = 0.22;

function getTrackForSlide(activeIndex) {
  if (activeIndex <= 4) {
    return '/wizkid-opening.mp4';
  }

  if (activeIndex <= 8) {
    return '/wizkid-performance.mp4';
  }

  return '/wizkid-live.mp4';
}

export default function AudioControl({ activeIndex }) {
  const audioRef = useRef(null);
  const timersRef = useRef([]);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timerId) => window.clearInterval(timerId));
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.muted = isMuted;
    audio.volume = BASE_VOLUME;
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    timersRef.current.forEach((timerId) => window.clearInterval(timerId));
    timersRef.current = [];

    const targetTrack = getTrackForSlide(activeIndex);
    const currentTrack = audio.dataset.track;

    const swapTrack = () => {
      audio.src = targetTrack;
      audio.dataset.track = targetTrack;
      audio.load();
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    if (!currentTrack) {
      swapTrack();
      return;
    }

    if (currentTrack === targetTrack) {
      return;
    }

    if (isMuted) {
      swapTrack();
      return;
    }

    let volumeDown = audio.volume;
    const fadeOutTimer = window.setInterval(() => {
      volumeDown = Math.max(0, volumeDown - 0.035);
      audio.volume = volumeDown;

      if (volumeDown <= 0) {
        window.clearInterval(fadeOutTimer);
        swapTrack();

        let volumeUp = 0;
        const fadeInTimer = window.setInterval(() => {
          volumeUp = Math.min(BASE_VOLUME, volumeUp + 0.035);
          audio.volume = volumeUp;

          if (volumeUp >= BASE_VOLUME) {
            window.clearInterval(fadeInTimer);
          }
        }, 35);

        timersRef.current.push(fadeInTimer);
      }
    }, 35);

    timersRef.current.push(fadeOutTimer);
  }, [activeIndex, isMuted]);

  const buttonLabel = isMuted ? 'Unmute Music' : 'Mute Music';

  return (
    <div className="audio-control">
      <audio ref={audioRef} loop autoPlay preload="metadata" />

      <button
        type="button"
        onClick={() => setIsMuted((prev) => !prev)}
        className="audio-button"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {buttonLabel}
      </button>
    </div>
  );
}
