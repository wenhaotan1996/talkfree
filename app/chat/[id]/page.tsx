import ChatControls from '@/components/ChatControls';
import ChatInput from '@/components/ChatInput';
import ChatMembers from '@/components/ChatMembers';
import ChatMessages from '@/components/ChatMessages';
import { getSession } from '@/lib/auth/auth';
import {
  chatAdminRef,
  chatMembersRef,
  chatMembershipRef,
} from '@/lib/firebase/converters/ChatMembersConverter';
import { sortedChatMessagesRef } from '@/lib/firebase/converters/MessageConverter';
import { getDoc, getDocs } from 'firebase/firestore';
import {} from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export default async function ChatPage({ params: { id: chatId } }: Props) {
  const session = await getSession();
  const membership = await getDoc(chatMembershipRef(chatId, session?.user.id!));
  if (!membership.exists())
    throw new Error('Your are not a valid member of the chat channel', {
      cause: 'INVALID_CHAT_ACESS',
    });

  const messages = (await getDocs(sortedChatMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  const members = (await getDocs(chatMembersRef(chatId))).docs.map((doc) =>
    doc.data()
  );

  const adminSnapshot = await getDocs(chatAdminRef(chatId));
  const adminId =
    adminSnapshot.docs.length > 0 ? adminSnapshot.docs[0].data().userId : null;

  return (
    <>
      <ChatControls chatId={chatId} />
      <ChatMembers chatId={chatId} initialMembers={members} adminId={adminId} />
      <ChatMessages chatId={chatId} initialMessage={messages} />
      <ChatInput chatId={chatId} />
    </>
  );
}
