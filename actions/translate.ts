'use server';

import { LanguageKey } from '@/lib/languages';
import { generateTranslationURL } from './utils';
import type { TranslationAPIResponse } from '@/lib/types';
import admin from 'firebase-admin';

export async function translateMsg(
  chatId: string,
  messageId: string,
  text: string
) {
  const firestore = admin.firestore();
  const chatRef = firestore.collection('chats').doc(chatId);
  const chat = (await chatRef.get()).data();
  const languages: LanguageKey[] = chat?.languages ?? [];
  const messageRef = firestore
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .doc(messageId);

  const translationPromises = languages.map((language) =>
    fetch(generateTranslationURL(text, language)).then((res) => res.json())
  );

  const data: TranslationAPIResponse[] = await Promise.all(translationPromises);
  const translated = data.map((res) => res.data.translations[0].translatedText);

  const translatedWithLabel: {
    [key in LanguageKey]?: string;
  } = {};

  languages.forEach((language, i) => {
    translatedWithLabel[language] = translated[i];
  });

  messageRef.update({
    translation: translatedWithLabel,
  });
}
