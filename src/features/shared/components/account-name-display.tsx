type AccountNameDisplayProps = {
  accountName: string | null;
  ctoName: string | null;
};

export function AccountNameDisplay({
  accountName,
  ctoName
}: AccountNameDisplayProps) {
  if (accountName) {
    return <span className='font-medium'>{accountName}</span>;
  }

  if (ctoName) {
    return <span className='text-muted-foreground'>({ctoName})</span>;
  }

  return <span>-</span>;
}
