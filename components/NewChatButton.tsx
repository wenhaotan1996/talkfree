'use client';

import { MessageSquarePlusIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { setDoc, serverTimestamp } from 'firebase/firestore';
import { chatMembershipRef } from '@/lib/firebase/converters/ChatMembersConverter';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

type Props = {};

export default function NewChatButton({}: Props) {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  async function createNewMessage() {
    if (!session?.user.id) return;
    toast({
      title: 'Creating new chat...',
      duration: 3000,
      description: 'Hang on while we create your new chat channel...',
    });

    try {
      const newChatId = uuidv4();

      await setDoc(chatMembershipRef(newChatId, session.user.id), {
        userId: session.user.id!,
        email: session.user.email!,
        isAdmin: true,
        image: session.user.image ?? '',
        chatId: newChatId,
        timeStamp: serverTimestamp(),
        name: session.user.name ?? 'unknown',
      });

      toast({
        title: 'Success',
        description: 'Your new chat channel has been created!',
        className: 'bg-green-400 text-white',
        duration: 3000,
      });

      router.push(`/chat/${newChatId}`);
    } catch (error) {
      console.log('Error creating new message channel:', error);
      toast({
        title: 'Error',
        description:
          'Oops! An error occured when trying to create your chat channel!',
        variant: 'destructive',
        duration: 3000,
      });
    }
  }
  return (
    <Button variant={'ghost'} className="px-2" onClick={createNewMessage}>
      <MessageSquarePlusIcon />
    </Button>
  );
}
