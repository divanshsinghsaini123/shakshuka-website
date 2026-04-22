'use client';

import { useState, useRef, useEffect } from 'react';

interface OptimizedVideoProps {
  src: string; // Base name without extension (e.g., "Task_final")
  className?: string;
  poster?: string; // Optional poster image
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  "aria-label"?: string;
}

export default function OptimizedVideo({
  src,
  className = '',
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  "aria-label": ariaLabel,
}: OptimizedVideoProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            // Load immediately when visible (no delay)
            setShouldLoad(true);
            // Disconnect observer once we start loading
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '300px', // Start loading when 300px away from viewport (earlier loading)
        threshold: 0.01, // Even lower threshold for faster triggering
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Auto-play when video is loaded
  useEffect(() => {
    if (shouldLoad && videoRef.current && autoPlay && isIntersecting) {
      const video = videoRef.current;
      const playVideo = () => {
        video.play().catch((error) => {
          // Autoplay errors are expected due to browser policies (e.g., user hasn't interacted)
          // Only log if it's not a NotAllowedError (which is the common autoplay policy error)
          if (error instanceof Error && error.name !== 'NotAllowedError') {
            console.warn('[OptimizedVideo] Video play error (non-autoplay):', {
              src,
              error: error.message,
              name: error.name
            });
          }
        });
      };
      
      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener('loadeddata', playVideo, { once: true });
      }
    }
  }, [shouldLoad, isIntersecting, autoPlay, src]);

  // Generate poster path if not provided
  // Support both the standard _poster.jpg and the new .png images directly
  const [posterPath, setPosterPath] = useState(poster || `/videos/${src}_poster.jpg`);

  useEffect(() => {
    if (!poster) {
      // If the default poster fails, try the .png version (useful for static image features)
      const img = new Image();
      img.src = posterPath;
      img.onerror = () => {
        if (posterPath.endsWith('_poster.jpg')) {
          setPosterPath(`/videos/${src}.png`);
        }
      };
    }
  }, [src, poster, posterPath]);

  return (
    <div ref={containerRef} className="relative">
      {shouldLoad ? (
        <video
          ref={videoRef}
          className={className}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload="metadata"
          poster={posterPath}
          aria-label={ariaLabel || `Video demonstration: ${src}`}
          onError={(e) => {
            const video = e.currentTarget;
            const error = video.error;
            if (error) {
              console.error('[OptimizedVideo] Video loading error:', {
                src,
                errorCode: error.code,
                errorMessage: error.message,
                code: {
                  1: 'MEDIA_ERR_ABORTED',
                  2: 'MEDIA_ERR_NETWORK',
                  3: 'MEDIA_ERR_DECODE',
                  4: 'MEDIA_ERR_SRC_NOT_SUPPORTED'
                }[error.code] || 'UNKNOWN'
              });
            }
          }}
        >
          {/* WebM format first (smaller, better compression) */}
          <source src={`/videos/${src}.webm`} type="video/webm" />
          {/* MP4 as fallback for older browsers */}
          <source src={`/videos/${src}.mp4`} type="video/mp4" />
          <p>Your browser does not support the video tag. Please update your browser to view this content.</p>
        </video>
      ) : (
        // Show poster or placeholder while not loaded
        <div
          className={`${className} bg-gray-200 flex items-center justify-center overflow-hidden`}
          aria-label={ariaLabel || `Video preview: ${src}`}
          role="img"
        >
          {posterPath && (
            <img
              src={posterPath}
              alt={ariaLabel ? `${ariaLabel} - Preview` : `Video preview: ${src}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                console.warn('[OptimizedVideo] Poster image failed to load:', {
                  src,
                  posterPath
                });
                // Hide image if poster doesn't exist yet
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

