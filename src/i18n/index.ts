import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LayoutEng from './English/layout.json';
import LayoutKa from './Georgian/layout.json';
import loginEn from './English/login.json';
import loginKa from './Georgian/login.json';
import registerEn from './English/register.json';
import registerKa from './Georgian/register.json';
import articlesEn from './English/articles.json';
import articlesKa from './Georgian/articles.json';
import aboutEn from './English/aboutUs.json';
import aboutKa from './Georgian/aboutUs.json';
import authorsEn from './English/authors.json';
import authorsKa from './Georgian/authors.json';
import blogEn from './English/blog.json';
import blogKa from './Georgian/blog.json';

i18n.use(initReactI18next).init({
  resources: {
    ka: {
      layout: LayoutKa,
      login: loginKa,
      register: registerKa,
      articles: articlesKa,
      about: aboutKa,
      authors: authorsKa,
      blog: blogKa,
    },
    en: {
      layout: LayoutEng,
      login: loginEn,
      register: registerEn,
      articles: articlesEn,
      about: aboutEn,
      authors: authorsEn,
      blog: blogEn,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
