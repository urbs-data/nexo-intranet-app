import { FileCustomerStatus, FileProviderStatus } from '@/db/enums';

export const getFileCustomerStatusLabel = (
  status: FileCustomerStatus
): string => {
  const statusMap: Record<FileCustomerStatus, string> = {
    [FileCustomerStatus.TO_ACCOUNT]: 'A Cuenta',
    [FileCustomerStatus.CANCELLED]: 'Cancelado',
    [FileCustomerStatus.AMOUNT_CHARGED]: 'Monto Cobrado',
    [FileCustomerStatus.END]: 'Finalizado',
    [FileCustomerStatus.INITIAL]: 'Inicial',
    [FileCustomerStatus.INTERCOMPANY]: 'Intercompañía',
    [FileCustomerStatus.INVOICED]: 'Facturado',
    [FileCustomerStatus.PAYMENT_PENDING]: 'Pago Pendiente',
    [FileCustomerStatus.PROFORMA_SENT]: 'Proforma Enviada',
    [FileCustomerStatus.PROFORMA_TO_SEND]: 'Proforma a Enviar',
    [FileCustomerStatus.REBILLING]: 'Refacturación'
  };
  return statusMap[status] || status;
};

export const getFileProviderStatusLabel = (
  status: FileProviderStatus
): string => {
  const statusMap: Record<FileProviderStatus, string> = {
    [FileProviderStatus.CANCELLED]: 'Cancelado',
    [FileProviderStatus.RECONFIRMED]: 'Reconfirmado',
    [FileProviderStatus.END]: 'Finalizado',
    [FileProviderStatus.ERROR]: 'Error',
    [FileProviderStatus.EXPIRED_VALIDATION]: 'Validación Expirada',
    [FileProviderStatus.INITIAL]: 'Inicial',
    [FileProviderStatus.PAID]: 'Pagado',
    [FileProviderStatus.REBILLING]: 'Refacturación',
    [FileProviderStatus.REQUEST_REFUND]: 'Solicitud de Reembolso',
    [FileProviderStatus.TO_VALIDATE]: 'A Validar',
    [FileProviderStatus.WHITELIST]: 'Lista Blanca'
  };
  return statusMap[status] || status;
};

export const getFileCustomerStatusOptions = () => {
  return Object.values(FileCustomerStatus).map((status) => ({
    id: status,
    label: getFileCustomerStatusLabel(status)
  }));
};

export const getFileProviderStatusOptions = () => {
  return Object.values(FileProviderStatus).map((status) => ({
    id: status,
    label: getFileProviderStatusLabel(status)
  }));
};
