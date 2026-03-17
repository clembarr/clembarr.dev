/**
 * @fileoverview Scaleway Deployment project definition
 * Infrastructure as Code (IaC) deployment of a Rust application on Scaleway using Terraform and Docker.
 */

import { Retex } from '../dataTypes';
import { UNIVERSAL_LANG } from '../../utils/translationUtils';
import { getSkill } from '../../utils/assetsUtils';
import { projectsImages } from '../index';

export const scalewayDeployment: Retex = {
  title: {
    fr: "Déploiement Scaleway",
    en: "Scaleway Deployment",
  },
  date: new Date(2026, 1),
  coverImage: projectsImages.scaleway_pipeline, 
  tags: {
    en: ["Cloud", "IaC", "DevOps", "Infrastructure", "Automation", "Academic", "University", "IA"],
    fr: ["Cloud", "IaC", "DevOps", "Infrastructure", "Automatisation", "Académique", "Universitaire", "AI"],
    [UNIVERSAL_LANG]: ["Terraform", "Docker", "Scaleway", "Rust", "S3", "Web", "Backend", "MCP"],
  },
  description: {
    fr:
    "Déploiement automatisé d'un MCP en Rust sur l'infrastructure Cloud Scaleway en utilisant Terraform (IaC) et Docker.\
    Le service est conteneurisé avec une image multi-stage, et utilisé pour gérer une BD.",
    en:
    "Automated deployment of a Rust MCP on the Scaleway Cloud infrastructure using Terraform (IaC) and Docker.\
    The service is containerized with a multi-stage image, and used to manage a database.",
  },
  content: {
    specs: {
      fr:
      "Ce projet de <strong>Cloud Computing</strong> consistait à déployer un <strong>MCP de gestion de BDD PostgreSQL en Rust</strong> sur l'infrastructure <strong>Scaleway</strong>. \
      L'application est conteneurisée et optimisée via un <strong>Dockerfile multi-stage</strong>, et gérée avec <strong>Terraform</strong> (IaC). \
      Le backend distant S3 est configuré par le state de Terraform, avec activation du <strong>state locking</strong> pour la collaboration. Le déploiement cible \
      un Container Namespace Scaleway, avec une gestion précise des ressources (CPU et RAM) pour <strong>optimiser les coûts</strong>. Les permissions \
      au sein de l'application sont configurées pour assurer la sécurité et l'accès contrôlé. Ainsi, j'ai pu brancher mon service au <strong>Chat de Mistral</strong> en lecture\
      seule, et l'utiliser pour <strong>mener des analyses sur ma base de données</strong>.",
      en:
      "This <strong>Cloud Computing</strong> project consisted in deploying a <strong>Rust PostgreSQL management MCP</strong> on the <strong>Scaleway</strong> infrastructure.\
      The application is containerized and optimized via a <strong>multi-stage Dockerfile</strong>, and managed with <strong>Terraform</strong> (IaC). \
      The S3 remote backend is configured by the Terraform state, with <strong>state locking</strong> enabled for collaboration. The deployment targets \
      a Scaleway Container Namespace, with precise resource management (CPU and RAM) to <strong>optimize costs</strong>. Permissions within the application are\
      configured to ensure security and controlled access. Thus, I was able to connect my service to the <strong>Mistral Chat</strong> in read-only,\
      and use it to <strong>conduct analyses on my database</strong>.",
    },
    notions: {
      fr: [
        "Infrastructure as Code (IaC)",
        "Conteneurisation optimisée",
        "Collaboration et gestion d'état",
        "Mise en relation de services"
      ],
      en: [
        "Infrastructure as Code (IaC)",
        "Optimized containerization",
        "Collaboration and state management",
        "Connecting services"
      ],
    },
    tools: [
      getSkill('Rust'),
      getSkill('Docker'),
      getSkill('Terraform'),
      getSkill('SQL'),
    ],
    images: [
      projectsImages.scaleway_pipeline, 
    ],
  }
};
