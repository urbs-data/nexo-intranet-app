type DetailSectionProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function DetailSection({ title, children, footer }: DetailSectionProps) {
  return (
    <div className='rounded-lg border p-4'>
      <h4 className='font-semibold'>{title}</h4>
      <div className='mt-4 space-y-3'>{children}</div>
      {footer && (
        <div className='text-muted-foreground mt-4 border-t pt-3 text-xs'>
          {footer}
        </div>
      )}
    </div>
  );
}
