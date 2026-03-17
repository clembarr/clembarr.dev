import { createContext, useState, ReactNode, useEffect } from "react";
import { getLocalLanguage } from "../../utils/utils";

interface LangContextType {
    currentLang: string;
    setCurrentLang: React.Dispatch<React.SetStateAction<string>>;
}

const LangContext = createContext<LangContextType>({
    currentLang: "",
    setCurrentLang: () => {},
});

const LangEngine = ({ children }: { children: ReactNode }) => {
    const [currentLang, setCurrentLang] = useState<string>(getLocalLanguage());

    useEffect(() => {
        document.documentElement.lang = currentLang;
        localStorage.setItem("lang", currentLang);
    }, [currentLang]);

    return (
        <LangContext.Provider value={{ currentLang, setCurrentLang }}>
            {children}
        </LangContext.Provider>
    )
}

export { LangEngine, LangContext };