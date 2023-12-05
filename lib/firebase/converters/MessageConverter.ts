import { firestore } from '@/lib/firebase/firebase';
import { LanguageKey } from '@/lib/languages';
import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { collection, query, limit, orderBy } from 'firebase/firestore';

export interface Message {
  id?: string;
  user: User;
  timeStamp: Date;
  input: string;
  translation?: {
    [key in LanguageKey]: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
}

const messageConverter: FirestoreDataConverter<Message> = {
  toFirestore: (message) => {
    return {
      input: message.input,
      timestamp: message.timeStamp,
      user: message.user,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      input: data.input,
      translation: data.translation,
      user: data.user,
      timeStamp: data.timestamp?.toDate(),
    };
  },
};

export const chatMessagesRef = (chatId: string) =>
  collection(firestore, 'chats', chatId, 'messages').withConverter(
    messageConverter
  );

export const chatLastMessageRef = (chatId: string) =>
  query(
    collection(firestore, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'desc'),
    limit(1)
  ).withConverter(messageConverter);

export const sortedChatMessagesRef = (chatId: string) =>
  query(
    collection(firestore, 'chats', chatId, 'messages'),
    orderBy('timestamp', 'asc')
  ).withConverter(messageConverter);
