import { lazy, Suspense } from 'react';
import styles from "../style";
import { Hero, About, CareerTimeline, Contact } from "../components/sections";
import { ScrollReveal, PageTransition } from "../components/animations";
import { SuspenseFallback } from "../components";
import { MetaTags, StructuredData } from "../components/seo";
import { HomeSEOConstants, personSchema, websiteSchema } from '../assets/constants';

const ProjectsSlider = lazy(() => import("../components/sections/ProjectsSlider"));

/**
 * @component Home
 * @description Home page. Lazy-loads ProjectsSlider to keep the initial bundle small.
 * Sections are revealed on scroll via ScrollReveal wrappers.
 */
const Home = () => {
  return (
    <PageTransition>
      <MetaTags
        title={HomeSEOConstants.title}
        description={HomeSEOConstants.description}
        keywords={HomeSEOConstants.keywords}
        ogUrl={HomeSEOConstants.ogUrl}
        canonical={HomeSEOConstants.canonical}
      />
      <StructuredData schema={[personSchema, websiteSchema]} />
    <div id='home-container'
      className={`
        ${styles.page}
        ${styles.flexCol}
        2xl:space-y-[12%] xl:space-y-[17%] lg:space-y-[10%] md:space-y-[8%] sm:space-y-[17%] ss:space-y-[10%] space-y-10
        lg:pb-25
      `}
    >
      <div id="hero-container"
        className={`
          w-screen
          2xl:h-[74vh] xl:h-[68vh] lg:h-[62vh] md:h-[40vh] h-[35vh]
          px-[12%]
          text-(--color-quaternary)
          bg-transparent
        `}
      > <Hero /> </div>

      <ScrollReveal direction="up" delay={0.2}>
        <div id="about-container"
          className={`
            ${styles.sectionContainer}
            md:mt-25 lg:mt-0
          `}
        > <About /> </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.3}>
        <div id="projects-slider-container"
          className={`
            ${styles.sectionContainer}
            overflow-visible
          `}
        >
          <Suspense fallback={<SuspenseFallback />}>
            <ProjectsSlider />
          </Suspense>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.3}>
        <div id="career-timeline-container"
          className={`
            ${styles.sectionContainer}
            overflow-visible
          `}
        >
          <Suspense fallback={<SuspenseFallback />}>
            <CareerTimeline />
          </Suspense>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.4}>
        <div id="contact-container"
          className={`
            ${styles.sectionContainer}
          `}
        > <Contact /> </div>
      </ScrollReveal>
    </div>
    </PageTransition>
  );
};

export default Home;
