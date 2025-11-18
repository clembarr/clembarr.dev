import { useContext, useEffect, useState } from "react";
import styles from "../../style"
import { ThemeContext } from "./ThemeEngine";

const SwitchButton = () => {
    const { setCurrentTheme } = useContext(ThemeContext);
    const [toggleSwitch, setToggleSwitch] = useState(localStorage.getItem("theme") === "dark");

    useEffect(() => {
        if (toggleSwitch) {
            setCurrentTheme("dark");
        } else {
            setCurrentTheme("light");
        }
    }, [toggleSwitch]);

  return (
    <label id="switch-container"
        className=
        {`
            ${styles.sizeFit}
            ${styles.flexRow}
            ${styles.contentCenter}
            z-10
            relative 
            cursor-pointer
        `}
    >
        <input id="switch" 
            type="checkbox" 
            className="peer sr-only" 
            checked={toggleSwitch}
            onChange={() => setToggleSwitch(!toggleSwitch)}
        />

        <div id="switch-ruler"
            className=
            {`
                peer 
                2xl:h-[14px] xl:h-[12px] lg:h-3 md:h-[14px] h-[14px]
                2xl:w-[45px] xl:w-[40px] lg:w-8 md:w-[40px] sm:w-[40px] w-[38px]
                rounded-full 
                bg-(--color-quaternary)

                after:absolute 
                lg:after:left-0 after:-left-1
                2xl:after:-bottom-[5px] xl:after:-bottom-[6px] lg:after:-bottom-[4px] md:after:-bottom-1 after:-bottom-[5px]
                2xl:after:h-[23px] xl:after:h-[22px] lg:after:h-[20px] md:after:h-5 sm:after:h-[24px] after:h-[24px]
                2xl:after:w-[23px] xl:after:w-[22px] lg:after:w-[20px] md:after:w-5 sm:after:w-[24px] after:w-[24px]
                after:rounded-full 
                after:bg-(--color-quaternary)
                after:transition-all 
                after:content-['']

                peer-checked:bg-(--color-quaternary)
                peer-checked:after:translate-x-full 
                peer-focus:ring-(--color-quaternary)
            `}
        />
    </label>
  )
}

export default SwitchButton
