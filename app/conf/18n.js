import i18n from "i18next";
import Backend from 'i18next-http-backend'
import LanguageDetector  from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";


i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: "en",
    debug: true,
    detection: {
        order: ['queryString', 'cookie'],
        cache: ['cookie']
    },
    interpolation:  {
        escapeValue: false
    }
}) 


export default i18n

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'footer',
      ])),
      // Will be passed to the page component as props
    },
  }
}