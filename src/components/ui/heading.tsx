import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  size = '3xl'
}) => {
  const sizeClass = `text-${size}`;
  return (
    <div>
      <h2 className={cn('font-bold tracking-tight', sizeClass)}>{title}</h2>
      {description && (
        <p className='text-muted-foreground text-sm'>{description}</p>
      )}
    </div>
  );
};
