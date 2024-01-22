export type Translation = {
  translatedText: string;
  detectedSourceLanguage: string;
};

export type TranslationAPIResponse = {
  data: {
    translations: Translation[];
  };
};
