import { availableLanguages } from '../../assets/constants';
import { LangContext } from '../language';
import Dropdown from './Dropdown';
import { CSSProperties, useContext, useEffect, useState } from 'react';

const DropdownLang = () => {
    const [toggleLang, setToggleLang] = useState(false);
    const { currentLang, setCurrentLang } = useContext(LangContext);
    const [selectedLang, setSelectedLang] = useState(currentLang.toUpperCase());

    useEffect(() => {
        setCurrentLang(selectedLang.toLowerCase());
    }, [selectedLang]);

    const langItems = () => {
        return (
            availableLanguages
            .sort(function(country) { return country.symbol === selectedLang ? -1 : 1; })
            .map((lang) => (
                <li 
                    key={lang.symbol.toLowerCase()} 
                    className=
                    {`
                        cursor-pointer
                        hover:text-(--color-tertiary)
                        z-1
                        text-lg
                    `}
                    onClick={() => setSelectedLang(lang.symbol.toUpperCase())}
                >
                    {lang.symbol.toUpperCase()}
                </li>
            ))
        );
    }

    const dropdownAnimation: CSSProperties = {
        animation: `lang-dropdown-menu 0.5s 1 ${toggleLang ? 'forwards' : 'reverte'}`
    };

    return (
        <Dropdown items={langItems()} 
            animationStyle={dropdownAnimation} 
            menuState={[toggleLang, setToggleLang]}
            itemState={[selectedLang, setSelectedLang]}
            additionalButtonStyles={`
                text-lg
            `}
        />
    )
}

export default DropdownLang
