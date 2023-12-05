'use client';

import useAdmin from '@/lib/useAdmin';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { deleteDoc } from 'firebase/firestore';
import { chatMembershipRef } from '@/lib/firebase/converters/ChatMembersConverter';
import { useRouter } from 'next/navigation';
import { deleteChat } from '@/actions/deleteChat';
import { useToast } from './ui/use-toast';
import { useState } from 'react';

type Props = {
  chatId: string;
};

export default function DeleteButton({ chatId }: Props) {
  const { isAdmin, session } = useAdmin(chatId);
  const router = useRouter();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  async function removeAction() {
    try {
      toast({
        title: isAdmin ? 'Deleting chat...' : 'Leaving chat...',
        description: isAdmin
          ? 'We are deleting your chat channel...'
          : 'We are removing you from the chat channel...',
        duration: 3000,
      });
      if (isAdmin) {
        await deleteChat(chatId);
      } else {
        await deleteDoc(chatMembershipRef(chatId, session?.user.id!));
      }
      setDialogOpen(false);
      toast({
        title: 'Success!',
        description: isAdmin
          ? 'Your chat channel has been deleted!'
          : 'You have been removed from the channel!',
        className: 'bg-green-400 text-white',
        duration: 3000,
      });
      router.replace('/chat');
    } catch (error) {
      setDialogOpen(false);
      toast({
        title: 'Error',
        description: isAdmin
          ? 'Oops! An error occured when trying to delete chat channel. Please try again later.'
          : 'Oops! An error occured when trying to remove you from channel. Please try again later.',
        variant: 'destructive',
        duration: 3000,
      });
    }
  }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          {isAdmin ? 'Delete Chat' : 'Leave Chat'}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {isAdmin
              ? 'This action cannot be undone. This will permanently delete the chat channel and remove all messages from our servers.'
              : 'This action cannot be undone. This will permanently remove you from the chat channel.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={removeAction}>
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
