'use server';
import admin from 'firebase-admin';

const RETRY = 5;

export async function deleteChat(chatId: string) {
  const adminFirestore = admin.firestore();
  const chatRef = adminFirestore.collection('chats').doc(chatId);
  const buildWriter = adminFirestore.bulkWriter();
  buildWriter.onWriteError((error) => error.failedAttempts < RETRY);

  try {
    await adminFirestore.recursiveDelete(chatRef, buildWriter);
  } catch (error) {
    console.error(`Fail to delete chat ${chatId}:`, error);
    throw new Error(`Fail to delete chat ${chatId}:`);
  }
}
