import { firestore } from '@/lib/firebase/firebase';
import type {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import {
  doc,
  collection,
  query,
  where,
  collectionGroup,
} from 'firebase/firestore';

export type ChatMember = {
  userId: string;
  email: string;
  timeStamp: string;
  isAdmin: boolean;
  chatId: string;
  image: string;
  name: string;
};

export const chatMemberConverter: FirestoreDataConverter<ChatMember> = {
  toFirestore: (member) => {
    return {
      ...member,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return {
      userId: snapshot.id as string,
      email: data.email as string,
      timeStamp: data.timeStamp?.toDate() as string,
      isAdmin: !!data.isAdmin,
      chatId: data.chatId as string,
      image: data.image as string,
      name: data.name as string,
    };
  },
};

export const chatMembershipRef = (chatId: string, userId: string) =>
  doc(firestore, 'chats', chatId, 'members', userId).withConverter(
    chatMemberConverter
  );

export const chatMembersRef = (chatId: string) =>
  collection(firestore, 'chats', chatId, 'members').withConverter(
    chatMemberConverter
  );

export const chatAdminRef = (chatId: string) =>
  query(
    collection(firestore, 'chats', chatId, 'members'),
    where('isAdmin', '==', true)
  ).withConverter(chatMemberConverter);

export const userChatsRef = (userId: string) =>
  query(
    collectionGroup(firestore, 'members'),
    where('userId', '==', userId)
  ).withConverter(chatMemberConverter);
