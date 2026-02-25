import { useEffect, useRef, useContext } from 'react';
import { ParticleSystem, ParticleSystemOptions } from './ParticleSystem';
import { ThemeContext } from '../theme/ThemeEngine';

type HeroParticlesProps = {
  options?: ParticleSystemOptions;
  className?: string;
};

/**
 * @description Canvas-based particle system for starry constellation effect.
 * Creates an animated background with white star-like particles connected
 * by constellation lines. Only active in dark theme.
 *
 * Features:
 * - White star particles (constellation effect)
 * - Connection lines between nearby particles
 * - Mouse interaction (attraction/repulsion)
 * - Performance optimized with RAF and requestIdleCallback
 * - Respects prefers-reduced-motion
 * - Only renders in dark theme
 *
 * @param options - Particle system configuration
 * @param className - Additional CSS classes
 */
const HeroParticles = ({ options, className = '' }: HeroParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<ParticleSystem | null>(null);
  const { currentTheme } = useContext(ThemeContext);

  useEffect(() => {
    // Only show in dark theme
    if (currentTheme !== 'dark') {
      // Cleanup if theme changed to light
      if (particleSystemRef.current) {
        particleSystemRef.current.destroy();
        particleSystemRef.current = null;
      }
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // Don't animate if user prefers reduced motion
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // White particles for starry constellation effect (dark theme only)
    const particleColor = '#FFFFFF';

    // Create particle system
    const defaultOptions: ParticleSystemOptions = {
      particleCount: 80,
      particleColor,
      particleRadius: 1.5,
      connectionDistance: 150,
      connectionOpacity: 0.08,
      speed: 0.2,
      enableMouse: true,
      mouseRadius: 150,
      mouseRepulsion: false,
    };

    const mergedOptions = { ...defaultOptions, ...options };
    particleSystemRef.current = new ParticleSystem(canvas, mergedOptions);

    // Use requestIdleCallback for performance (start when browser is idle)
    const startSystem = () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.start();
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(startSystem);
    } else {
      setTimeout(startSystem, 100);
    }

    // Handle resize with throttling
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (particleSystemRef.current) {
          particleSystemRef.current.resize();
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause animation when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (particleSystemRef.current) {
            if (entry.isIntersecting) {
              particleSystemRef.current.start();
            } else {
              particleSystemRef.current.stop();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    // Cleanup
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (particleSystemRef.current) {
        particleSystemRef.current.destroy();
        particleSystemRef.current = null;
      }
    };
  }, [currentTheme, options]);

  // Don't render canvas if not in dark theme
  if (currentTheme !== 'dark') {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`
        fixed
        inset-0
        w-full
        h-full
        pointer-events-none
        opacity-20
        ${className}
      `}
      style={{
        zIndex: 1,
      }}
    />
  );
};

export default HeroParticles;
