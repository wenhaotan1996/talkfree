import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { chatAdminRef } from './firebase/converters/ChatMembersConverter';
import { getDocs } from 'firebase/firestore';

export default function useAdmin(chatId: string) {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  async function checkChatAdmin() {
    const snapshot = await getDocs(chatAdminRef(chatId));
    const adminUser = snapshot.docs.length > 0 ? snapshot.docs[0].data() : null;
    setIsAdmin(session?.user.id == adminUser?.userId);
  }

  useEffect(() => {
    checkChatAdmin();
  }, []);

  return {
    isAdmin,
    session,
  };
}
