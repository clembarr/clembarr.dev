import styles from "../style"
import { errorMessages, placeholderMessages } from "../assets/constants"
import DOMPurify from "dompurify"
import { Errors } from "../assets/dataTypes"
import { useContext } from "react"
import { LangContext } from "../components/language"
import { Link } from "react-router"

const Err404 = () => {
  const { currentLang } = useContext(LangContext)

  return (
    <section id='err404-container'
      className=
      {`
        ${styles.sizeScreen}
        ${styles.flexCol}
        ${styles.contentCenter}
      `}
    >
        <h1 id='err404-title'
          className=
          {`
            ${styles.contentCenter}
            lg:text-[200%]
            rounded-md
            px-[2%]
            py-[1%]
          `}
        >Error {Errors.NOT_FOUND}</h1>

        <p id='err404-message'
          className=
          {`
            ${styles.sizeFit}
            ${styles.contentCenter}
          `}
          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
            errorMessages.find((message)=>message.error === Errors.NOT_FOUND)!.content[currentLang]
          )}}
        />

        <Link id='home-button'
          className=
          {`
            mt-[2%]
            text-[80%]
            rounded-lg
            border-2
            hover:bg-(--light-color-secondary)
            px-[1%]
            py-[0.5%]
          `}
          to='/'
        > {placeholderMessages.find((message) => message.context === "ErrorPageBackButton")!.content[currentLang]} </Link>

    </section>
  )
}

export default Err404
