import { useRef, useContext, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Project } from '../../assets/dataTypes';
import { projects } from '../../assets/contents';
import ProjectCard3D from './ProjectCard3D';
import Lights from './Lights';
import Controls from './Controls';
import { useWebGLSupport } from '../../hooks/useWebGLSupport';
import { ThemeContext } from '../theme/ThemeEngine';

/**
 * @component Projects3DCarousel
 * @description Main 3D carousel component displaying projects in a circular arrangement.
 * Features WebGL rendering with Three.js, drag rotation, and fallback to CSS 3D.
 *
 * Architecture:
 * - Projects arranged in a circle (radius 5 units)
 * - OrbitControls for mouse/touch rotation
 * - Lazy loading with Suspense
 * - GPU detection with automatic fallback
 */
const Projects3DCarousel = () => {
  const { currentTheme } = useContext(ThemeContext);
  const webGLSupported = useWebGLSupport();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Configuration
  const displayedProjects = projects.slice(0, 8); // Limit for performance
  const radius = 5;
  const cardCount = displayedProjects.length;

  /**
   * Calculate position for each card in circular arrangement
   */
  const getCardPosition = (index: number): [number, number, number] => {
    const angle = (index / cardCount) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    return [x, 0, z];
  };

  /**
   * Calculate rotation to face center
   */
  const getCardRotation = (index: number): [number, number, number] => {
    const angle = (index / cardCount) * Math.PI * 2;
    return [0, -angle, 0];
  };

  // Fallback to CSS 3D if WebGL not supported
  if (!webGLSupported) {
    return (
      <div className="
        w-full
        h-full
        flex
        items-center
        justify-center
        text-(--color-quaternary)
      ">
        <p>3D carousel requires WebGL. Using fallback mode...</p>
        {/* TODO: Implement CSS 3D fallback */}
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 2, 8], fov: 50 }}
        shadows
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          {/* Scene Setup */}
          <Lights />
          <Controls
            enableRotate={true}
            enableZoom={false}
            autoRotate={true}
            autoRotateSpeed={0.3}
          />

          {/* Fog for depth */}
          <fog attach="fog" args={[currentTheme === 'dark' ? '#2F2F2F' : '#f4f4f4', 8, 15]} />

          {/* Project Cards in Circle */}
          {displayedProjects.map((project: Project, index: number) => (
            <ProjectCard3D
              key={`project-3d-${index}`}
              project={project}
              position={getCardPosition(index)}
              rotation={getCardRotation(index)}
            />
          ))}

          {/* Ground plane for reference */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.1} />
          </mesh>
        </Suspense>
      </Canvas>

      {/* Navigation hints */}
      <div className="
        absolute
        bottom-4
        left-1/2
        -translate-x-1/2
        text-center
        text-(--color-quaternary)
        opacity-60
        text-xs
      ">
        <p>Drag to rotate • Click to view project</p>
      </div>
    </div>
  );
};

export default Projects3DCarousel;
