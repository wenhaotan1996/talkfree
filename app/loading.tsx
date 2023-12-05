import { Loader2Icon } from 'lucide-react';
type Props = {};

export default function LoadingPage({}: Props) {
  return (
    <div className="flex-1 flex items-center justify-center">
      {/* <Spinner */}
      <Loader2Icon className="animate-spin" size={80} />
    </div>
  );
}
