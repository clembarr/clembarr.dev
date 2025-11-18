import { useContext, useEffect, useRef, useState } from "react";
import { navLinks } from "../assets/constants";
import DropdownLang from "./dropdowns/DropdownLang";
import SwitchButton from "./theme/SwitchButton";
import styles from "../style";
import { getActiveBreakpoint, getCurrentNavigation } from "../utils";
import { Link } from "react-router";
import { LangContext } from "./language";
import { menuIcons } from "../assets";
import { ThemeContext } from "./theme/ThemeEngine";

/**
* @description This component renders the navigation bar of the website, from the info in the constants file.
*/
const Navbar = () => {
  /**@constant toggleBurger true if the burger menu is clicked, else false.*/
  const [toggleBurger, setToggleBurger] = useState(true);
  /**@constant currentNavigation the current navigation, used to colorize the related label in the navbar. */
  const [currentNavigation, setCurrentNavigation] = useState(getCurrentNavigation());
  const [scrollData, setScrollData] = useState({current: 0, last: 0});
  const navbar = useRef<HTMLDivElement>(null);
  const { currentLang } = useContext(LangContext);
  const { currentTheme } = useContext(ThemeContext);

  const handleScroll = () => {
    setScrollData(prev => {return {current: window.scrollY, last: prev.current}});
  }

  /** If rather the currently used langage or the current navigation link changed, actualize
   * the current navigation label in the navbar.*/
  useEffect(() => {
    setCurrentNavigation(getCurrentNavigation());

  }, [window.location.pathname, window.location.hash]);

  useEffect(() => {
    window.addEventListener('touchstart', (e) => {
        if (!(e.target as HTMLElement).closest('#burger-container')) {
            setToggleBurger(true);
        }
    });

    window.addEventListener('scroll', () => {
      handleScroll();
    });

    return () => {
      window.removeEventListener('scroll', () => handleScroll());
      window.removeEventListener('keydown', () => {});
      window.removeEventListener('touchstart', () => {});
    }
  }, []);

  useEffect(() => {
    if (!navbar.current) return;
    if (scrollData.current > scrollData.last
      && scrollData.current > navbar.current.clientHeight
      || scrollData.current - scrollData.last > 40
    ) {
      navbar.current.style.transform = "translateY(-100%)";

    } else if (scrollData.current < scrollData.last
      && scrollData.current > navbar.current.clientHeight
      || scrollData.last - scrollData.current > 30
    ) {
      navbar.current.style.transform = "translateY(0)";
    }
  }, [scrollData]);

  return (
    <nav id="navbar"
      ref={navbar}
      className=
      {`
        fixed
        top-0
        w-screen
        items-center
        px-[5%]
        xl:py-[1%] lg:py-[1%] py-1
        ${styles.flexRow}
        ${styles.contentStartX}
        bg-(--color-secondary)
        2xl:text-lg  xl:text-md  text-base
        transition-transform
        duration-300
        ease-in-out
      `}
    >
      <ul id="navbar-items"
        className="
          space-x-10
          list-none 
          lg:flex hidden"
      >
        {/**Map the navigation links from the data file according to the current URL.*/
        navLinks.find(
          (nav) => nav.route.includes(window.location.pathname.split('/')[1])
        )?.links.map((nav, index) => {
          let thisNav = nav.content[currentLang] ? nav.content[currentLang] : nav.content[0];
          return (
            <>
              <li key={`navlink-${index}`}
                className=
                {`
                    font-secondary-regular
                    tracking-widest
                    cursor-pointer
                    hover:text-(--color-tertiary)
                    transition-all
                    duration-300
                    ease-in-out
                    text-nowrap
                    ${(nav.link).toLowerCase() === currentNavigation ? 'text-(--color-tertiary)' : ""}
                `}
              >
                {/** If the navigation link is an anchor on the page, it become an <a>. Else if it
                 * is supposed to redirect on another page, it become a React <Link>. */
                nav.link.includes('#') ?
                  <a href={nav.link}
                    onClick={() => setCurrentNavigation((nav.link).toLowerCase())}
                  > {thisNav} </a>
                  :
                  <Link to={nav.link}
                    onClick={() => setCurrentNavigation((nav.link).toLowerCase())}
                  > {thisNav} </Link>
                }
              </li>
            </>
          )
        })}
      </ul>

      <div id="navbar-options"
        className=
        {`
          ${styles.sizeFull}
          ${styles.flexRow}
          ${getActiveBreakpoint('number') as number < 3 ? styles.contentStartX : styles.contentEndX}
          font-primary-regular
          lg:space-x-[3%] space-x-[10%] 
        `}
      >

        <SwitchButton />

        <DropdownLang />

      </div>

      <div id="burger-container"
        className=
        {`
          ${styles.sizeFull}
          min-h-[60px]
          ${styles.contentEndX}
          ${getActiveBreakpoint('number') as number < 3 ?
            `${styles.flexRow}` : `hidden`
          }
          relative
          mr-[3%]
        `}
      >
        <button id="burger"
          className=
          {`
            ${styles.sizeFull}
            ${styles.flexRow}
            ${styles.contentEndX}
            absolute
            top-0
            -right-${toggleBurger ? "5" : "5"}
            transition-all
            duration-300
            ease-in-out
            lg:pr-0 md:pr-[5%] pr-[8%]
          `}
          style={{
            zIndex: 1000,
          }}
          onClick={() => setToggleBurger(!toggleBurger)}
        >
          <img src={toggleBurger ? menuIcons.burger_menu_icon.content[currentTheme]
              : menuIcons.close_menu_icon.content[currentTheme]} 
            alt={toggleBurger ? menuIcons.burger_menu_icon.alt
              : menuIcons.close_menu_icon.alt}
            className=
            {`
              object-cover
              object-center
              ${toggleBurger ? 
                "sm:w-[26px] w-[24px]" 
                : "sm:w-[24px] w-[22px]"
              } 
              transition-all
              duration-300
              ease-in-out
            `}
          />
        </button>

        <div id="burger-menu"
          className=
          {`
            ${toggleBurger ? 'hidden' : 'flex'}
            ${styles.sizeFull}
            ${styles.flexCol}
            ${styles.contentEndY}
            lg:hidden
            relative
            transition-all
            duration-300
            ease-in-out
          `}
          style={{
            zIndex: 999,
            animation: 'burger-menu-apparition 0.5s ease-in-out'
          }}
        >
          <ul className=
            {`
              list-none
              absolute
              color-scheme-secondary
              -top-5
              -right-5
              px-[20px]
              pt-[45px]
              pb-[15px]
              space-y-[10%]
              shadow-md
              rounded-md
            `}
          >
            {/**Map the navigation links from the data file according to the current URL.*/
            navLinks.find(
              (nav) => nav.route.includes(window.location.pathname.split('/')[1])
            )?.links.map((nav, index) => {
              let thisNav = nav.content[currentLang] ? nav.content[currentLang] : nav.content[0];
              return (
                <>
                  <li key={`navlink-${index}`}
                    className=
                    {`
                        font-secondary-regular
                        tracking-widest
                        cursor-pointer
                        hover:text-(--color-tertiary)
                        transition-all
                        duration-300
                        ease-in-out
                        text-nowrap
                        ${(nav.link).toLowerCase() === currentNavigation ? 'text-(--color-tertiary)' : ""}
                    `}
                  >
                    {/** If the navigation link is an anchor on the page, it become an <a>. Else if it
                     * is supposed to redirect on another page, it become a React <Link>. */
                    nav.link.includes('#') ?
                      <a href={nav.link}
                        onClick={() => setCurrentNavigation((nav.link).toLowerCase())}
                      > {thisNav} </a>
                      :
                      <Link to={nav.link}
                        onClick={() => setCurrentNavigation((nav.link).toLowerCase())}
                      > {thisNav} </Link>
                    }
                  </li>
                </>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  ) 
}

export default Navbar
