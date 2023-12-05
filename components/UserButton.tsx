'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Session } from 'next-auth';
import { Button } from './ui/button';
import { signIn, signOut } from 'next-auth/react';
import UserAvartar from './UserAvartar';

type Props = {
  session: Session | null;
};

export default function UserButton({ session }: Props) {
  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvartar image={session.user?.image} name={session.user?.name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {`Hi, ${session.user?.name?.split(' ')[0]}`}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant={'outline'} onClick={() => signIn()}>
      Sign In
    </Button>
  );
}
