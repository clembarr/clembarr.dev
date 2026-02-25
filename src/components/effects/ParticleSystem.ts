/**
 * @file ParticleSystem.ts
 * @description Core particle system logic for canvas-based particle effects.
 * Handles particle creation, physics, connections, and rendering.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export interface ParticleSystemOptions {
  particleCount?: number;
  particleColor?: string;
  particleRadius?: number;
  connectionDistance?: number;
  connectionOpacity?: number;
  speed?: number;
  enableMouse?: boolean;
  mouseRadius?: number;
  mouseRepulsion?: boolean;
}

/**
 * @class ParticleSystem
 * @description Manages a system of particles with physics and connections.
 */
export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouse: { x: number | null; y: number | null } = { x: null, y: null };
  private animationId: number | null = null;
  private options: Required<ParticleSystemOptions>;
  private lastMouseUpdate: number = 0;
  private readonly MOUSE_THROTTLE_MS = 16; // ~60fps

  constructor(canvas: HTMLCanvasElement, options: ParticleSystemOptions = {}) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context');
    this.ctx = ctx;

    // Default options
    this.options = {
      particleCount: options.particleCount ?? 80,
      particleColor: options.particleColor ?? '#7CFFC4',
      particleRadius: options.particleRadius ?? 2,
      connectionDistance: options.connectionDistance ?? 150,
      connectionOpacity: options.connectionOpacity ?? 0.2,
      speed: options.speed ?? 0.5,
      enableMouse: options.enableMouse ?? true,
      mouseRadius: options.mouseRadius ?? 120,
      mouseRepulsion: options.mouseRepulsion ?? false,
    };

    this.init();
  }

  /**
   * @method init
   * @description Initialize particles and set up canvas.
   */
  private init(): void {
    this.resizeCanvas();
    this.createParticles();

    if (this.options.enableMouse) {
      this.setupMouseTracking();
    }
  }

  /**
   * @method resizeCanvas
   * @description Resize canvas to match its display size.
   */
  private resizeCanvas(): void {
    const { width, height } = this.canvas.getBoundingClientRect();
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
   * @method createParticles
   * @description Create initial particle array with random positions and velocities.
   */
  private createParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        radius: this.options.particleRadius,
        color: this.options.particleColor,
      });
    }
  }

  /**
   * @method setupMouseTracking
   * @description Add event listeners for mouse movement with throttling.
   */
  private setupMouseTracking(): void {
    this.canvas.addEventListener('mousemove', (e) => {
      const now = performance.now();
      // Throttle mouse updates to ~60fps for performance
      if (now - this.lastMouseUpdate < this.MOUSE_THROTTLE_MS) return;
      this.lastMouseUpdate = now;

      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  /**
   * @method updateParticles
   * @description Update particle positions with physics and mouse interaction.
   */
  private updateParticles(): void {
    const { width, height } = this.canvas;

    this.particles.forEach((particle) => {
      // Mouse interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.options.mouseRadius) {
          const force = (this.options.mouseRadius - distance) / this.options.mouseRadius;
          const angle = Math.atan2(dy, dx);
          const repulsionMultiplier = this.options.mouseRepulsion ? -1 : 1;

          particle.vx += Math.cos(angle) * force * 0.2 * repulsionMultiplier;
          particle.vy += Math.sin(angle) * force * 0.2 * repulsionMultiplier;
        }
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary collision with bounce
      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(width, particle.x));
      }
      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(height, particle.y));
      }

      // Friction to prevent endless acceleration
      particle.vx *= 0.99;
      particle.vy *= 0.99;
    });
  }

  /**
   * @method drawConnections
   * @description Draw lines between nearby particles.
   */
  private drawConnections(): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.options.connectionDistance) {
          const opacity =
            this.options.connectionOpacity * (1 - distance / this.options.connectionDistance);

          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(124, 255, 196, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  /**
   * @method drawParticles
   * @description Render all particles as circles.
   */
  private drawParticles(): void {
    this.particles.forEach((particle) => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();
    });
  }

  /**
   * @method animate
   * @description Main animation loop.
   */
  private animate = (): void => {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw
    this.updateParticles();
    this.drawConnections();
    this.drawParticles();

    // Continue animation
    this.animationId = requestAnimationFrame(this.animate);
  };

  /**
   * @method start
   * @description Start the particle system animation.
   */
  public start(): void {
    if (!this.animationId) {
      this.animate();
    }
  }

  /**
   * @method stop
   * @description Stop the particle system animation.
   */
  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * @method resize
   * @description Handle canvas resize (call on window resize).
   */
  public resize(): void {
    this.resizeCanvas();
    // Reposition particles that are now out of bounds
    this.particles.forEach((particle) => {
      particle.x = Math.min(particle.x, this.canvas.width);
      particle.y = Math.min(particle.y, this.canvas.height);
    });
  }

  /**
   * @method destroy
   * @description Clean up particle system.
   */
  public destroy(): void {
    this.stop();
    this.particles = [];
  }
}
