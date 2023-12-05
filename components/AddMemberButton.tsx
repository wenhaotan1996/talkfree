'use client';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { CheckIcon, Copy } from 'lucide-react';
import { getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { userByEmailRef } from '@/lib/firebase/converters/UserConverter';
import { useToast } from './ui/use-toast';
import { chatMembershipRef } from '@/lib/firebase/converters/ChatMembersConverter';
import { validateEmail } from '@/lib/utils';

type Props = {
  chatId: string;
};

export default function AddMemberButton({ chatId }: Props) {
  const [showInvite, setShowInvite] = useState(false);
  const [showCopy, setShowCopy] = useState(false);
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [url, setUrl] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const { toast } = useToast();
  const isEmailValid = validateEmail(inviteEmail);
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  async function sendInvite() {
    // check if user exists
    const snapshot = await getDocs(userByEmailRef(inviteEmail));
    if (snapshot.docs.length === 0 || !snapshot.docs[0].exists()) {
      toast({
        title: 'Error',
        description: 'User does not exist with given email address.',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }
    // check if user already in chat
    const user = snapshot.docs[0].data();
    const membershipRef = chatMembershipRef(chatId, user.id);
    const membership = await getDoc(membershipRef);
    if (membership.exists()) {
      toast({
        title: 'Error',
        description:
          'User with given email address is already in chat channel.',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }
    try {
      setDoc(membershipRef, {
        chatId,
        email: user.email,
        image: user.image,
        isAdmin: false,
        timeStamp: serverTimestamp(),
        userId: user.id,
        name: user.name,
      });
      toast({
        title: 'Success!',
        description:
          'User with given email has been added! Send him/her an invite link!',
        className: 'bg-green-400 text-white',
        duration: 3000,
      });
      setShowInvite(false);
      setShowCopy(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Oops! An error has occured when adding user to chat!',
        variant: 'destructive',
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogTrigger asChild>
          <Button variant="outline">Invite</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add member to chat</DialogTitle>
            <DialogDescription className="space-y-4">
              <Label>
                Enter any <span className="text-purple-500">registered</span>{' '}
                user&apos;s email address to add them to this chat channel.
              </Label>
              <Input
                placeholder="someone@gmail.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                type="email"
              />
              <Button onClick={sendInvite} disabled={!isEmailValid}>
                Add
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={showCopy} onOpenChange={setShowCopy}>
        <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has been{' '}
              <span className="text-purple-500">granted access</span> will be
              able to reach this chat channel with this link.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={url} readOnly />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(url);
                  setShowCheckMark(true);
                  setTimeout(() => {
                    setShowCheckMark(false);
                  }, 3000);
                } catch (error) {
                  console.error('Failed copying to clipboard');
                }
              }}>
              <span className="sr-only">Copy</span>
              {showCheckMark ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
