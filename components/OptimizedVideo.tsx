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
}

export default function OptimizedVideo({
  src,
  className = '',
  poster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
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
        video.play().catch(() => {
          // Ignore autoplay errors (browser policy)
        });
      };
      
      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener('loadeddata', playVideo, { once: true });
      }
    }
  }, [shouldLoad, isIntersecting, autoPlay]);

  // Generate poster path if not provided
  const posterPath = poster || `/videos/${src}_poster.jpg`;

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
        >
          {/* WebM format first (smaller, better compression) */}
          <source src={`/videos/${src}.webm`} type="video/webm" />
          {/* MP4 as fallback for older browsers */}
          <source src={`/videos/${src}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Show poster or placeholder while not loaded
        <div
          className={`${className} bg-gray-200 flex items-center justify-center overflow-hidden`}
        >
          {posterPath && (
            <img
              src={posterPath}
              alt="Video preview"
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
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

