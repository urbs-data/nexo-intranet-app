'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ContractWithAccounts } from '../../data/get-contracts';
import { IconEye, IconEdit } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { ContractMapModal } from '../contract-map-modal';

interface CellActionProps {
  data: ContractWithAccounts;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  return (
    <>
      <ContractMapModal
        contract={data}
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />
      <TooltipProvider>
        <div className='flex items-center gap-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8'
                onClick={() => router.push(`/dashboard/contract/${data.id}`)}
              >
                <IconEye className='h-4 w-4' />
                <span className='sr-only'>Ver</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ver</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8'
                onClick={() => setIsMapModalOpen(true)}
              >
                <IconEdit className='h-4 w-4' />
                <span className='sr-only'>Mapear</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mapear</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </>
  );
};
