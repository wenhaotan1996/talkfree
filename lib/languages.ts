type Language = {
  name: string;
  language: string;
};

export type LanguageKey =
  | 'zh-CN'
  | 'en'
  | 'ja'
  | 'es'
  | 'de'
  | 'ru'
  | 'hi'
  | 'ar';

export type SupportedLanguage = {
  [key in LanguageKey]?: Language;
};

export const supportedLanguage: SupportedLanguage = {
  'zh-CN': {
    name: 'Mandarin',
    language: 'zh-CN',
  },
  ja: {
    name: 'Japanese',
    language: 'ja',
  },
  en: {
    name: 'English',
    language: 'en',
  },
  es: {
    name: 'Spanish',
    language: 'es',
  },
  de: {
    language: 'de',
    name: 'German',
  },
  ru: {
    language: 'ru',
    name: 'Russian',
  },
  hi: {
    language: 'hi',
    name: 'Hindi',
  },
  ar: {
    language: 'ar',
    name: 'Arabic',
  },
};
