'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import { ProviderWithCountry } from '../../data/get-providers';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { resolveActionResult } from '@/lib/actions/client';
import { deleteProvider } from '@/features/providers/actions/delete-provider';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface CellActionProps {
  data: ProviderWithCountry;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      return resolveActionResult(deleteProvider({ id }));
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(`No se pudo eliminar el proveedor: ${error}`);
    }
  });

  const onConfirm = async () => {
    mutate(data.id);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
      />
      <TooltipProvider>
        <div className='flex items-center gap-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8'
                onClick={() => router.push(`/dashboard/providers/${data.id}`)}
              >
                <IconEdit className='h-4 w-4' />
                <span className='sr-only'>Editar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Editar</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8'
                onClick={() => setOpen(true)}
              >
                <IconTrash className='h-4 w-4' />
                <span className='sr-only'>Eliminar</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Eliminar</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </>
  );
};
