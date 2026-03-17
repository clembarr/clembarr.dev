import { createContext, useState, ReactNode, useEffect } from "react";
import { getLocalTheme } from "../../utils/utils";

interface ThemeContextType {
    currentTheme: string;
    setCurrentTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType>({
    currentTheme: "",
    setCurrentTheme: () => {},
});

const ThemeEngine = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<string>(getLocalTheme());

    useEffect(() => {
        if (currentTheme === "dark") {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
            localStorage.setItem("theme", "light");
        }
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeEngine, ThemeContext };
