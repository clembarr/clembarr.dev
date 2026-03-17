/**
 * @fileoverview GPGtool project definition
 * A 100% Python PGP keys manager with accessible graphic interface
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { projectsImages } from '../index';

export const gpgtool: Retex = {
  title: {
    [UNIVERSAL_LANG]: "GPGtool"
  },
  date: new Date(2024, 9),
  coverImage: projectsImages.gpgtool_home,
  tags: {
    fr: ["POO", "Utilitaire", "Crypto", "PE", "Programmation évenementielle", "Logiciel", "Programmation orientée objet", "Personnel", "IU"],
    en: ["Tool", "OOP", "Crypto", "EP", "Event-driven programming", "Object-oriented programming", "Personal", "Software"],
    [UNIVERSAL_LANG]: ["UI", "UX", "CLI", "Test", "Tests", "Perso", "Testing"],
  },
  description: {
    fr:
    "Un gestionnaire de clés PGP 100% Python. Il embarque une interface graphique accessible, et facilite l'utilisation de la technologie GnuPG. \
    Gérez vos propres paires de clés, et utilisez les pour des messages et fichiers.",
    en:
    "A 100% Python PGP keys manager, which embeds an accessible graphic interface, facilitating the use of the GnuPG technology. Manage your own \
    key pairs, and encrypt/decrypt messages and files.",
  },
  content: {
    specs: {
      en:
      "This PGP key manager meets the fundamental need to make <strong>communication and data security accessible</strong>. \
      The application can be used as an encapsulation of the GnuPG library in API mode, or as a complete graphical tool with its \
      CustomTk interface. Two tabs are currently available: data encryption/decryption, and key management. \
      The focus has been on <strong>maintainability and extensibility</strong> to make the development of the application as smooth as its use.",
      fr:
      "Ce gestionnaire de clés PGP répond au besoin fondamental de rendre accessible la <strong>sécurisation des communications et données</strong>.\
      L'application peut être utilisée comme une encapsulation de la bibliothèque GnuPG en mode API, ou comme un outil graphique complet avec\
      son interface sous CustomTK. Deux onglets sont actuellement disponibles: le chiffrement/déchiffrement de données, et la gestion de clés.\
      L'accent a été mis sur <strong>la maintenabilité et l'extensibilité</strong> pour rendre le développement de l'application aussi fluide que son utilisation.",
    },
    notions: {
      en: ["Error handling and log files,", "<strong>MVC</strong> and <strong>SOLID</strong> architecture,", "<strong>User-friendly</strong> client application."],
      fr: ["Gestion d'erreurs et fichiers de logs,", "Architecture <strong>MVC</strong> et principes <strong>SOLID</strong>,", "<strong>Application cliente</strong> ergonomique."],
    },
    tools: [
      getSkill('Python'),
      getSkill('GnuPG'),
      getSkill('CustomTK'),
    ],
    images: [
      projectsImages.gpgtool_home,
      projectsImages.gpgtool_crypto_tool,
      projectsImages.gpgtool_keys_listing,
      projectsImages.gpgtool_pgp_diagram,
    ],
    additionalRessources: [
      {
        content: {
          fr: "Répo GitHub",
          en: "GitHub Repo",
        },
        link: "https://github.com/clembarr/GPGtool",
      },
    ]
  }
};
