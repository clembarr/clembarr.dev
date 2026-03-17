import { useContext, useEffect, useRef, useState } from "react";
import { navLinks } from "../assets/constants";
import DropdownLang from "./dropdowns/DropdownLang";
import SwitchButton from "./theme/SwitchButton";
import styles from "../style";
import { getCurrentNavigation, getLinkFromTypedLink } from "../utils/utils";
import { Link } from "react-router";
import { LangContext } from "./language";
import { menuIcons } from "../assets";
import { ThemeContext } from "./theme/ThemeEngine";

/**
 * @component Navbar
 * @description Navigation bar rendered from the navLinks constants. Highlights the
 * active route, hides/shows on scroll, and collapses into a burger menu on mobile.
 */
const Navbar = () => {
  // true if the burger menu is closed, false if open.
  const [toggleBurger, setToggleBurger] = useState(true);
  // Current navigation link, used to colorize the active label in the navbar.
  const [currentNavigation, setCurrentNavigation] = useState(getCurrentNavigation());
  const [scrollData, setScrollData] = useState({current: 0, last: 0});
  const navbar = useRef<HTMLDivElement>(null);
  const { currentLang } = useContext(LangContext);
  const { currentTheme } = useContext(ThemeContext);

  const handleScroll = () => {
    setScrollData(prev => {return {current: window.scrollY, last: prev.current}});
  }

  // Update the active nav label when the route or hash changes.
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

  const isDark = currentTheme === 'dark';

  return (
    <nav id="navbar"
      ref={navbar}
      className={`
        fixed
        top-0
        w-screen
        items-center
        px-[5%]
        2xl:py-1.5 xl:py-2 lg:py-2.5 md:py-1 py-2
        ${styles.flexRow}
        ${styles.contentStartX}
        bg-(--color-navbar-bg)/95
        backdrop-blur-md
        2xl:text-sm xl:text-base text-base
        transition-all
        duration-300
        ease-out
        z-(--z-fixed)
        ${isDark ? 'shadow-[0_1px_20px_rgba(0,0,0,0.3)]' : 'shadow-[0_1px_8px_rgba(0,0,0,0.1)]'}
      `}
    >
      <ul id="navbar-items"
        className="
          space-x-8
          list-none
          lg:flex hidden
          items-center"
      >
        {(navLinks.find(
          (nav) => nav.route.includes(window.location.pathname.split('/')[1])
        ) ?? navLinks.find((nav) => nav.route === '')!).links.map((nav, index) => {
          const thisNav = nav.content[currentLang] ? nav.content[currentLang] : nav.content[0];
          const isActive = getLinkFromTypedLink(nav.link, currentLang).toLowerCase() === currentNavigation;
          return (
            <li key={`navlink-${index}`}
              className={`
                font-secondary-regular
                tracking-wider
                cursor-pointer
                relative
                py-1
                transition-all
                duration-300
                ease-out
                text-nowrap
                ${isActive
                  ? `text-(--color-tertiary) ${isDark ? 'drop-shadow-[0_0_8px_rgba(124,255,196,0.5)]' : ''}`
                  : 'text-(--color-quaternary) hover:text-(--color-tertiary)'
                }
              `}
            >
              {getLinkFromTypedLink(nav.link, currentLang).includes('#') ?
                <a id={`page-navigation-link-${getLinkFromTypedLink(nav.link, currentLang)}`}
                  href={getLinkFromTypedLink(nav.link, currentLang).toLowerCase()}
                  onClick={() => setCurrentNavigation(getLinkFromTypedLink(nav.link, currentLang).toLowerCase())}
                > {thisNav} </a>
              : nav.context === "1" ?
                <a id={`external-link-${getLinkFromTypedLink(nav.link, currentLang)}`}
                  href={getLinkFromTypedLink(nav.link, currentLang)}
                  target="_blank"
                  rel="noopener noreferrer"
                > {thisNav} </a>
              :
                <Link id={`page-link-${getLinkFromTypedLink(nav.link, currentLang)}`}
                  to={getLinkFromTypedLink(nav.link, currentLang)}
                  onClick={() => setCurrentNavigation(getLinkFromTypedLink(nav.link, currentLang).toLowerCase())}
                > {thisNav} </Link>
              }
            </li>
          )
        })}
      </ul>

      <div id="navbar-options"
        className={`
          ${styles.sizeFull}
          ${styles.flexRow}
          justify-start items-center lg:justify-end
          font-primary-regular
          space-x-4
        `}
      >

        <SwitchButton />

        <DropdownLang />

      </div>

      <div id="burger-container"
        className={`
          ${styles.sizeFull}
          md:min-h-15 min-h-9
          ${styles.contentEndX}
          flex flex-row lg:hidden
          relative
          mr-[3%]
        `}
      >
        <button id="burger"
          className={`
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
            className={`
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
          className={`
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
          <ul className={`
              list-none
              absolute
              -top-5
              -right-5
              px-5
              pt-12
              pb-4
              space-y-3
              rounded-xl
              bg-(--color-surface)
              border border-(--color-border)
              ${isDark ? 'shadow-[0_8px_30px_rgba(0,0,0,0.4)]' : 'shadow-lg'}
              backdrop-blur-lg
            `}
          >
            {navLinks.find(
              (nav) => nav.route.includes(window.location.pathname.split('/')[1])
            )?.links.map((nav, index) => {
              const thisNav = nav.content[currentLang] ? nav.content[currentLang] : nav.content[0];
              const isActive = getLinkFromTypedLink(nav.link, currentLang).toLowerCase() === currentNavigation;
              return (
                <li key={`navlink-${index}`}
                  className={`
                    font-secondary-regular
                    tracking-wider
                    cursor-pointer
                    px-3 py-1.5
                    rounded-lg
                    transition-all
                    duration-300
                    ease-(--ease-out)
                    text-nowrap
                    ${isActive
                      ? `text-(--color-tertiary) bg-(--color-tertiary)/10 ${isDark ? 'shadow-(--glow-sm)' : ''}`
                      : 'text-(--color-quaternary) hover:text-(--color-tertiary) hover:bg-(--color-tertiary)/5'
                    }
                  `}
                >
                  {getLinkFromTypedLink(nav.link, currentLang).includes('#') ?
                    <a href={getLinkFromTypedLink(nav.link, currentLang)}
                      onClick={() => setCurrentNavigation(getLinkFromTypedLink(nav.link, currentLang).toLowerCase())}
                    > {thisNav} </a>
                  : nav.context === "1" ?
                    <a href={getLinkFromTypedLink(nav.link, currentLang)}
                      target="_blank"
                      rel="noopener noreferrer"
                    > {thisNav} </a>
                  :
                    <Link to={getLinkFromTypedLink(nav.link, currentLang)}
                      onClick={() => setCurrentNavigation(getLinkFromTypedLink(nav.link, currentLang).toLowerCase())}
                    > {thisNav} </Link>
                  }
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  ) 
}

export default Navbar
