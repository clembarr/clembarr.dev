/**
 * @fileoverview Blog images barrel export
 * Editorial illustrations for blog posts, following the same pattern as
 * projects_images/index.ts: one named ProjectMedia export per image.
 */

import { MediaType, ProjectMedia } from "../dataTypes";

import bloom_filter_fly_variant from "./bloom_filter_fly_variant.webp";
import notes_brainsto_ffbf from "./notes_brainsto_ffbf.webp";


export const bloomFilterFlyVariant: ProjectMedia = {
    url: bloom_filter_fly_variant,
    type: MediaType.IMAGE,
    alt: "Comparaison entre un filtre de Bloom traditionnel, qui répond oui ou non à la nouveauté, et le filtre de Bloom de la mouche, où les cellules de Kenyon activées pondèrent les synapses vers le neurone MBON-α'3 pour produire un score de nouveauté continu."
}

export const notesBrainstoFFBF: ProjectMedia = {
    url: notes_brainsto_ffbf,
    type: MediaType.IMAGE,
    alt: "Notes manuscrites de brainstorming sur le pipeline du circuit olfactif : récepteurs olfactifs, neurones de projection, environ 2000 cellules de Kenyon, synapses vers les MBON, et score de nouveauté calculé comme somme pondérée des activations."
}

/** @deprecated Re-exported by assets/index.ts; import the named exports above instead. */
export const blogImages = {

};
