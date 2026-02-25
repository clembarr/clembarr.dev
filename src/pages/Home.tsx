import { lazy, Suspense } from 'react';
import styles from "../style";
import { Hero, About, Contact } from "../components/sections";
import { ScrollReveal, PageTransition } from "../components/animations";

const ProjectsSlider = lazy(() => import("../components/sections/ProjectsSlider"));

const Home = () => {
  return (
    <PageTransition>
      
    <div id='home-container' 
      className=
      {`
        ${styles.page}
        ${styles.flexCol}
        2xl:space-y-[10%] xl:space-y-[18%] lg:space-y-[18%] hxs:space-y-20 space-y-2
        lg:pb-25
      `}
    >
      <div id="hero-container"
        className=
        {`
          w-screen
          2xl:h-[74vh] lg:h-[62vh] md:h-[40vh] h-[35vh]
          px-[12%]
          text-(--color-quaternary)
          bg-transparent
        `}
      > <Hero /> </div>

      <ScrollReveal direction="up" delay={0.2}>
        <div id="about-container"
          className=
          {`
            ${styles.sectionContainer}
          `}
        > <About /> </div>
      </ScrollReveal>

      {/* <div id="skills-container"
        className=
        {`
          ${styles.sectionContainer}
        `}
      > <Skills /> </div> */}

      <ScrollReveal direction="up" delay={0.3}>
        <div id="projects-slider-container"
          className=
          {`
            ${styles.sectionContainer}
            overflow-visible
          `}
        >
          <Suspense fallback={
            <div className="w-full h-[500px] flex items-center justify-center">
              <div className="text-(--color-tertiary) text-xl">Loading 3D experience...</div>
            </div>
          }>
            <ProjectsSlider />
          </Suspense>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="up" delay={0.4}>
        <div id="contact-container"
          className=
          {`
            ${styles.sectionContainer}
          `}
        > <Contact /> </div>
      </ScrollReveal>
    </div>
    </PageTransition>
  );
};

export default Home;
