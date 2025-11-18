import styles from '../../style'
import { ContactForm, SubmitEngine } from '../contact'
import { SocialMedia } from '../../assets/dataTypes'
import { socialMedia } from '../../assets/constants'
import { getActiveBreakpoint } from '../../utils'
import { ThemeContext } from '../theme/ThemeEngine'
import { useContext } from 'react'

const Contact = () => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <section id="contact"
      className=
      {`
        ${styles.sizeFull}
        ${getActiveBreakpoint('number') as number <= 1 ?
          `${styles.flexCol}` : `${styles.flexRow}`
        }
        ${styles.contentCenter}
        xl:space-x-[200px] lg:space-x-[150px] 
      `}
    >
        <div id='form-container'
            className=
            {`
              ${getActiveBreakpoint('number') as number <= 1 ?
                `hidden` : `${styles.flexRow}`
              }
              w-2/5
              h-full
              ${styles.contentCenter}
              overflow-hidden
            `}
        >
          <SubmitEngine>
            <ContactForm />
          </SubmitEngine>
        </div>

        <div id='contact-info'
            className=
            {`
              w-fit
              h-full
              ${styles.flexCol}
              ${styles.contentCenter}
              lg:space-y-[35%] md:space-y-[50%] base:space-y-[15%]
            `}
        >
          {socialMedia.map((social: SocialMedia) => (
            <div key={`icon-${social.label}-container`}
              className=
              {`
                ${getActiveBreakpoint('number') as number <= 1 ?
                  `${styles.flexRow}` : `${styles.flexCol}`
                }
                ${styles.contentStartAll}
                w-full
                h-fit
                md:space-y-[1%] base:space-y-[3%]
                md:color-scheme-primary base:color-scheme-secondary
                md:rounded-none base:rounded-lg
                md:p-0 base:py-[3%] base:px-[5%]
                md:shadow-none base:shadow-md
              `}
            >
              <a href={social.link}
                className=
                {`
                  ${styles.flexRow}
                  ${styles.contentStartX}
                `}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img src={social.icon.content[currentTheme]} 
                    alt={social.icon.alt}
                    className=
                    {`
                      object-cover
                      aspect-square
                      md:w-[120%] base:w-[100%]
                    `}
                />
              </a>
              <hr className=
                  {`
                    ${styles.line}
                    w-[20%]
                    h-[2.5px]
                  `}
              />

              <div className=
                  {`
                    ${getActiveBreakpoint('number') as number <= 1 ?
                      `${styles.flexCol}` : `hidden`
                    }
                    ${styles.contentStartX}
                    ${styles.debugBorders}
                  `}
              >
                <label className=
                  {`
                    md:text-base base:text-xs
                    w-full
                    ${styles.contentStartX}
                  `}
                >{social.at}</label>
              </div>

              <label className=
                  {`
                    md:visible base:hidden
                    md:text-base base:text-xs
                    w-full
                    ${styles.contentStartX}
                  `}
              >{social.at}</label>
            </div>
          ))}
        </div>

        <div id='form-container'
            className=
            {`
              md:hidden ${styles.flexCol}
              w-full
              h-full
              ${styles.contentCenter}
              overflow-hidden
            `}
        >
          <ContactForm />
        </div>
    </section>
  )
}

export default Contact
