type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div className="flex-1 flex flex-col overflow-y-hidden">{children}</div>
  );
}
