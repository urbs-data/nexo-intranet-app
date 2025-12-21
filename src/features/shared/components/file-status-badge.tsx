import { Badge } from '@/components/ui/badge';
import { FileCustomerStatus, FileProviderStatus } from '@/db/enums';
import {
  getFileCustomerStatusLabel,
  getFileProviderStatusLabel
} from '../file-status';

type FileStatusBadgeProps = {
  status: FileCustomerStatus | FileProviderStatus;
  type: 'customer' | 'provider';
  className?: string;
};

export function FileStatusBadge({
  status,
  type,
  className = ''
}: FileStatusBadgeProps) {
  const getStatusClassName = (
    status: FileCustomerStatus | FileProviderStatus
  ): string => {
    if (type === 'customer') {
      const customerStatus = status as FileCustomerStatus;

      if (
        customerStatus === FileCustomerStatus.PROFORMA_TO_SEND ||
        customerStatus === FileCustomerStatus.PROFORMA_SENT
      ) {
        return 'bg-info-subtle text-info';
      }

      if (customerStatus === FileCustomerStatus.INITIAL) {
        return 'bg-muted-subtle text-muted-dark';
      }

      if (
        customerStatus === FileCustomerStatus.TO_ACCOUNT ||
        customerStatus === FileCustomerStatus.INVOICED
      ) {
        return 'bg-warning-subtle text-warning';
      }

      if (customerStatus === FileCustomerStatus.CANCELLED) {
        return 'bg-muted-dark-subtle text-muted-dark';
      }

      if (
        customerStatus === FileCustomerStatus.AMOUNT_CHARGED ||
        customerStatus === FileCustomerStatus.PAYMENT_PENDING ||
        customerStatus === FileCustomerStatus.INTERCOMPANY
      ) {
        return 'bg-success-subtle text-success';
      }

      if (customerStatus === FileCustomerStatus.END) {
        return 'bg-success-subtle text-success';
      }

      if (customerStatus === FileCustomerStatus.REBILLING) {
        return 'bg-warning-subtle text-warning';
      }
    }

    if (type === 'provider') {
      const providerStatus = status as FileProviderStatus;

      if (providerStatus === FileProviderStatus.INITIAL) {
        return 'bg-muted-subtle text-muted-dark';
      }

      if (
        providerStatus === FileProviderStatus.TO_VALIDATE ||
        providerStatus === FileProviderStatus.WHITELIST
      ) {
        return 'bg-warning-subtle text-warning';
      }

      if (providerStatus === FileProviderStatus.CANCELLED) {
        return 'bg-muted-dark-subtle text-muted-dark';
      }

      if (
        providerStatus === FileProviderStatus.PAID ||
        providerStatus === FileProviderStatus.RECONFIRMED
      ) {
        return 'bg-success-subtle text-success';
      }

      if (providerStatus === FileProviderStatus.END) {
        return 'bg-success-subtle text-success';
      }

      if (
        providerStatus === FileProviderStatus.ERROR ||
        providerStatus === FileProviderStatus.REQUEST_REFUND ||
        providerStatus === FileProviderStatus.EXPIRED_VALIDATION
      ) {
        return 'bg-error-subtle text-error';
      }

      if (providerStatus === FileProviderStatus.REBILLING) {
        return 'bg-warning-subtle text-warning';
      }
    }

    return 'bg-muted-subtle text-muted-dark';
  };

  const label =
    type === 'customer'
      ? getFileCustomerStatusLabel(status as FileCustomerStatus)
      : getFileProviderStatusLabel(status as FileProviderStatus);

  return (
    <Badge
      variant='outline'
      className={`capitalize ${getStatusClassName(status)} ${className}`}
    >
      {label}
    </Badge>
  );
}
