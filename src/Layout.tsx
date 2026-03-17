import styles from './style'
import { Footer, Navbar } from './components'
import { ReactNode, useContext, useEffect, useRef } from 'react'
import { RetexContext } from './components/retex'
import { ThemeContext } from './components/theme/ThemeEngine'

const Layout = ({children}: {children: ReactNode}) => {
    const { displayedRetexTitle } = useContext(RetexContext);
    const { currentTheme } = useContext(ThemeContext);
    const navbarContainer = useRef<HTMLDivElement>(null);
    const footerContainer = useRef<HTMLDivElement>(null);

    const isDark = currentTheme === 'dark';

    useEffect(() => {
        if (displayedRetexTitle != undefined) {
            navbarContainer.current?.classList.add("hidden");
            footerContainer.current?.classList.add("hidden");
        }
        else {
            navbarContainer.current?.classList.remove("hidden");
            footerContainer.current?.classList.remove("hidden");
        }
    }, [displayedRetexTitle]);

    return (
        <div id='app-container'
            className={`
                ${styles.page}
                ${styles.flexCol}
                relative
            `}
        >
            {isDark && (
                <div
                    className="
                        fixed inset-0
                        pointer-events-none
                        z-0
                        opacity-30
                        cyber-grid
                    "
                />
            )}

            <div id="navbar-container"
                ref={navbarContainer}
                className={`
                    z-(--z-fixed)
                    top-0
                    w-full
                    h-fit
                    min-h-15
                    bg-(--color-primary)
                `}
            > <Navbar /> </div>

            <div id='app-content-container'
                className={`
                    ${styles.flexCol}
                    ${styles.sizeFull}
                    bg-(--color-layout-bg)
                    relative
                    z-10
                    pb-20
                `}
                style={{
                    minHeight: "calc(100vh - 120px)",
                }}
            > {children} </div>

            <div id="footer-container"
                ref={footerContainer}
                className={`
                    z-(--z-sticky)
                    bottom-0
                    min-h-15
                    w-full
                    h-fit
                    ${styles.contentEndAll}
                `}
            > <Footer /> </div>
        </div>
    )
}

export default Layout
