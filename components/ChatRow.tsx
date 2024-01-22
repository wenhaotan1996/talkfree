'use client';

import {
  Message,
  chatLastMessageRef,
} from '@/lib/firebase/converters/MessageConverter';
import { useRouter } from 'next/navigation';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import UserAvartar from './UserAvartar';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { LanguageContext } from '@/context/languageSelectContext';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  chatId: string;
};

export default function ChatRow({ chatId }: Props) {
  const { language } = useContext(LanguageContext);
  const { data: session } = useSession();
  const router = useRouter();

  const [messages, loading, error] = useCollectionData<Message>(
    chatLastMessageRef(chatId)
  );
  const lastMessage = messages && messages.length > 0 ? messages[0] : null;
  const messageText = lastMessage?.translation
    ? lastMessage?.translation[language] ?? lastMessage?.input
    : 'Try sending message now...';

  return (
    <div
      className="border-y py-6 hover:bg-slate-300/30 dark:hover:bg-slate-700/30 px-4 rounded-sm"
      key={chatId}>
      {loading && (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[300px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      )}
      {!loading && (
        <div
          className="flex cursor-pointer space-x-3 items-center"
          onClick={() => router.push(`/chat/${chatId}`)}>
          <UserAvartar
            name={lastMessage?.user.name ?? session?.user.name}
            image={lastMessage?.user.image ?? session?.user.image}
          />
          <div className="space-y-1 flex-1">
            <p className="font-bold font-sans">
              {lastMessage?.user.name ?? 'New Chat'}
            </p>
            <p className="line-clamp-1 text-sm font-sans text-gray-500">
              {messageText}
            </p>
          </div>
          <div className="text-xs text-right space-y-2 text-gray-500">
            <p>
              {lastMessage?.timeStamp
                ? lastMessage.timeStamp.toLocaleTimeString('en-US', {
                    hourCycle: 'h24',
                  })
                : 'No Message yet'}
            </p>
            <p>{`chat #${chatId.substring(0, 4)}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}
