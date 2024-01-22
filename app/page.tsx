import TypeWriter from '@/components/TypeWriter';
import { Button } from '@/components/ui/button';
import { supportedLanguage } from '@/lib/languages';
import Image from 'next/image';
import SendingMessage from '@/public/send_message.jpg';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center py-10 lg:py-16 overflow-y-auto space-y-14 px-6">
      <div className="text-center">
        <TypeWriter />
      </div>
      <div className="flex w-full max-w-[800px] xl:max-w-[1000px] pt-6 md:pt-16">
        <div className="w-full md:w-1/2 md:pr-6">
          <div className="text-lg space-y-4 font-bold xl:space-y-6">
            <h2 className="highlight text-2xl">Talk Free</h2>
            <p>
              Free from <span className="highlight">Language Barrier</span>
            </p>
            <p>
              Free from <span className="highlight">Distance Limitation</span>
            </p>
            <p className="">
              Talk to <span className="highlight">Anyone</span>&nbsp;
              <span className="highlight">Anywhere</span> in&nbsp;
              <span className="highlight">Any</span> language for&nbsp;
              <span className="highlight">Free</span>
            </p>
            <p className="">
              Simply message in <span className="highlight">Any</span> language,
              we will take care of the translation for you
            </p>
          </div>

          <div className="w-fit mx-auto mt-10">
            <Link href={'/chat'}>
              <Button className="border-purple-500" variant="outline">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-0 relative md:w-1/2">
          <Image
            src={SendingMessage}
            fill={true}
            alt=""
            className="object-cover rounded-sm shadow-lg"
          />
        </div>
      </div>
    </main>
  );
}
