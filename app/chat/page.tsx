import { getSession } from '@/lib/auth/auth';
import ChatRows from '@/components/ChatRows';
import { userChatsRef } from '@/lib/firebase/converters/ChatMembersConverter';
import { getDocs } from 'firebase/firestore';

type Props = {};

export default async function ChatsPage({}: Props) {
  const session = await getSession();
  const chats = (await getDocs(userChatsRef(session?.user.id!))).docs.map(
    (doc) => ({
      ...doc.data(),
      timeStamp: '',
    })
  );

  return <ChatRows initialChats={chats} />;
}
