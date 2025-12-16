'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccountContract } from '@/db/schema';

export default function ContractViewForm({
  initialData,
  pageTitle
}: {
  initialData: AccountContract;
  pageTitle: string;
}) {
  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {/* Información General */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Información General</h3>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  ID del Contrato
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 font-mono text-sm'>
                  {initialData.id}
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium'>
                  Tipo de Canal
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                  {initialData.channel_type_id}
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium'>
                  Fecha de Creación
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                  {initialData.created_at
                    ? new Date(initialData.created_at).toLocaleString('es-ES')
                    : '-'}
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium'>
                  Última Actualización
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                  {initialData.updated_at
                    ? new Date(initialData.updated_at).toLocaleString('es-ES')
                    : '-'}
                </div>
              </div>
            </div>
          </div>

          {/* Información de Cuentas */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Cuentas</h3>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  ID Cuenta Cliente
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 font-mono text-sm'>
                  {initialData.account_customer_id || '-'}
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium'>
                  ID Cuenta Proveedor
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 font-mono text-sm'>
                  {initialData.account_provider_id || '-'}
                </div>
              </div>
            </div>
          </div>

          {/* Información CTO Proveedor */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>CTO Proveedor</h3>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  ID Proveedor
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                  {initialData.cto_provider_id}
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium'>
                  Nombre Proveedor
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                  {initialData.cto_provider_name}
                </div>
              </div>
            </div>
          </div>

          {/* Información CTO Productor */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>CTO Productor</h3>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  ID Productor
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                  {initialData.cto_producer_id}
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium'>
                  Nombre Productor
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                  {initialData.cto_producer_name}
                </div>
              </div>
            </div>
          </div>

          {/* Información CTO Comercializador */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>CTO Comercializador</h3>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  ID Comercializador
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                  {initialData.cto_marketer_id}
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium'>
                  Nombre Comercializador
                </label>
                <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                  {initialData.cto_marketer_name}
                </div>
              </div>
            </div>
          </div>

          {/* Información CTO Operador */}
          {(initialData.cto_operator_id || initialData.cto_operator_name) && (
            <div>
              <h3 className='mb-4 text-lg font-semibold'>CTO Operador</h3>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    ID Operador
                  </label>
                  <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                    {initialData.cto_operator_id || '-'}
                  </div>
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Nombre Operador
                  </label>
                  <div className='bg-muted/50 rounded-md border px-3 py-2 text-sm'>
                    {initialData.cto_operator_name || '-'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
