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
    [BookingHistoryAction.AUTO_PAYMENT_PROCESSED]: 'Pago Automático Procesado',
    [BookingHistoryAction.FILE_CUSTOMER_PROFORMA_TO_SEND]:
      'Cliente: Proforma a enviar',
    [BookingHistoryAction.FILE_CUSTOMER_PROFORMA_SENT]:
      'Cliente: Proforma enviada',
    [BookingHistoryAction.FILE_CUSTOMER_AMOUNT_CHARGED]:
      'Cliente: Importe cobrado',
    [BookingHistoryAction.FILE_CUSTOMER_TO_ACCOUNT]: 'Cliente: A contabilizar',
    [BookingHistoryAction.FILE_CUSTOMER_INVOICED]: 'Cliente: Facturado',
    [BookingHistoryAction.FILE_CUSTOMER_PAYMENT_PENDING]:
      'Cliente: Pago pendiente',
    [BookingHistoryAction.FILE_CUSTOMER_INTERCOMPANY]: 'Cliente: Intercompany',
    [BookingHistoryAction.FILE_CUSTOMER_REBILLING]: 'Cliente: Refacturación',
    [BookingHistoryAction.FILE_CUSTOMER_CANCELLED]: 'Cliente: Cancelado',
    [BookingHistoryAction.FILE_CUSTOMER_END]: 'Cliente: Finalizado',
    [BookingHistoryAction.FILE_PROVIDER_TO_VALIDATE]: 'Proveedor: A validar',
    [BookingHistoryAction.FILE_PROVIDER_WHITELIST]: 'Proveedor: Whitelist',
    [BookingHistoryAction.FILE_PROVIDER_RECONFIRMED]: 'Proveedor: Reconfirmado',
    [BookingHistoryAction.FILE_PROVIDER_EXPIRED_VALIDATION]:
      'Proveedor: Validación expirada',
    [BookingHistoryAction.FILE_PROVIDER_ERROR]: 'Proveedor: Error',
    [BookingHistoryAction.FILE_PROVIDER_PAID]: 'Proveedor: Pagado',
    [BookingHistoryAction.FILE_PROVIDER_REQUEST_REFUND]:
      'Proveedor: Solicitar reembolso',
    [BookingHistoryAction.FILE_PROVIDER_REBILLING]: 'Proveedor: Refacturación',
    [BookingHistoryAction.FILE_PROVIDER_CANCELLED]: 'Proveedor: Cancelado',
    [BookingHistoryAction.FILE_PROVIDER_END]: 'Proveedor: Finalizado'
  };
  return labels[action] || action;
}
