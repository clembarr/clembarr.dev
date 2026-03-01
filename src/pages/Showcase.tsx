/**
 * @fileoverview Showcase Page
 * Demonstrates all innovative visualization components.
 * A gallery of creative ways to present information.
 */

import { useContext } from 'react';
import { ThemeContext } from '../components/theme/ThemeEngine';
import { LangContext } from '../components/language';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/animations';
import { ScrollReveal } from '../components/animations';
import {
  OrbitingSkills,
  InfinityTimeline,
  HexagonGrid,
  PerspectiveCards,
  FlowingPath,
  MathSpiral,
} from '../components/showcase';
import styles from '../style';
import { MetaTags, StructuredData, websiteSchema } from '../components/seo';

/**
 * @description Showcase page presenting innovative visualization components.
 * Each section demonstrates a different creative approach to presenting data.
 */
const Showcase = () => {
  const { currentTheme } = useContext(ThemeContext);
  const { currentLang } = useContext(LangContext);
  const isDark = currentTheme === 'dark';

  // Theme colors
  const colors = {
    primary: isDark ? '#7CFFC4' : '#479561',
    secondary: isDark ? '#71cbb3' : '#5ab578',
    text: isDark ? '#71cbb3' : '#3D3E3C',
    textMuted: isDark ? 'rgba(113, 203, 179, 0.7)' : 'rgba(61, 62, 60, 0.7)',
    background: isDark ? '#2F2F2F' : '#f4f4f4',
    sectionBg: isDark ? '#282929' : '#f1f1f1',
  };

  // Sample data for components
  const orbitRings = [
    {
      items: [
        { id: 'react', label: 'React' },
        { id: 'typescript', label: 'TypeScript' },
        { id: 'python', label: 'Python' },
      ],
      radius: 100,
      duration: 20,
      direction: 'clockwise' as const,
    },
    {
      items: [
        { id: 'rust', label: 'Rust' },
        { id: 'java', label: 'Java' },
        { id: 'go', label: 'Go' },
        { id: 'csharp', label: 'C#' },
      ],
      radius: 160,
      duration: 30,
      direction: 'counterclockwise' as const,
    },
    {
      items: [
        { id: 'docker', label: 'Docker' },
        { id: 'git', label: 'Git' },
        { id: 'linux', label: 'Linux' },
        { id: 'aws', label: 'AWS' },
        { id: 'sql', label: 'SQL' },
      ],
      radius: 220,
      duration: 40,
      direction: 'clockwise' as const,
    },
  ];

  const timelineEvents = [
    { id: '1', title: 'Foundation', date: '2020', description: 'Started learning programming fundamentals and algorithms.' },
    { id: '2', title: 'Web Dev', date: '2021', description: 'Dove into web development with React and TypeScript.' },
    { id: '3', title: 'Backend', date: '2022', description: 'Expanded to backend development and databases.' },
    { id: '4', title: 'Systems', date: '2023', description: 'Explored systems programming with Rust and Go.' },
    { id: '5', title: 'AI/ML', date: '2024', description: 'Research in artificial intelligence and machine learning.' },
    { id: '6', title: 'Research', date: '2025', description: 'Academic research and open-source contributions.' },
  ];

  const hexItems = [
    { id: 'h1', label: 'React', category: 'library' },
    { id: 'h2', label: 'TypeScript', category: 'language' },
    { id: 'h3', label: 'Python', category: 'language' },
    { id: 'h4', label: 'Rust', category: 'language' },
    { id: 'h5', label: 'Docker', category: 'tool' },
    { id: 'h6', label: 'Git', category: 'tool' },
    { id: 'h7', label: 'Tailwind', category: 'library' },
    { id: 'h8', label: 'Node.js', category: 'tool' },
    { id: 'h9', label: 'PostgreSQL', category: 'tool' },
    { id: 'h10', label: 'Go', category: 'language' },
    { id: 'h11', label: 'Framer', category: 'library' },
    { id: 'h12', label: 'Three.js', category: 'library' },
  ];

  const perspectiveCardsData = [
    { id: 'p1', title: 'GPGtool', description: 'A Python PGP key manager with GUI', tags: ['Python', 'Security', 'GUI'] },
    { id: 'p2', title: 'Votator', description: 'React voting tournament application', tags: ['React', 'API', 'Async'] },
    { id: 'p3', title: 'MStar', description: 'Monte Carlo pathfinding algorithm', tags: ['Java', 'AI', 'Algorithm'] },
    { id: 'p4', title: 'Ecograph', description: 'Climate data visualization tool', tags: ['C#', 'Data', 'Viz'] },
    { id: 'p5', title: 'EEW Study', description: 'Evolutionary linguistics research', tags: ['Python', 'AI', 'Research'] },
    { id: 'p6', title: 'Portfolio', description: 'This website you are viewing', tags: ['React', 'TypeScript', 'Tailwind'] },
  ];

  const flowingMilestones = [
    { id: 'f1', title: 'Start', position: 0, description: 'Beginning of the journey' },
    { id: 'f2', title: 'Learn', position: 0.2, description: 'Acquiring fundamental knowledge' },
    { id: 'f3', title: 'Build', position: 0.4, description: 'Creating first projects' },
    { id: 'f4', title: 'Grow', position: 0.6, description: 'Expanding skills and experience' },
    { id: 'f5', title: 'Master', position: 0.8, description: 'Achieving expertise' },
    { id: 'f6', title: 'Inspire', position: 1, description: 'Sharing knowledge with others' },
  ];

  const spiralItems = [
    { id: 's1', label: 'Logic', size: 'sm' as const },
    { id: 's2', label: 'Code', size: 'sm' as const },
    { id: 's3', label: 'Design', size: 'md' as const },
    { id: 's4', label: 'Systems', size: 'md' as const },
    { id: 's5', label: 'AI', size: 'md' as const },
    { id: 's6', label: 'Research', size: 'lg' as const },
    { id: 's7', label: 'Data', size: 'sm' as const },
    { id: 's8', label: 'Web', size: 'md' as const },
    { id: 's9', label: 'Mobile', size: 'sm' as const },
    { id: 's10', label: 'Cloud', size: 'md' as const },
    { id: 's11', label: 'Security', size: 'lg' as const },
    { id: 's12', label: 'DevOps', size: 'sm' as const },
  ];

  // Section component for consistent styling
  const Section = ({
    title,
    subtitle,
    children,
    className = '',
  }: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <ScrollReveal direction="up">
      <section
        className={`py-16 md:py-24 px-4 md:px-8 ${className}`}
        style={{ background: colors.sectionBg }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-2xl md:text-3xl font-primary-bold mb-3"
              style={{ color: colors.text }}
            >
              {title}
            </h2>
            <p
              className="text-sm md:text-base font-secondary-regular max-w-2xl mx-auto"
              style={{ color: colors.textMuted }}
            >
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </section>
    </ScrollReveal>
  );

  return (
    <PageTransition>
      <MetaTags
        title="Showcase - Clément Barrière"
        description="Composants de visualisation créatifs et innovants : orbites, timelines, grilles hexagonales et plus."
        keywords={['showcase', 'visualisation', 'components', 'creative', 'framer motion']}
        ogUrl="https://clembarr.dev/showcase"
        canonical="https://clembarr.dev/showcase"
      />
      <StructuredData schema={websiteSchema} />
      <div className={`${styles.page} ${styles.flexCol}`}>
        {/* Hero Section */}
        <section
          className="min-h-[60vh] flex items-center justify-center px-4 py-20"
          style={{ background: colors.background }}
        >
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className={`${styles.heroHeading} ${styles.gradientText} mb-6`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {currentLang === 'fr' ? 'Composants Innovants' : 'Innovative Components'}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl font-secondary-regular max-w-2xl mx-auto"
              style={{ color: colors.textMuted }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {currentLang === 'fr'
                ? 'Une collection de visualisations créatives pour présenter idées, compétences et parcours de manière unique.'
                : 'A collection of creative visualizations to present ideas, skills, and journeys in unique ways.'}
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              className="mt-12"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div
                className="w-6 h-10 rounded-full border-2 mx-auto flex justify-center pt-2"
                style={{ borderColor: colors.primary }}
              >
                <motion.div
                  className="w-1.5 h-3 rounded-full"
                  style={{ background: colors.primary }}
                  animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 1. Orbiting Skills */}
        <Section
          title={currentLang === 'fr' ? 'Orbites de Compétences' : 'Orbiting Skills'}
          subtitle={currentLang === 'fr'
            ? 'Un système planétaire où les compétences gravitent autour d\'un noyau central. Parfait pour visualiser des hiérarchies ou catégories.'
            : 'A planetary system where skills orbit around a central core. Perfect for visualizing hierarchies or categories.'}
        >
          <div className="flex justify-center">
            <OrbitingSkills
              centerLabel="Dev"
              rings={orbitRings}
              size={500}
            />
          </div>
        </Section>

        {/* 2. Infinity Timeline */}
        <Section
          title={currentLang === 'fr' ? 'Timeline Infinie' : 'Infinity Timeline'}
          subtitle={currentLang === 'fr'
            ? 'Un parcours en forme de lemniscate (∞), symbolisant la continuité et l\'évolution perpétuelle.'
            : 'A journey shaped like a lemniscate (∞), symbolizing continuity and perpetual evolution.'}
          className="overflow-hidden"
        >
          <InfinityTimeline
            events={timelineEvents}
            title={currentLang === 'fr' ? 'Mon Parcours' : 'My Journey'}
            subtitle={currentLang === 'fr' ? 'Une évolution continue' : 'A continuous evolution'}
          />
        </Section>

        {/* 3. Hexagon Grid */}
        <Section
          title={currentLang === 'fr' ? 'Grille Hexagonale' : 'Hexagon Grid'}
          subtitle={currentLang === 'fr'
            ? 'Une disposition en nid d\'abeille interactive. Chaque hexagone révèle son contenu au survol.'
            : 'An interactive honeycomb layout. Each hexagon reveals its content on hover.'}
        >
          <HexagonGrid
            items={hexItems}
            hexSize={85}
            gap={10}
            columns={6}
          />
        </Section>

        {/* 4. Perspective Cards */}
        <Section
          title={currentLang === 'fr' ? 'Cartes en Perspective' : 'Perspective Cards'}
          subtitle={currentLang === 'fr'
            ? 'Des cartes qui flottent dans l\'espace 3D et réagissent au mouvement de la souris et au scroll.'
            : 'Cards floating in 3D space, responding to mouse movement and scroll.'}
        >
          <PerspectiveCards cards={perspectiveCardsData} />
        </Section>

        {/* 5. Flowing Path */}
        <Section
          title={currentLang === 'fr' ? 'Chemin Fluide' : 'Flowing Path'}
          subtitle={currentLang === 'fr'
            ? 'Un parcours animé avec des particules qui voyagent le long du chemin, marquant les étapes clés.'
            : 'An animated path with particles traveling along it, marking key milestones.'}
          className="overflow-hidden"
        >
          <FlowingPath
            milestones={flowingMilestones}
            pathType="wave"
            title={currentLang === 'fr' ? 'Le Voyage' : 'The Journey'}
          />
        </Section>

        {/* 6. Math Spiral */}
        <Section
          title={currentLang === 'fr' ? 'Spirale Mathématique' : 'Mathematical Spiral'}
          subtitle={currentLang === 'fr'
            ? 'Une spirale de Fibonacci où les éléments grandissent suivant le ratio d\'or, symbolisant la croissance naturelle.'
            : 'A Fibonacci spiral where elements grow following the golden ratio, symbolizing natural growth.'}
        >
          <MathSpiral
            items={spiralItems}
            spiralType="fibonacci"
            title={currentLang === 'fr' ? 'Croissance' : 'Growth'}
            subtitle={currentLang === 'fr' ? 'Suivant le ratio d\'or φ' : 'Following the golden ratio φ'}
          />
        </Section>

        {/* Footer Note */}
        <section
          className="py-16 px-4 text-center"
          style={{ background: colors.background }}
        >
          <motion.p
            className="text-sm font-secondary-regular max-w-xl mx-auto"
            style={{ color: colors.textMuted }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {currentLang === 'fr'
              ? 'Ces composants sont réutilisables et adaptables. Ils peuvent présenter des projets, compétences, parcours, réalisations et bien plus encore.'
              : 'These components are reusable and adaptable. They can present projects, skills, journeys, achievements, and much more.'}
          </motion.p>
          <motion.div
            className="mt-6 text-xs font-secondary-regular"
            style={{ color: colors.primary }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {currentLang === 'fr' ? 'Créé avec React, Framer Motion & Tailwind CSS' : 'Built with React, Framer Motion & Tailwind CSS'}
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Showcase;
