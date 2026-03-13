import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { eccAdd, eccCorpsFinis, eccEcc, eccLimitCase } from '../projects_images';

export const eccSae: Retex = {
  title: {
    [UNIVERSAL_LANG]: "Cryptography with EC",
    fr: "Cryptographie sur CE",
  },
  date: new Date(2025, 2),
  coverImage: eccEcc,
  tags: {
    fr: ["Crypto", "Maths", "Recherche", "Universitaire", "Académique", "PF", "Algo", "Programmation foncionnelle", "Modélisation"],
    [UNIVERSAL_LANG]: ["Crypto", "Maths", "Research", "Academic", "University", "FP", "Algo", "Functional programming", "Modeling"],
  },
  description: {
    fr:
    "Modélisation de courbes élliptiques et implémentation d'un protocole d'échange de clés ECDH en Python.\
    Un benchmark comparatif avec RSA a été réalisé, mettant en évidence l'efficacité de l'ECC.",
    en:
    "Modeling of elliptic curves and implementation of an ECDH key exchange protocol in Python.\
    A comparative benchmark with RSA was conducted, highlighting the efficiency of ECC.",
  },
  content: {
    specs: {
      fr:
      "Projet de <strong>modélisation mathématique</strong> visant à implémenter l'algorithme de <strong>Weierstrass</strong> pour gérer les calculs de point sur des courbes élliptiques.\
      En équipe, nous avons programmé les algo fondamentaux d'addition et de multiplication de points avec la méthode <strong>\"double and add\"</strong>. Il aura ensuite \
      fallu adapter ces opérations aux <strong>corps finis</strong> grâce à l'algorithme de <strong>Tonelli-Shanks</strong> pour le calcul des racines carrées modulaires. Afin de tester notre \
      implémentation, nous avons <strong>simulé un protocole d'échange de clés ECDH</strong> entre deux entités, illustrant ainsi la sécurité offerte par le problème du logarithme \
      discretdiscret. Pour évaluer la pertinence de cette approche, <strong>un benchmark comparatif avec le protocole RSA</strong> a été effectué. Les résultats ont mis en évidence \
      l'efficacité de l'ECC, avec une génération de clés environ <strong>4000 fois plus rapide</strong> et un calcul de secret partagé <strong>moins coûteux</strong> en ressources. \
      Cette réalisation a également permis d'analyser les vulnérabilités liées à la qualité des <strong>générateurs de nombres pseudo-aléatoires</strong> et l'importance \
      cruciale du choix des paramètres de la courbe pour garantir la sécurité des échanges.",
      en:
      "A project of <strong>mathematical modeling</strong> aiming to implement the <strong>Weierstrass algorithm</strong> to handle point calculations on elliptic curves\
      In a team, we programmed the fundamental algorithms of point addition and multiplication with the <strong>\"double and add\"</strong> method. It was then necessary \
      to adapt these operations to <strong>finite fields</strong> using the <strong>Tonelli-Shanks algorithm</strong> for modular square root calculations. To test our \
      implementation, we <strong>simulated a key exchange protocol ECDH</strong> between two entities, illustrating the security provided by the discrete logarithm problem. \
      To evaluate the relevance of this approach, a <strong>comparative benchmark with the RSA protocol</strong> was conducted. The results highlighted the efficiency of ECC, \
      with key generation approximately <strong>4000 times faster</strong> and shared secret computation <strong>less resource-intensive</strong>. This achievement also allowed \
      us to analyze vulnerabilities related to the quality of <strong>pseudo-random number generators</strong> and the critical importance of choosing appropriate curve parameters \
      to ensure exchange security."
    },
    notions: {
      en: [
        "Mathematical optimization",
        "Advanced prime number cryptography",
        "Scientific approach and presentation",
        "Team research",
      ],
      fr: [
        "Optimisation mathématique",
        "Cryptographie avancée des nombres premiers",
        "Démarche et présentation scientifique",
        "Recherche en équipe",
      ],
    },
    tools: [
      getSkill('Python'),
      getSkill('Matplotlib'),
      getSkill('Latex'),
      getSkill('Git'),
    ],
    images: [
      eccEcc,
      eccAdd,
      eccLimitCase,
      eccCorpsFinis
    ],
  }
};
