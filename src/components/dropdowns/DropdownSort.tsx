import { useContext, useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import styles from '../../style';
import { SearchContext } from '../search';
import { placeholderMessages } from '../../assets/constants';
import { LangContext } from '../language';
import { FilterOption } from '../../assets/dataTypes';
import { getActiveBreakpoint } from '../../utils/utils';
import { UNIVERSAL_LANG } from '../../utils/assetsUtils';

type DropdownSortProps = {
    alreadyDisplayedItems?: string[];
    options: FilterOption[];
}

const DropdownSort = ({alreadyDisplayedItems, options}: DropdownSortProps) => {
    const { toMatch, updateSearch, setSearchInput } = useContext(SearchContext);
    const { currentLang } = useContext(LangContext);
    const [toggleMenu, setToggleMenu] = useState(false);
    const dropdownPlaceholder = (
        getActiveBreakpoint('number') as number < 2 ? "Filters"
        : placeholderMessages.find((message) => message.context === 'dropdownSort')!.content[currentLang]
    );
    const [selectedItem, setSelectedItem] = useState<FilterOption>();
    const [placeholder, setPlaceholder] = useState(dropdownPlaceholder);

    useEffect(() => {
        if (selectedItem !== undefined) {
            setSearchInput("");
            updateSearch([selectedItem.context.valueOf().toUpperCase()])
        }
    }, [selectedItem, dropdownPlaceholder, currentLang])

    useEffect(() => {
        if (!(selectedItem?.abreviation && toMatch.includes(selectedItem.context.valueOf().toUpperCase()))
            && !(selectedItem?.content && toMatch.includes(selectedItem.context.valueOf().toUpperCase()))
        ) {
            setSelectedItem(undefined);
            setPlaceholder(dropdownPlaceholder)
        }
    }, [toMatch, currentLang])

    const displayedSortOptions = () => (
        options.filter((option) => !alreadyDisplayedItems?.includes(option.context))
        .map((option) => {
            return (
                <li key={`option-${option.context}-item`} 
                    className=
                    {`
                        cursor-pointer
                        text-nowrap
                        ${styles.hyperlink}
                        z-1
                    `}
                    onClick={() => {
                        setSelectedItem(option); 
                        setPlaceholder(
                            option.abreviation ? (option.abreviation.content[currentLang] || option.abreviation.content[UNIVERSAL_LANG]) 
                            : (option.content[currentLang] || option.content[UNIVERSAL_LANG])
                        );
                    }}
                > { option.content[currentLang] } </li>
            )
        }  
    ))

    return (
        <Dropdown items={displayedSortOptions()}
            itemState={[placeholder.toUpperCase(), (x) => {setPlaceholder((x === dropdownPlaceholder ? x : x.toUpperCase()))}]}
            menuState={[toggleMenu, setToggleMenu]}
            animationStyle=
            {{
                animation: `fade-in 0.2s 1 ${toggleMenu ? 'forwards' : 'reverte'}`,
                fontSize: '90%',
                left: '-13  %',
            }}
            additionalStyles=
            {`
                font-primary-regular 
                md:text-md text-sm
                text-nowrap
                ${styles.contentEndX}
            `}
            additionalButtonStyles=
            {`
                ${placeholder === dropdownPlaceholder ? "" : "text-(--color-tertiary)"}
            `}
        />
    )
}

export default DropdownSort
