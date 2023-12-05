'use client';
import { auth } from '@/lib/firebase/firebase';
import { signInWithCustomToken } from 'firebase/auth';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

type Props = { children: React.ReactNode };

async function authWithFirebase(session: Session | null) {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (error) {
      console.error('Error signing in with firebase:', error);
    }
  } else {
    auth.signOut();
  }
}

export default function FirebaseAuthProvider({ children }: Props) {
  const { data: session } = useSession();
  useEffect(() => {
    authWithFirebase(session);
  }, [session]);
  return <>{children}</>;
}
