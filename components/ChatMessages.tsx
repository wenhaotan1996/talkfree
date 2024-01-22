'use client';

import { LanguageContext } from '@/context/languageSelectContext';
import {
  Message,
  sortedChatMessagesRef,
} from '@/lib/firebase/converters/MessageConverter';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useRef } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { cn } from '@/lib/utils';
import UserAvartar from './UserAvartar';
import { Loader2Icon, MessageCircleIcon } from 'lucide-react';
import { addLanguage } from '@/actions/addLanguage';

type Props = {
  chatId: string;
  initialMessage: Message[];
};

export default function ChatMessages({ chatId, initialMessage }: Props) {
  const { data: session } = useSession();
  const { language } = useContext(LanguageContext);
  const messagesContainer = useRef<HTMLDivElement>(null);

  const [messages, loading, error] = useCollectionData<Message>(
    session && sortedChatMessagesRef(chatId),
    {
      initialValue: initialMessage,
    }
  );

  useEffect(() => {
    addLanguage(chatId, language);
  }, [language]);

  function scrollToBottom(delay?: number) {
    setTimeout(() => {
      if (!messagesContainer.current) return;
      messagesContainer.current.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: 'smooth',
        left: 0,
      });
    }, delay);
  }

  useEffect(() => {
    scrollToBottom(200);
  });

  return (
    <>
      {messages?.length === 0 && (
        <div className="bg-indigo-400 mt-4 flex items-center justify-center flex-col text-white py-6 space-y-4 font-sans rounded-sm px-2 mx-2">
          <MessageCircleIcon color="white" size={35} />
          <div className="text-center">
            <p>
              <span className="font-bold">Invite a friend</span> & Send your
              first message in <span className="font-bold">ANY</span> language
              below
            </p>
            <p className="text-sm">
              We will auto-detect the language and translate for you
            </p>
          </div>
        </div>
      )}
      <div
        ref={messagesContainer}
        className="space-y-3 flex-1 overflow-y-auto px-2 md:px-6">
        {messages?.map(
          ({ translation, id, input, user: { name, image, id: userId } }) => (
            <div
              key={id}
              className={cn('flex space-x-2 last:pb-4 first:pt-4', {
                'flex-row-reverse space-x-reverse text-right':
                  session?.user.id === userId,
              })}>
              <UserAvartar className="mt-1" name={name} image={image} />
              <div
                className={cn(
                  'rounded-lg py-2 px-2 space-y-2 text-white shadow-lg',
                  {
                    'bg-cyan-500': session?.user.id === userId,
                    'bg-green-500': session?.user.id !== userId,
                  }
                )}>
                <p className="capitalize text-xs italic line-clamp-1">
                  {name.split(' ')[0]}
                </p>
                <p className="text-lg">
                  {translation && translation[language]
                    ? translation[language]
                    : input}
                  {!(translation && translation[language]) && (
                    <span>
                      <Loader2Icon className="animate-spin inline-block ml-1" />
                    </span>
                  )}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
