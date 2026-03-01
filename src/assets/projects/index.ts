/**
 * @fileoverview Projects barrel export
 * Centralizes all project definitions and maintains array interface for backward compatibility
 */

import { Retex } from '../dataTypes';
import { gpgtool } from './gpgtool';
import { eewAnalyzer } from './eew-analyzer';
import { mstar } from './mstar';
import { ecograph } from './ecograph';
import { dummyArrays } from './dummy-arrays';
import { votator } from './votator';
import { studyOfEew } from './study-of-eew';

/**
 * All projects - maintains array interface for backward compatibility
 * Projects are ordered by date (most recent first)
 */
export const projects: Retex[] = [
  gpgtool,
  eewAnalyzer,
  mstar,
  ecograph,
  dummyArrays,
  votator,
  studyOfEew,
];

// Individual exports for direct access
export {
  gpgtool,
  eewAnalyzer,
  mstar,
  ecograph,
  dummyArrays,
  votator,
  studyOfEew
};

/**
 * EMPTY RETEX TEMPLATE:
 * ---------------------
 * 
  {
    title: 
    {
      fr: "",
      en: "",
    },
    date: new Date(2025, 6),
    tools: [
    ],
    description:
    {
      fr:
      "",
    },
    specs:
    {
      fr: 
      "",
    },
    notions:
    {
      fr: [],
    },
    tags:
    {
      en: [],
    },
    img: [
    ],
    additionalRessources: [
      {
        content: 
        {
          fr: "",
          en: "",
        },
        link: "",
      },
    ]
  },
 */