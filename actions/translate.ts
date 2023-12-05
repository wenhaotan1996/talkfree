'use server';

import { supportedLanguage } from '../lib/languages';
import type { LanguageKey } from '../lib/languages';
import admin from 'firebase-admin';

type Translation = {
  translatedText: string;
  detectedSourceLanguage: string;
};

type TranslationAPIResponse = {
  data: {
    translations: Translation[];
  };
};

function generateTranslationURL(text: string, targetLanguage: string) {
  return `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_KEY}&q=${text}&target=${targetLanguage}`;
}

export async function translateMsg(
  chatId: string,
  messageId: string,
  text: string
) {
  const messageRef = admin
    .firestore()
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .doc(messageId);

  const translationPromises = Object.keys(supportedLanguage).map((language) =>
    fetch(generateTranslationURL(text, language)).then((res) => res.json())
  );

  const data: TranslationAPIResponse[] = await Promise.all(translationPromises);
  const translated = data.map((res) => res.data.translations[0].translatedText);

  const translatedWithLabel: {
    [key in LanguageKey]?: string;
  } = {};
  Object.keys(supportedLanguage).forEach((language, i) => {
    translatedWithLabel[language as LanguageKey] = translated[i];
  });

  messageRef.update({
    translation: translatedWithLabel,
  });
}
