import { createI18n } from 'vue-i18n';
import en from './lang/en.json';
import zh from './lang/zh-CN.json';

export default createI18n({
    legacy: false,
    allowComposition: true,
    locale: 'en',
    globalInjection: true,
    fallbackLocale: 'en',
    messages: {
        en,
        zh,
    },
});
