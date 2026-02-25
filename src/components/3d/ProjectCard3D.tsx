import { useRef, useState, useContext } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Html } from '@react-three/drei';
import { Project } from '../../assets/dataTypes';
import { LangContext } from '../language';
import { RetexContext } from '../retex';
import styles from '../../style';

type ProjectCard3DProps = {
  project: Project;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick?: () => void;
};

/**
 * @component ProjectCard3D
 * @description A 3D card displaying project information in the carousel.
 * Features glassmorphism, hover effects, and click interaction.
 *
 * @param project - Project data to display
 * @param position - 3D position in the scene
 * @param rotation - Initial rotation
 * @param onClick - Click handler
 */
const ProjectCard3D = ({ project, position, rotation, onClick }: ProjectCard3DProps) => {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const { currentLang } = useContext(LangContext);
  const { setDisplayedRetex } = useContext(RetexContext);

  // Hover animation
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

      // Glow effect on hover
      if (hovered) {
        materialRef.current.emissiveIntensity = 0.3;
      } else {
        materialRef.current.emissiveIntensity = 0.1;
      }
    }
  });

  const handleClick = () => {
    setDisplayedRetex(project.title[currentLang]);
    if (onClick) onClick();
  };

  return (
    <group position={position} rotation={rotation}>
      {/* 3D Card Mesh */}
      <RoundedBox
        ref={meshRef}
        args={[2.5, 3.5, 0.1]}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          ref={materialRef}
          color={hovered ? "#7CFFC4" : "#f1f1f1"}
          metalness={0.1}
          roughness={0.4}
          emissive="#7CFFC4"
          emissiveIntensity={0.1}
          transparent
          opacity={0.9}
        />
      </RoundedBox>

      {/* HTML Overlay for text content */}
      <Html
        transform
        occlude
        position={[0, 0, 0.06]}
        style={{
          width: '220px',
          height: '320px',
          pointerEvents: hovered ? 'auto' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          className={`
            ${styles.flexCol}
            ${styles.sizeFull}
            p-4
            ${styles.contentStartAll}
            gap-3
            ${hovered ? 'opacity-100' : 'opacity-80'}
            transition-all
            duration-300
          `}
          style={{
            background: 'rgba(241, 241, 241, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '8px',
          }}
        >
          {/* Project Title */}
          <h3
            className="
              font-primary-bold
              text-sm
              text-(--color-quaternary)
              line-clamp-2
            "
          >
            {project.title[currentLang]}
          </h3>

          {/* Project Description */}
          <p
            className="
              font-primary-regular
              text-2xs
              text-(--color-quaternary)
              line-clamp-4
              opacity-80
            "
          >
            {project.description[currentLang]}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-auto">
            {project.tags[currentLang].slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="
                  text-3xs
                  text-(--color-tertiary)
                  px-2
                  py-1
                  bg-(--color-tertiary)
                  bg-opacity-10
                  rounded
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default ProjectCard3D;
