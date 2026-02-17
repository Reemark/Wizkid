import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { slides } from './data/slides';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import AudioControl from './components/Presentation/AudioControl';
import Navigation from './components/Presentation/Navigation';
import ProgressBar from './components/Presentation/ProgressBar';
import SlideDots from './components/Presentation/SlideDots';
import Slide from './components/Presentation/Slide';
import SlideContent from './components/Presentation/SlideContent';

const TRANSITION_LOCK_MS = 680;
const SYNC_CHANNEL = 'wizkid_presentation_sync_v1';
const NOTES_VERSION_KEY = 'wizkid_notes_version';
const NOTES_VERSION = '3';

function getIsPresenterWindow() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('presenter') === '1';
  } catch (_) {
    return false;
  }
}

export default function App() {
  const isPresenterWindow = useMemo(() => getIsPresenterWindow(), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [revealStep, setRevealStep] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));
  const [showPresenter, setShowPresenter] = useState(isPresenterWindow);
  const [focusMode, setFocusMode] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [backgroundVideoMuted, setBackgroundVideoMuted] = useState(true);
  const [remoteState, setRemoteState] = useState({
    activeIndex: 0,
    direction: 1,
    revealStep: 0,
    elapsedSeconds: 0,
  });
  const [notesBySlide, setNotesBySlide] = useState(() => {
    try {
      const notesVersion = window.localStorage.getItem(NOTES_VERSION_KEY);

      if (notesVersion !== NOTES_VERSION) {
        window.localStorage.setItem(NOTES_VERSION_KEY, NOTES_VERSION);
        window.localStorage.removeItem('wizkid_private_notes');
        return {};
      }

      const raw = window.localStorage.getItem('wizkid_private_notes');
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  });

  const lockRef = useRef(false);
  const revealStepRef = useRef(0);
  const maxRevealRef = useRef(0);
  const appRef = useRef(null);
  const preloadedMediaRef = useRef(new Set());
  const syncChannelRef = useRef(null);

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

  const postSyncMessage = useCallback((payload) => {
    if (!syncChannelRef.current) {
      return;
    }

    syncChannelRef.current.postMessage(payload);
  }, []);

  const sendPresenterCommand = useCallback((type, payload = {}) => {
    postSyncMessage({ type, payload });
  }, [postSyncMessage]);

  const onNextAction = isPresenterWindow ? () => sendPresenterCommand('COMMAND_NEXT') : goToNext;
  const onPrevAction = isPresenterWindow ? () => sendPresenterCommand('COMMAND_PREV') : goToPrevious;

  useKeyboardNavigation({ onNext: onNextAction, onPrev: onPrevAction });

  const displayIndex = isPresenterWindow ? remoteState.activeIndex : activeIndex;
  const displayDirection = isPresenterWindow ? remoteState.direction : direction;
  const displayRevealStep = isPresenterWindow ? remoteState.revealStep : revealStep;
  const displayElapsedSeconds = isPresenterWindow ? remoteState.elapsedSeconds : elapsedSeconds;
  const activeSlide = slides[displayIndex] ?? slides[0];
  const isBackgroundYoutubeSlide = Boolean(activeSlide.backgroundYoutubeId);
  const maxRevealSteps = activeSlide.revealSteps ?? 0;
  const progress = (displayIndex / (slides.length - 1)) * 100;

  useEffect(() => {
    if (isPresenterWindow) {
      return;
    }

    setRevealStep(0);
    revealStepRef.current = 0;
    maxRevealRef.current = maxRevealSteps;
  }, [activeIndex, isPresenterWindow, maxRevealSteps]);

  useEffect(() => {
    const channel = new BroadcastChannel(SYNC_CHANNEL);
    syncChannelRef.current = channel;

    channel.onmessage = (event) => {
      const { type, payload } = event.data ?? {};

      if (isPresenterWindow) {
        if (type === 'STATE_UPDATE') {
          setRemoteState((previous) => ({ ...previous, ...payload }));
        }
        return;
      }

      if (type === 'COMMAND_NEXT') {
        goToNext();
      }

      if (type === 'COMMAND_PREV') {
        goToPrevious();
      }

      if (type === 'COMMAND_GOTO' && typeof payload?.index === 'number') {
        goToIndex(payload.index);
      }
    };

    return () => {
      channel.close();
      syncChannelRef.current = null;
    };
  }, [goToIndex, goToNext, goToPrevious, isPresenterWindow]);

  useEffect(() => {
    if (isPresenterWindow) {
      return;
    }

    postSyncMessage({
      type: 'STATE_UPDATE',
      payload: {
        activeIndex,
        direction,
        revealStep,
        elapsedSeconds,
      },
    });
  }, [activeIndex, direction, elapsedSeconds, isPresenterWindow, postSyncMessage, revealStep]);

  const handleReveal = useCallback(() => {
    if (isPresenterWindow) {
      sendPresenterCommand('COMMAND_NEXT');
      return;
    }

    setRevealStep((previous) => {
      if (previous >= maxRevealSteps) {
        return previous;
      }
      const nextStep = previous + 1;
      revealStepRef.current = nextStep;
      return nextStep;
    });
  }, [isPresenterWindow, maxRevealSteps, sendPresenterCommand]);

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

  const openPresenterWindow = useCallback(() => {
    if (isPresenterWindow) {
      return;
    }

    const presenterUrl = new URL(window.location.href);
    presenterUrl.searchParams.set('presenter', '1');
    window.open(presenterUrl.toString(), 'wizkidPresenterWindow', 'popup=yes,width=1200,height=820');
  }, [isPresenterWindow]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    const onKeyDown = (event) => {
      if (event.key.toLowerCase() === 'f') {
        event.preventDefault();
        toggleFullscreen();
      }

      if (event.key.toLowerCase() === 'n') {
        if (!event.shiftKey) return;
        event.preventDefault();
        setShowPresenter((previous) => !previous);
      }

      if (event.key.toLowerCase() === 'h') {
        event.preventDefault();
        setFocusMode((previous) => !previous);
      }
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [toggleFullscreen]);

  useEffect(() => {
    if (isPresenterWindow) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPresenterWindow]);

  useEffect(() => {
    if (isPresenterWindow) {
      return;
    }

    const preloadMedia = (src) => {
      if (!src || preloadedMediaRef.current.has(src)) {
        return;
      }

      preloadedMediaRef.current.add(src);
      const isVideo = /\.mp4($|\?)/i.test(src);

      if (isVideo) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.src = src;
      } else {
        const image = new Image();
        image.src = src;
      }
    };

    [displayIndex, displayIndex + 1, displayIndex + 2].forEach((index) => {
      const slide = slides[index];
      if (!slide) return;

      preloadMedia(slide.backgroundImage);
      preloadMedia(slide.backgroundVideo);
      preloadMedia(slide.videoFile);
      preloadMedia(slide.secondVideoFile);
    });
  }, [displayIndex, isPresenterWindow]);

  useEffect(() => {
    try {
      window.localStorage.setItem('wizkid_private_notes', JSON.stringify(notesBySlide));
    } catch (_) {
      // Ignore storage write errors.
    }
  }, [notesBySlide]);

  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  const currentNote = notesBySlide[activeSlide.id] ?? activeSlide.notes ?? '';

  const updateCurrentNote = (value) => {
    setNotesBySlide((previous) => ({
      ...previous,
      [activeSlide.id]: value,
    }));
  };

  const shouldShowPresenterPanel = isPresenterWindow || (!focusMode && showPresenter);

  return (
    <main className={`app-shell ${focusMode ? 'is-focus-mode' : ''} ${isPresenterWindow ? 'is-presenter-window' : ''}`} ref={appRef}>
      {!focusMode ? <ProgressBar progress={progress} /> : null}
      {!focusMode ? <p className="slide-meta">{activeSlide.title}</p> : null}

      <Slide
        slide={activeSlide}
        direction={displayDirection}
        key={activeSlide.id}
        onReveal={isPresenterWindow ? undefined : handleReveal}
        backgroundVideoMuted={backgroundVideoMuted}
        disableMediaPlayback={isPresenterWindow}
      >
        <SlideContent slide={activeSlide} isActive revealStep={displayRevealStep} />
      </Slide>

      <Navigation
        currentIndex={displayIndex}
        totalSlides={slides.length}
        onNext={onNextAction}
        onPrev={onPrevAction}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        onOpenPresenter={openPresenterWindow}
        isPresenterWindow={isPresenterWindow}
      />

      {!focusMode && !isPresenterWindow && displayIndex === 0 ? (
        <SlideDots
          slides={slides}
          activeIndex={displayIndex}
          onSelect={goToIndex}
        />
      ) : null}

      {!focusMode && !isPresenterWindow ? (
        <AudioControl
          activeIndex={displayIndex}
          isBackgroundYoutubeSlide={isBackgroundYoutubeSlide}
          backgroundVideoMuted={backgroundVideoMuted}
          onToggleBackgroundVideoMuted={() => setBackgroundVideoMuted((previous) => !previous)}
        />
      ) : null}

      {!focusMode && !isPresenterWindow && maxRevealSteps > 0 && displayRevealStep < maxRevealSteps ? (
        <p className="reveal-hint">Click to reveal ({displayRevealStep}/{maxRevealSteps})</p>
      ) : null}

      {shouldShowPresenterPanel ? (
        <aside className="presenter-panel" aria-label="Presenter panel">
          <p className="presenter-kicker">Presenter Mode</p>
          <p className="presenter-time">{formatTime(displayElapsedSeconds)}</p>
          <p className="presenter-slide">Slide {displayIndex + 1}/{slides.length} · Target {activeSlide.targetTime ?? '--:--'}</p>
          <p className="presenter-title">{activeSlide.title}</p>
          <label className="presenter-note-label" htmlFor="private-slide-note">Notes privees (non visibles du public)</label>
          <textarea
            id="private-slide-note"
            className="presenter-note-input"
            value={currentNote}
            onChange={(event) => updateCurrentNote(event.target.value)}
            placeholder="Ecris ici tes notes d'oral pour cette slide..."
          />
          <div className="presenter-shortcuts">
            <span>Shift+N: notes</span>
            <span>H: clean mode</span>
            <span>F: fullscreen</span>
          </div>
        </aside>
      ) : null}
    </main>
  );
}

