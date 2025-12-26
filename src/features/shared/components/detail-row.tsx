import { LucideIcon } from 'lucide-react';

type DetailRowProps = {
  icon?: LucideIcon;
  iconClassName?: string;
  label: string;
  children: React.ReactNode;
};

export function DetailRow({
  icon: Icon,
  iconClassName = 'text-muted-foreground',
  label,
  children
}: DetailRowProps) {
  return (
    <div className='flex items-center gap-2'>
      {Icon && <Icon className={`h-4 w-4 shrink-0 ${iconClassName}`} />}
      <span className='text-muted-foreground text-sm'>{label}</span>
      <span className='ml-auto font-medium'>{children}</span>
    </div>
  );
}
