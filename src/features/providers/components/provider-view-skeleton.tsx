import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';

export default function ProviderViewSkeleton() {
  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <Heading title='Ver Proveedor' />
      <Separator />

      <div className='w-full'>
        <div className='bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center gap-2 rounded-lg p-[3px]'>
          <Skeleton className='h-[calc(100%-1px)] w-28 rounded-md' />
          <Skeleton className='h-[calc(100%-1px)] w-28 rounded-md' />
        </div>

        <div className='mt-6'>
          <div className='space-y-8'>
            {/* Información General Section */}
            <div className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>Información General</h3>
                <Skeleton className='h-9 w-24' />
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
              <h3 className='text-lg font-semibold'>Contrato</h3>
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
              <h3 className='text-lg font-semibold'>
                Información de contacto para soporte a Clientes
              </h3>
              <Skeleton className='h-48 w-full rounded-md' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
