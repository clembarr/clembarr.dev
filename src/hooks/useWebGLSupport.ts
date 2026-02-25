import { useState, useEffect } from 'react';

/**
 * @hook useWebGLSupport
 * @description Detect if the browser supports WebGL and has a capable GPU.
 * Used to determine whether to render the 3D carousel or fallback to CSS 3D.
 *
 * @returns {boolean} - True if WebGL is supported and GPU is available
 */
export const useWebGLSupport = (): boolean => {
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    const checkWebGLSupport = (): boolean => {
      try {
        const canvas = document.createElement('canvas');
        const gl =
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl');

        if (!gl) {
          return false;
        }

        // Additional check for GPU capabilities
        const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = (gl as WebGLRenderingContext).getParameter(
            debugInfo.UNMASKED_RENDERER_WEBGL
          );

          // Detect software rendering (SwiftShader, llvmpipe, etc.)
          const isSoftwareRenderer = /swiftshader|llvmpipe|mesa/i.test(renderer as string);
          if (isSoftwareRenderer) {
            console.warn('Software rendering detected, falling back to CSS 3D');
            return false;
          }
        }

        return true;
      } catch (error) {
        console.error('WebGL detection error:', error);
        return false;
      }
    };

    setIsSupported(checkWebGLSupport());
  }, []);

  return isSupported;
};
