import { MediaType, ProjectMedia } from "../dataTypes";

import gpgtool_home from "./gpgtool_home.png";
import gpgtool_crypto_tool from "./gpgtool_crypto_tool.png";
import gpgtool_pgp_diagram from "./gpgtool_pgp_diagram.png";
import gpgtool_keys_listing from "./gpgtool_keys_listing.jpg";
import gpgtool_error_handling from "./gpgtool_error_handling.png";
import dummy_arrays_code from "./dummy_arrays_code.png"
import dummy_arrays_scheme from "./dummy_arrays_scheme.png"
import dummy_arrays_bench from "./dummy_arrays_graph_bench.png"
import dummy_arrays_optim from "./dummy_arrays_graph_optim.png"
import portfolio from "./portfolio.jpg";
import mstar_end_board from "./mstar_end_board.png";
import mstar_mcts_algo from "./mstar_mcts_algo.png";
import mstar_tournament_results from "./mstar_tournament_results.png";
import ecograph_home from "./ecograph_home.png";
import ecograph_gestion from "./ecograph_gestion.png";
import ecograph_gantt from "./ecograph_gantt.png"
import ecograph_visu from "./ecograph_visu.png";
import votator_home from "./votator_home.png"
import votator_swagger from "./votator_swagger.png"
import votator_active_bracket from "./votator_active_bracket.png"
import votator_closed_ones from "./votator_closed_ones.png"
import votator_past_round from "./votator_past_round.png"
import eew_algo from "./eew_algo.png"
import eew_uml_makegraph from "./eew_uml_makegraph.png"
import eew_uml_simulation from "./eew_uml_simulation.png"
import eew_lang_behaviors from "./eew_lang_behaviors.png"
import eew_lang_bias from "./eew_lang_bias.png"
import eew_logs_file from "./eew_logs_file.png"
import eew_prompts from "./eew_prompts.png"
import eew_basic_visuals from "./eew_basic_visuals.png"
import scaleway_pipeline from "./scaleway_pipeline.png"
import veridisquo_output from "./veridisquo_output.mp4"
import veridisquo_front from "./veridisquo_front.png"
import veridisquo_pipeline from "./veridisquo_pipeline.png"
import veridisquo_trainloss from "./veridisquo_trainloss.png"
import custom_cnn_archi from "./custom_cnn_archi.png"
import custom_cnn_irl from "./custom_cnn_irl.webp"
import custom_cnn_calibration from "./custom_cnn_calibration.png"
import custom_cnn_demo from "./custom_cnn_demo.mp4"
import custom_cnn_universe from "./custom_cnn_universe.png"
import custom_cnn_losses from "./custom_cnn_loses.png"
import ecc_ecc from "./ecc_ecc.png"
import ecc_corps_finis from "./ecc_corps_finis.png"
import ecc_limit_case from "./ecc_limit_case.png"
import ecc_add from "./ecc_add.png"


export const eccEcc: ProjectMedia = {
    url: ecc_ecc,
    type: MediaType.IMAGE,
    alt: "Diagram of ECC based Diffie-Hellman key exchange."
}

export const eccCorpsFinis: ProjectMedia = {
    url: ecc_corps_finis,
    type: MediaType.IMAGE,
    alt: "Graphical representation of elliptic curve operations adapted to finite corps."
}

export const eccLimitCase: ProjectMedia = {
    url: ecc_limit_case,
    type: MediaType.IMAGE,
    alt: "Illustration of the limit case in elliptic curve point addition, where the points are inverses of each other."
}

export const eccAdd: ProjectMedia = {
    url: ecc_add,
    type: MediaType.IMAGE,
    alt: "Visualization of the point addition operation on an elliptic curve, showing the geometric interpretation."
}

export const veridisquoOutput: ProjectMedia = {
    url: veridisquo_output,
    type: MediaType.VIDEO,
    alt: "Veridisquo project output video : original deepfake video versus heat mapped zones identified as deepfake by the model",
}

export const dummyArraysCode: ProjectMedia = {
    url: dummy_arrays_code,
    type: MediaType.IMAGE,
    alt: "Code snippet of the Rust implementation of the Dummy Arrays project, showcasing the use of HashMap and Vec for efficient data management."
}

export const dummyArraysScheme: ProjectMedia = {
    url: dummy_arrays_scheme,
    type: MediaType.IMAGE,
    alt: "Diagram illustrating the structure of the Dummy Arrays associative data structure, highlighting its components and their interactions."
}

export const dummyArraysBench: ProjectMedia = {
    url: dummy_arrays_bench,
    type: MediaType.IMAGE,
    alt: "Benchmark graph comparing the performance of the Rust and Go implementations of the Dummy Arrays project, showing execution time across different input sizes."
}

export const dummyArraysOptim: ProjectMedia = {
    url: dummy_arrays_optim,
    type: MediaType.IMAGE,
    alt: "Graph illustrating the optimization results for the Dummy Arrays project, comparing the original and optimized versions in terms of execution time and memory usage."
} 

export const customCNNArchi: ProjectMedia = {
    url: custom_cnn_archi,
    type: MediaType.IMAGE,
    alt: "Architecture diagram of the custom CNN model for deepfake detection, detailing the spatial and frequency analysis components, as well as the preprocessing steps."
}

export const customCNNIRL: ProjectMedia = {
    url: custom_cnn_irl,
    type: MediaType.IMAGE,
    alt: "In real life application of the custom CNN model, showcasing the heatmap output highlighting suspicious areas in a video frame."
}

export const customCNNCalibration: ProjectMedia = {
    url: custom_cnn_calibration,
    type: MediaType.IMAGE,
    alt: "Calibration graph for the custom CNN model, illustrating the relationship between predicted probabilities and actual outcomes to assess model reliability."
}

export const customCNNDemo: ProjectMedia = {
    url: custom_cnn_demo,
    type: MediaType.VIDEO,
    alt: "Demo video of the custom CNN model in action, showcasing its performance in detecting deepfakes."
}

export const customCNNUniverse: ProjectMedia = {
    url: custom_cnn_universe,
    type: MediaType.IMAGE,
    alt: "World point implementation scheme"
}

export const customCNNLosses: ProjectMedia = {
    url: custom_cnn_losses,
    type: MediaType.IMAGE,
    alt: "Loss curves for the custom CNN model, showing training and validation loss over epochs to evaluate model convergence."
}

/**
 * @deprecated The projectsMedia object is deprecated, use individual media objects instead.
 */
export const projectsMedia = {
    veridisquoOutput,
    dummyArraysCode,
    dummyArraysScheme,
    dummyArraysBench,
    dummyArraysOptim,
};

/**
 * @deprecated The projectsImages object is deprecated, use individual media objects instead.
 */
export const projectsImages = {
    veridisquo_trainloss,
    veridisquo_pipeline,
    veridisquo_front,
    scaleway_pipeline,
    gpgtool_home,
    gpgtool_crypto_tool,
    gpgtool_pgp_diagram,
    gpgtool_keys_listing,
    gpgtool_error_handling,
    portfolio,
    mstar_end_board,
    mstar_mcts_algo,
    mstar_tournament_results,
    ecograph_home,
    ecograph_gestion,
    ecograph_gantt,
    ecograph_visu,
    votator_home,
    votator_swagger,
    votator_active_bracket,
    votator_closed_ones,
    votator_past_round,
    eew_algo,
    eew_uml_makegraph,
    eew_uml_simulation,
    eew_lang_behaviors,
    eew_lang_bias,
    eew_logs_file,
    eew_prompts,
    eew_basic_visuals
}