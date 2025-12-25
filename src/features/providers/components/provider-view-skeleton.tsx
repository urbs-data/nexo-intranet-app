import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';

export default function ProviderViewSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Información General Section */}
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <Heading title='Información General' size='md' />
          <Skeleton className='h-8 w-24' />
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Skeleton className='h-10 w-full md:col-span-2' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full md:col-span-2' />
          <Skeleton className='h-10 w-full md:col-span-2' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>

      <Separator />

      {/* Contrato Section */}
      <div className='space-y-4'>
        <Heading title='Contrato' size='md' />
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
        <Skeleton className='h-24 w-full' />
      </div>

      <Separator />

      {/* Información de contacto para soporte a Clientes Section */}
      <div className='space-y-4'>
        <Heading
          title='Información de contacto para soporte a Clientes'
          size='md'
        />
        <Skeleton className='h-48 w-full rounded-md' />
      </div>
    </div>
  );
}
