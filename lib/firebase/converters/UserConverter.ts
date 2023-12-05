import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '@/lib/firebase/firebase';

export type User = {
  email: string;
  image: string;
  name: string;
  id: string;
};

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user) => {
    return {
      email: user.email,
      image: user.image,
      name: user.name,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      email: data.email,
      name: data.name,
      image: data.image,
    };
  },
};

export const userByEmailRef = (email: string) =>
  query(
    collection(firestore, 'users'),
    where('email', '==', email)
  ).withConverter(userConverter);
