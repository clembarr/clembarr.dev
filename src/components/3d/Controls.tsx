import { OrbitControls } from '@react-three/drei';

type ControlsProps = {
  enableRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

/**
 * @component Controls
 * @description Camera controls for the 3D scene using OrbitControls.
 * Allows user interaction with the carousel.
 *
 * @param enableRotate - Allow rotation via mouse/touch drag
 * @param enableZoom - Allow zoom via mouse wheel
 * @param enablePan - Allow panning
 * @param autoRotate - Enable auto-rotation
 * @param autoRotateSpeed - Speed of auto-rotation
 */
const Controls = ({
  enableRotate = true,
  enableZoom = false,
  enablePan = false,
  autoRotate = false,
  autoRotateSpeed = 0.5,
}: ControlsProps) => {
  return (
    <OrbitControls
      enableRotate={enableRotate}
      enableZoom={enableZoom}
      enablePan={enablePan}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
    />
  );
};

export default Controls;
