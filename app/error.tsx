'use client';
type Props = { error: Error & { digest?: string }; reset: () => void };

export default function ErrorPage({ error }: Props) {
  function generateErrorMessage() {
    if (error.cause === 'INVALID_CHAT_ACESS') {
      return 'You are not a valid member of the chat channel yet. Have the chat admin invite you via your email address in order to join the channel.';
    }
    return 'Looks like you have reached an invalid path or an unexpected error has occured. Refresh your page or try again later.';
  }
  const msg = generateErrorMessage();
  return (
    <div className="flex-1 flex-center text-center px-4 flex-col space-y-6">
      <h1 className="font-extrabold text-3xl">Oops!</h1>
      <p className="text-lg">{msg}</p>
    </div>
  );
}
