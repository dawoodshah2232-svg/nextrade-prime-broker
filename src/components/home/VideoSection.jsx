// "See trading in action" — two video cards, verbatim port of the old
// index.html #video section, with the play-on-click behaviour from
// script.js (~lines 404+): the play button starts the video, the frame
// gets .playing while it plays (CSS hides the button), and "ended" fires
// without "pause" when a video finishes naturally. On error the poster
// stays visible and a "Video unavailable — tap to retry" note appears
// under the card; tapping it reloads and retries.
import { useRef, useState } from 'react';
import { asset } from '../../lib/asset';

function VideoCard({ video, poster, label, title, text }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const retry = () => {
    setError(false);
    const v = videoRef.current;
    if (v) {
      v.load();
      v.play().catch(() => {});
    }
  };

  return (
    <div className="video-card reveal">
      <div className={'video-frame' + (playing ? ' playing' : '')}>
        <video
          ref={videoRef}
          preload="metadata"
          playsInline
          controls
          poster={poster}
          src={asset(video)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          onError={() => {
            setPlaying(false);
            setError(true);
          }}
        ></video>
        <button
          className="video-play"
          type="button"
          aria-label={'Play video: ' + label}
          onClick={() => {
            if (videoRef.current) videoRef.current.play();
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </button>
      </div>
      <div className="video-meta">
        <h3>{title}</h3>
        <p>{text}</p>
        {error && (
          <p className="video-error" onClick={retry}>
            Video unavailable — tap to retry
          </p>
        )}
      </div>
    </div>
  );
}

export default function VideoSection() {
  return (
    <section className="section" id="video">
      <div className="container">
        <h2 className="reveal">See trading in action</h2>
        <p className="sub reveal">
          Real market footage — no actors, no scripts. This is what a trading day looks like.
        </p>
        <div className="video-grid" style={{ marginTop: 32 }}>
          <VideoCard
            video="trading-video.mp4"
            poster="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
            label="A trader's desk"
            title="A trader's desk"
            text="Charts, orders and decisions — a trader at work."
          />
          <VideoCard
            video="hero-video.mp4"
            poster="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80"
            label="Charts in focus"
            title="Charts in focus"
            text="Reading the market, candle by candle, before the next move."
          />
        </div>
      </div>
    </section>
  );
}
