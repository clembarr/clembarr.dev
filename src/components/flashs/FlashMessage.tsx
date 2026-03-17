import { useContext } from "react";
import { flashMessages } from "../../assets/constants"
import styles from "../../style"
import { LangContext } from "../language";

type FlashMessageProps = {
    context: string;
}

const FlashMessage = ({context}: FlashMessageProps) => {
    const { currentLang } = useContext(LangContext);
    const flash = flashMessages.find((message) => message.context === context);
    if(!flash) return null;
    
    return (
        <div id="flash-container"
            className=
            {`
                color-scheme-primary
                fixed
                bottom-0
                left-[2%]
                ${styles.sizeFit}
                ${styles.flexRow}
                ${styles.contentCenter}
                space-x-[5%]
                mb-[2%]
                rounded-md
                shadow-lg
                border-2
                z-80
                px-[4%]
                py-[0.5%]
                overflow-hidden
                transition-all
                scale-105
                duration-500
                ease-in-out
            `}
        >
            <a id="flash-!-icon"
                className=
                {`
                    text-2xl
                    font-secondary-semibold
                    text-(--color-tertiary)
                `}
            >
                !
            </a>

            <p id="flash-message"
                className=
                {`
                    text-nowrap
                `}
            >
                {flash.content[currentLang]}
            </p>

            <button id="close-flash"
                className=
                {`
                    m-0
                    p-0
                    cursor-pointer
                `}
                onClick={() => document.getElementById("flash-container")!.style.display = "none"}
            > 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 self-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

        </div>
    )
}

export default FlashMessage
