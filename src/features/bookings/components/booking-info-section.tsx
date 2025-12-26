import {
  Building2,
  MapPin,
  Globe,
  User,
  Users,
  Truck,
  BedDouble,
  CalendarDays,
  Baby,
  Moon
} from 'lucide-react';
import { DetailSection } from '@/features/shared/components/detail-section';
import { DetailRow } from '@/features/shared/components/detail-row';
import { AccountNameDisplay } from '@/features/shared/components/account-name-display';

export type BookingInfoData = {
  product_name: string | null;
  product_board: string | null;
  nights_count: number | null;
  rooms_count: number | null;
  adult_count: number | null;
  child_count: number | null;
  destination_name: string | null;
  destination_zone: string | null;
  holder_name: string | null;
  customer_name: string | null;
  cto_marketer_name: string | null;
  provider_name: string | null;
  cto_provider_name: string | null;
};

type BookingInfoSectionProps = {
  booking: BookingInfoData;
};

export function BookingInfoSection({ booking }: BookingInfoSectionProps) {
  return (
    <DetailSection title='Información'>
      <DetailRow icon={Building2} label='Hotel'>
        {booking.product_name || '-'}
      </DetailRow>
      <DetailRow icon={BedDouble} label='Tipo producto'>
        {booking.product_board || '-'}
      </DetailRow>
      <DetailRow icon={CalendarDays} label='Estancia'>
        <div className='flex items-center gap-2.5'>
          <span className='flex items-center gap-1'>
            <Moon className='text-muted-foreground h-3.5 w-3.5' />
            {booking.nights_count || '-'}
          </span>
          <span className='text-muted-foreground/30'>|</span>
          <span className='flex items-center gap-1'>
            <User className='text-muted-foreground h-3.5 w-3.5' />
            {booking.adult_count || '-'}
          </span>
          <span className='text-muted-foreground/30'>|</span>
          <span className='flex items-center gap-1'>
            <Baby className='text-muted-foreground h-3.5 w-3.5' />
            {booking.child_count || '0'}
          </span>
        </div>
      </DetailRow>
      <DetailRow icon={MapPin} label='Destino'>
        {booking.destination_name || '-'}
      </DetailRow>
      <DetailRow icon={User} label='Pasajero'>
        {booking.holder_name || '-'}
      </DetailRow>
      <DetailRow icon={Users} label='Cliente'>
        <AccountNameDisplay
          accountName={booking.customer_name}
          ctoName={booking.cto_marketer_name}
        />
      </DetailRow>
      <DetailRow icon={Truck} label='Proveedor'>
        <AccountNameDisplay
          accountName={booking.provider_name}
          ctoName={booking.cto_provider_name}
        />
      </DetailRow>
    </DetailSection>
  );
}
