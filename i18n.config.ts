import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./translations";

const resources = { 
  en: {
    translations: en,
  }
 };

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;