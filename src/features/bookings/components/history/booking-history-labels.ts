import { BookingHistoryAction } from '@/db/enums';

export function getActionLabel(action: BookingHistoryAction): string {
  const labels: Record<BookingHistoryAction, string> = {
    [BookingHistoryAction.CREATED]: 'Creada',
    [BookingHistoryAction.UPDATED]: 'Actualizada',
    [BookingHistoryAction.FILE_INITIALIZED]: 'File Inicializado',
    [BookingHistoryAction.FILE_STATUS_SYNCED]: 'Estado de File Sincronizado',
    [BookingHistoryAction.CUSTOMER_STATUS_CHANGE]: 'Cliente: Cambio de estado',
    [BookingHistoryAction.PROVIDER_STATUS_CHANGE]:
      'Proveedor: Cambio de estado',
    [BookingHistoryAction.FILE_CUSTOMER_REBILLING]: 'Cliente: Refacturación',
    [BookingHistoryAction.FILE_CUSTOMER_TO_ACCOUNT]: 'Cliente: A contabilizar',
    [BookingHistoryAction.FILE_CUSTOMER_INVOICED]: 'Cliente: Facturado',
    [BookingHistoryAction.FILE_PROVIDER_REQUEST_REFUND]:
      'Proveedor: Solicitar reembolso',
    [BookingHistoryAction.AUTO_PAYMENT_PROCESSED]: 'Pago Automático Procesado'
  };
  return labels[action] || action;
}
