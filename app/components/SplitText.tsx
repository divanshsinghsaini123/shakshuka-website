'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

interface SplitTextElement extends HTMLElement {
  _rbsplitInstance?: GSAPSplitText | null;
}

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: { opacity: number; y: number };
  to?: { opacity: number; y: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  onLetterAnimationComplete?: () => void;
}

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}: SplitTextProps) => {
  const ref = useRef<SplitTextElement>(null);
  const animationCompletedRef = useRef(false);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  // Additional cleanup on unmount to ensure everything is cleaned up
  useEffect(() => {
    return () => {
      const el = ref.current;
      if (!el) return;

        // Kill any remaining tweens
        if (tweenRef.current) {
          try {
            tweenRef.current.kill();
          } catch (error) {
            console.warn('[SplitText] Error killing tween:', {
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
          tweenRef.current = null;
        }

        // Kill any remaining ScrollTriggers
        if (scrollTriggerRef.current) {
          try {
            scrollTriggerRef.current.kill();
          } catch (error) {
            console.warn('[SplitText] Error killing ScrollTrigger:', {
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
          scrollTriggerRef.current = null;
        }

        // Fallback cleanup: kill all ScrollTriggers for this element
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el || (st.vars && st.vars.trigger === el)) {
            try {
              st.kill();
            } catch (error) {
              console.warn('[SplitText] Error killing ScrollTrigger in fallback cleanup:', {
                error: error instanceof Error ? error.message : 'Unknown error'
              });
            }
          }
        });

        // Kill all GSAP animations on this element and its children
        try {
          gsap.killTweensOf(el);
          const splitElements = el.querySelectorAll('.split-char, .split-word, .split-line');
          if (splitElements.length > 0) {
            gsap.killTweensOf(splitElements);
          }
        } catch (error) {
          console.warn('[SplitText] Error killing GSAP tweens:', {
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }

        // Revert SplitText instance
        if (el._rbsplitInstance) {
          try {
            el._rbsplitInstance.revert();
          } catch (error) {
            console.warn('[SplitText] Error reverting SplitText instance:', {
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
          el._rbsplitInstance = null;
        }
    };
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (error) {
          console.warn('[SplitText] Error reverting existing SplitText instance:', {
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
        el._rbsplitInstance = null;
      }

      const startPct = (1 - (threshold ?? 0.1)) * 100;
      const marginValueStr: string = rootMargin ?? '-100px';
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(marginValueStr);
      const marginValue = marginMatch ? parseFloat(marginMatch[1] ?? '0') : 0;
      const marginUnit = marginMatch?.[2] ?? 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: Element[] | undefined;
      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;
        if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self: GSAPSplitText) => {
          assignTargets(self);
          if (!targets) return;
          
          // Clean up any existing tween and ScrollTrigger
          if (tweenRef.current) {
            tweenRef.current.kill();
            tweenRef.current = null;
          }
          if (scrollTriggerRef.current) {
            scrollTriggerRef.current.kill();
            scrollTriggerRef.current = null;
          }

          const tween = gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4,
                id: `split-text-${el.id || Date.now()}-${Math.random()}` // Unique ID for reliable cleanup
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );

          // Store references for cleanup
          tweenRef.current = tween;
          // tween.scrollTrigger is the ScrollTrigger instance when created
          scrollTriggerRef.current = (tween.scrollTrigger as ScrollTrigger) || null;

          return tween;
        }
      });

      el._rbsplitInstance = splitInstance;

      // Cleanup function - runs when component unmounts or dependencies change
      return () => {
        // Kill the tween first (this will also clean up its ScrollTrigger)
        if (tweenRef.current) {
          try {
            tweenRef.current.kill();
          } catch (error) {
            console.warn('[SplitText] Error killing tween in cleanup:', {
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
          tweenRef.current = null;
        }

        // Explicitly kill ScrollTrigger if it still exists
        if (scrollTriggerRef.current) {
          try {
            scrollTriggerRef.current.kill();
          } catch (error) {
            console.warn('[SplitText] Error killing ScrollTrigger in cleanup:', {
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
          scrollTriggerRef.current = null;
        }

        // Fallback: kill any ScrollTriggers associated with this element
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el || (st.vars && st.vars.trigger === el)) {
            try {
              st.kill();
            } catch (error) {
              console.warn('[SplitText] Error killing ScrollTrigger in forEach:', {
                error: error instanceof Error ? error.message : 'Unknown error'
              });
            }
          }
        });

        // Revert SplitText instance
        if (el._rbsplitInstance) {
          try {
            el._rbsplitInstance.revert();
          } catch (error) {
            console.warn('[SplitText] Error reverting SplitText instance in cleanup:', {
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
          el._rbsplitInstance = null;
        }

        // Clear any remaining GSAP animations on the element
        if (el) {
          try {
            gsap.killTweensOf(el);
            gsap.killTweensOf(el.querySelectorAll('.split-char, .split-word, .split-line'));
          } catch (error) {
            console.warn('[SplitText] Error killing GSAP tweens in cleanup:', {
              error: error instanceof Error ? error.message : 'Unknown error'
            });
          }
        }
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    // Map textAlign to Tailwind classes
    const textAlignClasses: Record<string, string> = {
      left: 'text-left',
      right: 'text-right',
      center: 'text-center',
      justify: 'text-justify'
    };
    
    const classes = `split-parent overflow-hidden inline-block whitespace-normal break-words will-change-[transform,opacity] ${textAlignClasses[textAlign] || 'text-center'} ${className}`;
    switch (tag) {
      case 'h1':
        return (
          <h1 ref={ref as React.RefObject<HTMLHeadingElement>} className={classes}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={classes}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={ref as React.RefObject<HTMLHeadingElement>} className={classes}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={ref as React.RefObject<HTMLHeadingElement>} className={classes}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={ref as React.RefObject<HTMLHeadingElement>} className={classes}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={ref as React.RefObject<HTMLHeadingElement>} className={classes}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={ref as React.RefObject<HTMLParagraphElement>} className={classes}>
            {text}
          </p>
        );
    }
  };
  return renderTag();
};

export default SplitText;

