import styles from "../style";
import { Hero, About, ProjectsSlider, Contact } from "../components/sections";

const Home = () => {
  return (
    <div id='home-container' 
      className=
      {`
        ${styles.page}
        ${styles.flexCol}
        2xl:space-y-[10%] xl:space-y-[18%] lg:space-y-[18%] hxs:space-y-20 space-y-2
        lg:pb-[100px]
      `}
    >
      <div id="hero-container"
        className=
        {`
          w-screen
          2xl:h-[75vh] lg:h-[62vh] md:h-[40vh] h-[35vh]
          px-[12%]
          text-(--color-quaternary)
          bg-transparent
        `}
      > <Hero /> </div>

      <div id="about-container"
        className=
        {`
          ${styles.sectionContainer}
        `}
      > <About /> </div>

      {/* <div id="skills-container"
        className=
        {`
          ${styles.sectionContainer}
        `}
      > <Skills /> </div> */}

      <div id="projects-slider-container"
        className=
        {`
          ${styles.sectionContainer}
          overflow-visible
        `}
      > <ProjectsSlider /> </div>

      <div id="contact-container"
        className=
        {`
          ${styles.sectionContainer}
        `}
      > <Contact /> </div>
    </div>
  );
};

export default Home;
