import './IntroVideo.css';

export default function IntroVideo({ onContinue }) {
  return (
    <main className="intro-video-screen">
      <div className="video-card">
        <video
          className="intro-video-full"
          src="/WhatsApp%20Video%202026-02-16%20at%2011.40.28.mp4"
          controls
          autoPlay
          muted
          playsInline
        />
      </div>

      <div className="intro-video-actions">
        <button type="button" className="primary-btn" onClick={onContinue}>
          Go to Presentation
        </button>
      </div>
    </main>
  );
}
