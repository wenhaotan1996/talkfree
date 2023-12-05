import Image from 'next/image';
import { Avatar, AvatarFallback } from './ui/avatar';

type Props = {
  image: string | null | undefined;
  name: string | null | undefined;
  className?: string;
};

export default function UserAvartar({ image, name, className }: Props) {
  return (
    <Avatar className={className}>
      {image && (
        <Image
          src={image}
          alt={name ?? 'User avatar'}
          sizes="40px"
          fill={true}
          priority
        />
      )}
      <AvatarFallback>
        {name
          ?.split(' ')
          .map((i) => i[0])
          .join('')}
      </AvatarFallback>
    </Avatar>
  );
}
