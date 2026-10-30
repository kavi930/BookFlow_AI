import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Video } from 'lucide-react';

interface CinematicVideoPlayerProps {
  src?: string;
  poster: string;
  title: string;
  badge?: string;
  aspectRatio?: '16/9' | '9/16' | '4/3' | 'auto';
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  caption?: string;
  isPlaceholder?: boolean;
}

export const CinematicVideoPlayer: React.FC<CinematicVideoPlayerProps> = ({
  src,
  poster,
  title,
  badge = 'CINEMATIC VIDEO',
  aspectRatio = '16/9',
  className = '',
  autoPlay = true,
  loop = true,
  caption,
  isPlaceholder = false
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsPlaying(false);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setIsPlaying(false);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Autoplay trigger with browser compatibility and retry logic
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion) {
      // Browsers require muted for autoplay
      videoRef.current.muted = isMuted;
      videoRef.current.defaultMuted = true;
      if (autoPlay) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setHasError(false);
            })
            .catch(() => {
              // Attempt muted fallback
              if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.play()
                  .then(() => {
                    setIsPlaying(true);
                    setHasError(false);
                  })
                  .catch(() => {
                    setIsPlaying(false);
                  });
              }
            });
        }
      }
    }
  }, [src, autoPlay, prefersReducedMotion]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        setHasError(false);
        videoRef.current.muted = isMuted;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              if (videoRef.current) {
                videoRef.current.muted = true;
                setIsMuted(true);
                videoRef.current.play()
                  .then(() => setIsPlaying(true))
                  .catch(() => setIsPlaying(false));
              }
            });
        }
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
    } else {
      setIsMuted(!isMuted);
    }
  };

  const handleRestart = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const aspectClass =
    aspectRatio === '16/9'
      ? 'aspect-video'
      : aspectRatio === '9/16'
      ? 'aspect-[9/16]'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : '';

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-900 shadow-sm group ${aspectClass} ${className}`}
    >
      {/* Video Element or Poster Fallback */}
      {src && !prefersReducedMotion ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          autoPlay={autoPlay}
          loop={loop}
          muted={isMuted}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setHasError(true)}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
          aria-label={title}
        />
      ) : (
        <div className="relative w-full h-full overflow-hidden" onClick={togglePlay}>
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Top Scrim Gradient & Badge */}
      <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/60 via-black/20 to-transparent flex items-center justify-between z-10 pointer-events-none">
        <span className="px-2 py-0.5 rounded bg-black/50 backdrop-blur-md text-[10px] font-mono text-white/90 border border-white/10 uppercase tracking-wider">
          {badge}
        </span>
        <span className="text-[11px] font-medium text-white/90 drop-shadow-xs line-clamp-1 max-w-[200px]">
          {title}
        </span>
      </div>

      {/* Centered Frosted Play Button when Paused */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center cursor-pointer z-20"
        >
          <div className="w-14 h-14 rounded-full bg-[#1E3A2F]/90 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Bottom Controls Scrim */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-white z-10">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="p-1 rounded text-white hover:text-[#81C784] transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          </button>

          {!hasError && src && (
            <button
              type="button"
              onClick={handleRestart}
              className="p-1 rounded text-white hover:text-[#81C784] transition-colors cursor-pointer"
              aria-label="Restart video"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {caption && (
            <span className="text-[11px] text-[#CCDCD0] hidden sm:inline truncate max-w-xs drop-shadow-xs">
              {caption}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!hasError && src && (
            <button
              type="button"
              onClick={toggleMute}
              className="p-1 rounded text-white hover:text-[#81C784] transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}

          {isPlaceholder && (
            <span className="text-[9px] font-mono text-[#EBF1EC] bg-white/20 px-1.5 py-0.5 rounded">
              VISUAL ASSET
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
