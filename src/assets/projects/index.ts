/**
 * @fileoverview Projects barrel export
 * Centralizes all project definitions and maintains array interface for backward compatibility
 */

import { Retex } from '../dataTypes';
import { veridisquo } from './veridisquo';
import { gpgtool } from './gpgtool';
import { eewAnalyzer } from './eew-analyzer';
import { mstar } from './mstar';
import { ecograph } from './ecograph';
import { dummyArrays } from './dummy-arrays';
import { votator } from './votator';
import { scalewayDeployment } from './scaleway-deployement';
import { customCNN } from './custom_cnn';

/**
 * All projects - maintains array interface for backward compatibility
 * Projects are ordered by date (most recent first)
 */
export const projects: Retex[] = [
  veridisquo,
  scalewayDeployment,
  gpgtool,
  eewAnalyzer,
  mstar,
  ecograph,
  dummyArrays,
  votator,
  customCNN
];

// Individual exports for direct access
export {
  veridisquo,
  gpgtool,
  eewAnalyzer,
  mstar,
  ecograph,
  dummyArrays,
  votator,
  scalewayDeployment,
  customCNN
};