/**
 * @component Lights
 * @description Lighting setup for the 3D scene.
 * Provides ambient lighting and subtle point lights for depth.
 */
const Lights = () => {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.6} />

      {/* Main directional light from front-top */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
      />

      {/* Fill light from back for depth */}
      <directionalLight
        position={[-3, 2, -5]}
        intensity={0.3}
      />

      {/* Subtle point light for highlights */}
      <pointLight
        position={[0, 3, 3]}
        intensity={0.5}
        color="#7CFFC4"
      />
    </>
  );
};

export default Lights;
