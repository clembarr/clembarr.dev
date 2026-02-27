import { useContext, useEffect, useState } from 'react';
import { countries } from '../../assets/constants';
import Dropdown from './Dropdown';
import {PhoneCodeContext} from '../contact/ContactForm';

const DropdownPhone = () => {
    const { setPhoneCode } = useContext(PhoneCodeContext);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [selectedCode, setSelectedCode] = useState<string>('+33');

    useEffect(() => {
        setPhoneCode(selectedCode);
    }, [selectedCode]);

    const phoneCodes = () => {
        return (
            countries.sort((a, b) => a.phoneCode.localeCompare(b.phoneCode))
            .map((code) => (
                <li 
                    key={`code.id-${code.phoneCode}`} 
                    className=
                    {`
                        cursor-pointer
                        hover:text-(--color-tertiary)
                        z-1
                    `}
                    onClick={() => setSelectedCode(code.phoneCode)}
                >
                    {code.phoneCode}
                </li>
            ))
        );
    }

    return (
        <Dropdown animationStyle={{
                animation: `phone-dropdown-menu 0.5s 1 ${toggleMenu ? 'forwards' : 'reverte'}`
            }}
            items={phoneCodes()}
            itemState={[selectedCode, setSelectedCode]}
            menuState={[toggleMenu, setToggleMenu]}
            additionalMenuStyles="min-w-20 -left-3.5 top-1"
        />
            
    )
}

export default DropdownPhone
