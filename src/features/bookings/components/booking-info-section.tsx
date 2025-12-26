import { Building2, MapPin, Globe, User, Users, Truck } from 'lucide-react';
import { DetailSection } from '@/features/shared/components/detail-section';
import { DetailRow } from '@/features/shared/components/detail-row';
import { AccountNameDisplay } from '@/features/shared/components/account-name-display';

export type BookingInfoData = {
  product_name: string | null;
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
      <DetailRow icon={MapPin} label='Destino'>
        {booking.destination_name || '-'}
      </DetailRow>
      <DetailRow icon={Globe} label='Región'>
        {booking.destination_zone || '-'}
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
