'use client';
import { Button } from '@/components/ui/button';
import { ProviderWithCountry } from '../../data/get-providers';
import { IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  return (
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
      </div>
    </TooltipProvider>
  );
};
