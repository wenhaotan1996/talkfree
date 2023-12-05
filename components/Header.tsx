import Link from 'next/link';
import DarkModeToggle from './DarkModeToggle';
import UserButton from './UserButton';
import { getSession } from '@/lib/auth/auth';
import { MessagesSquareIcon } from 'lucide-react';
import NewChatButton from './NewChatButton';
import { Button } from './ui/button';
import LanguagePicker from './LanguagePicker';

type Props = {};

export default async function Header({}: Props) {
  const session = await getSession();

  return (
    <header className="flex py-6 space-x-4 px-2 md:px-6 border-b items-center justify-center md:justify-end flex-wrap space-y-4 md:space-y-0">
      <Link
        href={'/'}
        className="font-extrabold text-xl hidden md:block flex-1">
        Talk Free
      </Link>
      <h1 className="font-extrabold text-xl w-full flex-shrink-0 text-center md:hidden">
        Talk Free
      </h1>
      {session && (
        <>
          <LanguagePicker />
          <Link href="/chat" prefetch={false}>
            <Button variant="ghost" className="px-2">
              <MessagesSquareIcon />
            </Button>
          </Link>
          <NewChatButton />
        </>
      )}
      <DarkModeToggle />
      <UserButton session={session} />
    </header>
  );
}
