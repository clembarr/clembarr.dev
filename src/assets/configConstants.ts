import { Author, EmailAPI } from "./dataTypes";

export const APP_URL = "https://clembarr.dev";

/**
 * Store information on the author of the app
 */ 
export const author: Author = {
    firstName: "Clément",
    lastName: "Barrière",
};

/**
 * Store the email API information for the contact form
 */
export const emailAPI: EmailAPI = {
    apiName: "emailjs",
    serviceId: "clembarr.dev_1234",
    templateId: "clembarr.dev_contact",
    publicKey: "XhGuv8Ll1Znl6NEuG",
};