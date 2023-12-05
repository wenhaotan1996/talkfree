type Props = {};

export default function NotFoundPage({}: Props) {
  return (
    <div className="flex-1 flex-center flex-col space-y-6">
      <h1 className="text-3xl font-extrabold">404</h1>
      <p className="text-lg">
        Looks like you have reach an invalid path. Please return to your
        previous page or back to teh home page.
      </p>
    </div>
  );
}
