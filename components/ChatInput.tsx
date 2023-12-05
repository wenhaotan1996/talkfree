'use client';
import { FormEvent, useState } from 'react';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { chatMessagesRef } from '@/lib/firebase/converters/MessageConverter';
import { translateMsg } from '@/actions/translate';
import { Input } from './ui/input';

type Props = {
  chatId: string;
};

export default function ChatInput({ chatId }: Props) {
  const [input, setInput] = useState('');
  const { data: session } = useSession();

  async function sendMsg(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input) return;
    const text = input.substring(0, 100);
    setInput('');
    const { id } = await addDoc(chatMessagesRef(chatId), {
      input,
      timeStamp: serverTimestamp(),
      user: {
        email: session?.user.email!,
        id: session?.user.id!,
        name: session?.user.name!,
        image: session?.user.image!,
      },
    });
    await translateMsg(chatId, id, text);
  }

  return (
    <>
      <form
        className="sticky bottom-0 flex items-center dark:bg-gray-600 space-x-2 px-2 py-1 rounded-md"
        onSubmit={sendMsg}>
        <Input
          className="my-0.5"
          value={input}
          placeholder="Enter message in ANY language..."
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          className="bg-purple-600 text-white hover:bg-purple-400"
          variant={'default'}>
          Send
        </Button>
      </form>
    </>
  );
}
