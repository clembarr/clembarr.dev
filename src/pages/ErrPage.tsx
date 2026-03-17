import styles from "../style"
import { errorMessages, placeholderMessages } from "../assets/constants"
import DOMPurify from "dompurify"
import { Errors } from "../assets/dataTypes"
import { useContext } from "react"
import { LangContext } from "../components/language"
import { Link } from "react-router"

type ErrPageProps = {
  error: Errors;
}

/**
 * @component ErrPage
 * @description Generic error page displaying the error code, a localised message
 * from `errorMessages`, and a back-to-home button. Reusable for any error declared
 * in the `Errors` enum.
 * @param error - The error code to display and look up in `errorMessages`.
 */
const ErrPage = ({ error }: ErrPageProps) => {
  const { currentLang } = useContext(LangContext)

  return (
    <section id={`err${error}-container`}
      className={`
        ${styles.sizeScreen}
        ${styles.flexCol}
        ${styles.contentStartX}
        mt-60
      `}
    >
        <h1 id={`err${error}-title`}
          className={`
            ${styles.contentCenter}
            lg:text-[200%]
            rounded-md
            px-[2%]
            py-[1%]
            font-black
          `}
        >Error {error}</h1>

        <p id={`err${error}-message`}
          className={`
            ${styles.sizeFit}
            ${styles.contentCenter}
          `}
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
            errorMessages.find((message) => message.error === error)!.content[currentLang]
          )}}
        />

        <Link id='home-button'
          className={`
            mt-[2%]
            text-2xs
            rounded-lg
            border-2
            border-(--color-tertiary)
            hover:bg-(--color-secondary)
            hover:scale-105
            ${styles.defaultTransition}
            px-4
            py-2
          `}
          to='/'
        > {placeholderMessages.find((message) => message.context === "ErrorPageBackButton")!.content[currentLang]} </Link>

    </section>
  )
}

export default ErrPage
