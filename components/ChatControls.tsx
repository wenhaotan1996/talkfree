import AddMemberButton from './AddMemberButton';
import DeleteButton from './DeleteButton';

type Props = {
  chatId: string;
};

export default function ChatControls({ chatId }: Props) {
  return (
    <div className="flex justify-end space-x-2 px-2 md:px-6 py-4">
      <AddMemberButton chatId={chatId} />
      <DeleteButton chatId={chatId} />
    </div>
  );
}
