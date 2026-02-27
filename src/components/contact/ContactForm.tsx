import { useState, createContext, FormEvent, useContext } from 'react';
import { contactForm } from '../../assets/constants';
import styles from '../../style'
import DropdownPhone from '../dropdowns/DropdownPhone'
import DOMPurify from 'dompurify';
import emailjs from '@emailjs/browser'
import { LangContext } from '../language';
import { SubmitContext } from './SubmitEngine';

interface PhoneCodeContextType {
  phoneCode: string;
  setPhoneCode: React.Dispatch<React.SetStateAction<string>>;
}

const PhoneCodeContext = createContext<PhoneCodeContextType>({
  phoneCode: '',
  setPhoneCode: () => {},
});

const ContactForm = () => {
  const { currentLang } = useContext(LangContext);
  const { tentativesCount, setTentiativesCount, canSubmit } = useContext(SubmitContext)
  const emailPattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phonePattern: RegExp = /^\+[0-9]{1,4}\s[0-9]{6,14}$/;
  const [formFistName, setFormFirstName] = useState<string>('');
  const [formLastName, setFormLastName] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const [formPhone, setFormPhone] = useState<string>('');
  const [phoneCode, setPhoneCode] = useState<string>('');
  const [formMessage, setFormMessage] = useState<string>('');


  const verifyForm = () => {
    if (!formFistName || !formLastName) {
      alert(contactForm.alert.find(alert => alert.context === "names")!.content[currentLang]);
      return false;
    }
    
    if (!formPhone || formPhone === '' || formPhone === ' ') {
      setFormPhone('');
    } 
    else if (!phonePattern.test(phoneCode+' '+formPhone)) {
      alert(contactForm.alert.find(alert => alert.context === "phone")!.content[currentLang]);
      return false;
    }

    if (!emailPattern.test(formEmail)) {
      alert(contactForm.alert.find(alert => alert.context === "email")!.content[currentLang]);
      return false;
    }

    if (contactForm.messageMinLength && formMessage.length < contactForm.messageMinLength) {
      alert(contactForm.alert.find(alert => alert.context === "message")!.content[currentLang]);
      return false;
    }

    return true;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!verifyForm()) return;
    if (!contactForm.emailAPI) return;
    if (!canSubmit) return;

    setTentiativesCount(tentativesCount + 1);

    emailjs
      .send(contactForm.emailAPI!.serviceId,
        contactForm.emailAPI!.templateId,
        {
          from_firstname: formFistName,
          from_lastname: formLastName,
          from_email: formEmail,
          from_phone: formPhone ? `${phoneCode} ${formPhone}` : '',
          message: formMessage
        },
        contactForm.emailAPI!.publicKey
      ).then(() => {
          alert(contactForm.alert.find(alert => alert.context === "apiOK")!.content[currentLang]);
        },
        (error) => {
          alert(contactForm.alert.find(alert => alert.context === "apiError")!.content[currentLang]);
          console.error('Form submission error: ', error);
        },
      );
  };

  return (
    <form id='contact-contactForm'
      onSubmit={(e) => handleSubmit(e)}
      className=
      {`
        ${styles.sizeFull}
        md:max-h-[75%] 
        lg:max-w-125
        ${styles.flexCol}
        ${styles.contentCenter}
        font-primary-regular
        color-scheme-secondary
        px-[10%]
        pt-[10%]
        pb-[8%]
        space-y-[5%]
        shadow-lg
        border-2
      `}
    >
      <h2 className=
        {`
          w-full
          h-1/5
          ${styles.contentStartAll}
          font-primary-bold
          base:text-base
          ${styles.heading2}
          tracking-wider
          
          xl:mb-[10%] base:mb-[8%]
        `}
        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(contactForm.title[currentLang])}}
      />
        
      <div className=
        {`
          w-full
          h-1/5
          ${styles.flexRow}
          ${styles.contentCenter}
          space-x-2
          resize-none
          relative
          text-xxs
        `}
      >
        <input type="text"
          name="lastname" 
          placeholder={`${
            contactForm.fields['lastname'].content[currentLang] ?
            contactForm.fields['lastname'].content[currentLang] 
            : contactForm.fields['lastname'].content[0]
          }`}
          required={contactForm.mendatoryFields ? contactForm.mendatoryFields.includes('lastname') : false}
          className=
          {`
            ${styles.sizeFull}
            color-scheme-primary
            rounded-md
            px-4
            resize-none
            border-2
          `}
          onChange={(e) => setFormLastName(e.target.value)}
        />
        
        <input type="text"
          name="firstname" 
          placeholder={`${
            contactForm.fields['firstname'].content[currentLang] ?
            contactForm.fields['firstname'].content[currentLang] 
            : contactForm.fields['firstname'].content[0]
          }`}
          required={contactForm.mendatoryFields ? contactForm.mendatoryFields.includes('firstname') : false}
          className=
          {`
            ${styles.sizeFull}
            color-scheme-primary
            rounded-md
            px-4
            border-2
            resize-none
          `}
          onChange={(e) => setFormFirstName(e.target.value)}
        />
        {contactForm.mendatoryFields && contactForm.mendatoryFields.includes('lastname')
          ? <a key="names-asterisk" className='absolute text-(--color-tertiary) top-0 -right-3'>*</a>
          : ""
        }
      </div>

      <div className=
        {`
          w-full
          h-1/5
          relative
          text-xxs
        `}
      >
        <input type="email"
          name="email"
          placeholder={`${
            contactForm.fields['email'].content[currentLang] ?
            contactForm.fields['email'].content[currentLang] 
            : contactForm.fields['email'].content[0]
          }`}
          required={contactForm.mendatoryFields ? contactForm.mendatoryFields.includes('email') : false}
          className=
          {`
            ${styles.sizeFull}
            color-scheme-primary
            rounded-md
            px-4
            border-2
            resize-none
          `}
          onChange={(e) => setFormEmail(e.target.value)}
        />
        {contactForm.mendatoryFields && contactForm.mendatoryFields.includes('email') 
          ? <a key="email-asterisk" id="email-asterisk" className='absolute text-(--color-tertiary) self-end px-2'>*</a>
          : ""
        }
      </div>

      <div className=
        {`
          w-full
          h-1/5
          ${styles.flexRow}
          items-center
          space-x-[3%]
          pl-[4%]
          border-2
          resize-none
          relative
          text-xxs
          rounded-md
          ${styles.defaultTransition  }
          focus-within:border-(--color-tertiary)
        `}
      >
        <PhoneCodeContext.Provider value={{phoneCode, setPhoneCode}}>
          <DropdownPhone />
        </PhoneCodeContext.Provider>

        <input type="tel"
          name="phone"
          placeholder={`${
            contactForm.fields['phone'].content[currentLang] ?
            contactForm.fields['phone'].content[currentLang] 
            : contactForm.fields['phone'].content[0]
          }`}
          required={contactForm.mendatoryFields ? contactForm.mendatoryFields.includes('phone') : false}
          className=
          {`
            ${styles.sizeFull}
            color-scheme-primary
            rounded-md
            px-4
            resize-none
          `}
          style={{border: 'none'}}
          onChange={(e) => setFormPhone(e.target.value.replace(/\s/g, ''))}
        />
        {contactForm.mendatoryFields && contactForm.mendatoryFields.includes('phone') 
          ? <a key="phone-asterisk" id="message-asterisk" className='absolute text-(--color-tertiary) self-end px-2'>*</a>
          : ""
        }
      </div>

      <div className=
        {`
          w-full
          h-3/5
          relative
          text-xxs
        `}
      >
        <textarea name="message"
          required={contactForm.mendatoryFields ? contactForm.mendatoryFields.includes('message') : false}
          className=
          {`
            ${styles.sizeFull}
            color-scheme-primary
            rounded-md
            px-4
            py-2
            overflow-y-scroll
            resize-none
            border-2
          `}
          placeholder={`${
            contactForm.fields['message'].content[currentLang] ?
            contactForm.fields['message'].content[currentLang] 
            : contactForm.fields['message'].content[0]
          }`}
          minLength={contactForm.messageMinLength}
          onChange={(e) => setFormMessage(e.target.value)}
        />
        {contactForm.mendatoryFields && contactForm.mendatoryFields.includes('message') 
          ? <a key="message-asterisk" id="message-asterisk" className='absolute text-(--color-tertiary) self-end px-2'>*</a>
          : ""
        }
      </div>

      {contactForm.mendatoryFields && contactForm.mendatoryFields.length > 0 ?
        <label id="indication-label"
          className=
          {`
            lg:text-[70%]
            self-baseline
          `}
        ><strong>*</strong>: {contactForm.alert.find(alert => alert.context === "mendatory")!.content[currentLang]}</label>
        : ""
      }

      <br/>
      <button type="submit"
        className=
        {`
          rounded-md
          ${canSubmit ? 
            'color-scheme-quaternary \
            hover:bg-(--color-quinary) \
            focus:scale-[0.96] \
            hover:scale-105'
            : 
            'border-2 \
            border-(--color-quaternary) \
            bg-(--color-secondary) \
            cursor-wait \
            disabled '
          }
          transition-all
          duration-150
          ease-in-out
        `}
        disabled={!canSubmit}
      >{canSubmit ? contactForm.alert.find(alert => alert.context === "submit")!.content[currentLang] : '🕒'}</button>
    </form>
  )
}

export { ContactForm, PhoneCodeContext };
