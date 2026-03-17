import { GraphicAsset } from "../dataTypes";

import CGI_logo from "./CGI_logo.png";
import LGP_logo from "./LGP_logo.webp";
import nagoya_u_logo from "./nagoya_u_logo.png";
import fnmns_logo from "./fnmns_logo.png";
import iut_info_logo from "./iut_info_logo.png";
import JDB_logo from "./JDB_logo.png";

export const CGILogo: GraphicAsset = {
    label: "CGI",
    content: {
        'light': CGI_logo,
        'dark': CGI_logo
    },
    alt: "CGI Logo"
};

export const LGPLogo: GraphicAsset = {
    label: "LGP",
    content: {
        'light': LGP_logo,
        'dark': LGP_logo
    },
    alt: "LGP Logo"
};

export const NagoyaULogo: GraphicAsset = {
    label: "Nagoya University",
    content: {
        'light': nagoya_u_logo,
        'dark': nagoya_u_logo
    },
    alt: "Nagoya University Logo"
};

export const FNMNSLogo: GraphicAsset = {
    label: "FNMNS",
    content: {
        'light': fnmns_logo,
        'dark': fnmns_logo
    },
    alt: "FNMNS Logo"
};

export const IUTInfoLogo: GraphicAsset = {
    label: "IUT Informatics of Bordeaux",
    content: {
        'light': iut_info_logo,
        'dark': iut_info_logo
    },
    alt: "IUT Informatics od Bordeaux Logo"
};  

export const JDBLogo: GraphicAsset = {
    label: "Lycée Jay de Beaufort",
    content: {
        'light': JDB_logo,
        'dark': JDB_logo
    },
    alt: "Lycée Jay de Beaufort Logo"
};