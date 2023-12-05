'use client';

import {
  ChatMember,
  chatMembersRef,
  chatMembershipRef,
} from '@/lib/firebase/converters/ChatMembersConverter';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import UserAvartar from './UserAvartar';
import { Badge } from '@/components/ui/badge';
import useAdmin from '@/lib/useAdmin';
import { Minus } from 'lucide-react';
import { deleteDoc } from 'firebase/firestore';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';

type Props = {
  chatId: string;
  initialMembers: ChatMember[];
  adminId: string | null;
};

export default function ChatMembers({
  chatId,
  initialMembers,
  adminId,
}: Props) {
  // const { data: session } = useSession();
  const { session, isAdmin } = useAdmin(chatId);
  const [members, loading, error] = useCollectionData<ChatMember>(
    session && chatMembersRef(chatId),
    {
      initialValue: initialMembers,
    }
  );
  async function removeMember(userId: string) {
    await deleteDoc(chatMembershipRef(chatId, userId));
  }
  return (
    <div className="flex overflow-x-auto space-x-4 p-4 justify-start md:justify-center border-2 rounded-sm border-purple-400 mx-2">
      {members?.map(({ image, email, name, userId }) => (
        <Badge key={userId} className="flex space-x-2 py-1 px-4">
          <UserAvartar name={name} image={image} />
          <div>
            <p>{name}</p>
            <p>{email}</p>
            {userId === adminId && (
              <p className="animate-pulse dark:text-purple-600 text-purple-400">
                admin
              </p>
            )}
          </div>
          {isAdmin && userId != session?.user.id && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Minus className="text-red-600 cursor-pointer" size="20" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your action can not be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button
                    variant="destructive"
                    onClick={() => removeMember(userId)}>
                    Continue
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </Badge>
      ))}
    </div>
  );
}
