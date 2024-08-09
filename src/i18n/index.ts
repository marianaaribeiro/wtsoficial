import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslate from "./en/en.json";
import ptTranslate from "./pt/pt.json";

i18n.use(initReactI18next).init({
    resources: {
        en: { ...enTranslate },
        pt: { ...ptTranslate },
    },
    lng: "pt",
});
