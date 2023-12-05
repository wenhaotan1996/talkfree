'use client';

import { SessionProvider } from 'next-auth/react';
import FirebaseAuthProvider from './FirebaseAuthProvider';

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  return (
    <SessionProvider basePath="/talkfree/api/auth">
      <FirebaseAuthProvider>{children}</FirebaseAuthProvider>
    </SessionProvider>
  );
}
