'use server';
import admin from 'firebase-admin';
import type { TranslationAPIResponse } from '@/lib/types';
import { LanguageKey } from '@/lib/languages';
import { generateTranslationURL } from './utils';

export async function addLanguage(chatId: string, language: LanguageKey) {
  const adminFirestore = admin.firestore();
  const chatRef = adminFirestore.collection('chats').doc(chatId);
  const chat = (await chatRef.get()).data();
  if (chat?.languages?.includes(language)) return;
  chatRef.set(
    {
      languages: [...(chat?.languages ?? []), language],
    },
    { merge: true }
  );

  const messagesRef = adminFirestore
    .collection('chats')
    .doc(chatId)
    .collection('messages');
  const data = await messagesRef.get();
  try {
    data.docs.forEach(async (doc) => {
      const { input: text } = doc.data();
      const res = await fetch(generateTranslationURL(text, language));
      const translationRes: TranslationAPIResponse = await res.json();
      const translation = translationRes.data.translations[0].translatedText;
      doc.ref.update({
        [`translation.${language}`]: translation,
      });
    });
  } catch (error) {
    console.error(error);
  }
}
