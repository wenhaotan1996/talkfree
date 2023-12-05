'use client';

import {
  userChatsRef,
  type ChatMember,
} from '@/lib/firebase/converters/ChatMembersConverter';
import { useSession } from 'next-auth/react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatRow from './ChatRow';

type Props = {
  initialChats: ChatMember[];
};

export default function ChatRows({ initialChats }: Props) {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollectionData<ChatMember>(
    session && userChatsRef(session?.user.id!),
    {
      initialValue: initialChats,
    }
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {chats?.map(({ chatId }) => (
        <ChatRow chatId={chatId} key={chatId} />
      ))}
      {chats?.length === 0 && (
        <div className="flex text-center py-8 items-center justify-center mx-2 bg-indigo-400 text-white rounded-md self-center mt-2">
          <p>
            You don`&apos;t have any chat channel yet. Try create one right now!
          </p>
        </div>
      )}
    </div>
  );
}
