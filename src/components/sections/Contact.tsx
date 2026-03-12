import styles from '../../style'
import { ContactForm, SubmitEngine } from '../contact'
import { SocialMedia } from '../../assets/dataTypes'
import { socialMedia } from '../../assets/constants'
import { ThemeContext } from '../theme/ThemeEngine'
import { useContext } from 'react'

/**
 * @component Contact
 * @description Contact section. On desktop, shows the contact form on the left and
 * social media links in the centre. On mobile, the layout stacks vertically with
 * the form rendered below the social links (outside SubmitEngine to avoid context
 * duplication — only the desktop form uses SubmitEngine).
 */
const Contact = () => {
  const { currentTheme } = useContext(ThemeContext);

  return (
    <section id="contact"
      className={`
        ${styles.sizeFull}
        ${styles.flexColToRowAtMd}
        ${styles.contentCenter}
        2xl:space-x-40 xl:space-x-30 lg:space-x-15 md:space-x-10
      `}
    >
        <div id='form-container-desktop'
            className={`
              ${styles.flexRowHideAtMd}
              w-2/5
              h-full
              ${styles.contentCenter}
              overflow-hidden
              xl:min-w-0 lg:min-w-1/2 md:min-w-2/3
              2xl:max-w-180
            `}
        >
          <SubmitEngine>
            <ContactForm />
          </SubmitEngine>
        </div>

        <div id='contact-info'
            className={`
              w-fit
              h-full
              ${styles.flexCol}
              ${styles.contentCenter}
              space-y-[8%] md:space-y-[20%] lg:space-y-[25%]
              order-last md:order-none
              mt-10 md:mt-0
              xl:max-w-full lg:max-w-1/3
              lg:ml-10 xl:ml-0
            `}
        >
          {socialMedia.map((social: SocialMedia) => (
            <div key={`icon-${social.label}-container`}
              className={`
                ${styles.flexCol}
                ${styles.contentStartAll}
                w-full
                h-fit
                space-y-0 md:space-y-[1%]
                md:color-scheme-primary
                py-[3%] px-[5%] md:p-0
              `}
            >
              <a href={social.link}
                className={`
                  ${styles.flexCol}
                  ${styles.contentStartX}
                `}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={social.icon.content[currentTheme]}
                    alt={social.icon.alt}
                    className={`
                      object-cover
                      aspect-square
                      w-full md:w-[120%]
                    `}
                />
                <hr className={`
                    md:hidden block
                    ${styles.line}
                    w-[80%]
                    h-[2.5px]
                    mt-1
                  `}
                />
              </a>
              <hr className={`
                  hidden md:block
                  ${styles.line}
                  w-[20%]
                  h-[2.5px]
                `}
              />

              <div className={`
                  ${styles.flexColHideAtMd}
                  ${styles.contentStartX}
                  md:mt-0 mt-1
                `}
              >
                <label className={`
                  text-xs sm:text-base
                  w-full
                  ${styles.contentStartX}
                `}
                >{social.at}</label>
              </div>

              <label className={`
                  hidden md:block
                  md:text-base text-xs
                  w-full
                  ${styles.contentStartX}
                `}
              >{social.at}</label>
            </div>
          ))}
        </div>

        <div id='form-container-mobile'
            className={`
              md:hidden ${styles.flexCol}
              w-full
              h-full
              ${styles.contentCenter}
              overflow-hidden
              order-first md:order-none
            `}
        >
          <ContactForm />
        </div>
    </section>
  )
}

export default Contact
