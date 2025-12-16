import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ProviderViewSkeleton() {
  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <Skeleton className='h-8 w-64' />
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-10 w-full' />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
