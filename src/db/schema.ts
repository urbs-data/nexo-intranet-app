import {
  pgTable,
  serial,
  text,
  real,
  timestamp,
  unique,
  uuid,
  integer,
  boolean,
  varchar,
  index,
  numeric,
  date,
  pgEnum
} from 'drizzle-orm/pg-core';
import { BookingStatus, FileCustomerStatus, FileProviderStatus } from './enums';

export const productsTable = pgTable(
  'products_table',
  {
    id: serial('id').primaryKey(),
    user_id: text('user_id').notNull(),
    photo_url: text('photo_url').notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    price: real('price').notNull(),
    category: text('category').notNull(),
    updated_at: timestamp('updated_at').notNull().defaultNow()
  },
  (table) => [unique('name_user_idx').on(table.name, table.user_id)]
);

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;

// Country table
export const countryTable = pgTable('country', {
  id: integer('id').primaryKey(),
  name_en: varchar('name_en', { length: 255 }).notNull(),
  name_es: varchar('name_es', { length: 255 }).notNull(),
  code: varchar('code', { length: 10 }),
  zone: varchar('zone', { length: 50 })
});

export type Country = typeof countryTable.$inferSelect;
export type NewCountry = typeof countryTable.$inferInsert;

// Account table
export const accountTable = pgTable('account', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  account_type: varchar('account_type', { length: 50 }).notNull(),
  payment_rule_id: varchar('payment_rule_id', { length: 50 })
    .notNull()
    .default('DEFAULT'),
  country_id: integer('country_id').references(() => countryTable.id),
  is_active: boolean('is_active').notNull().default(true),
  quickbooks_id: varchar('quickbooks_id', { length: 255 }),
  // Campos adicionales para la vista de detalle - AGREGAR EN PYTHON
  business_name: varchar('business_name', { length: 255 }), // nombre fantasia
  address: text('address'), // direccion
  city: varchar('city', { length: 255 }), // ciudad
  language: varchar('language', { length: 50 }), // idioma
  tax_id: varchar('tax_id', { length: 100 }), // nro identificacion fiscal
  currency: varchar('currency', { length: 10 }), // moneda
  comments: text('comments'), // comentarios internos
  bank_account: varchar('bank_account', { length: 255 }), // cuenta bancaria
  max_overdraft_amount: real('max_overdraft_amount'), // monto maximo descubierto
  minimum_balance: real('minimum_balance'), // limite de saldo
  can_book_with_balance: boolean('can_book_with_balance').default(false), // puede tomar reservas en gastos con saldo disponible
  can_book_with_overdraft: boolean('can_book_with_overdraft').default(false), // puede tomar reservas en gastos con descubierto disponible
  support_contact_info: text('support_contact_info'), // información de contacto para soporte a clientes (texto rico)
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow()
});

export type Account = typeof accountTable.$inferSelect;
export type NewAccount = typeof accountTable.$inferInsert;

// AccountContract table
export const accountContractTable = pgTable(
  'account_contract',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    account_customer_id: uuid('account_customer_id').references(
      () => accountTable.id
    ),
    account_provider_id: uuid('account_provider_id').references(
      () => accountTable.id
    ),
    channel_type_id: varchar('channel_type_id', { length: 10 })
      .notNull()
      .default('NXO'),
    cto_provider_id: varchar('cto_provider_id', { length: 50 }).notNull(),
    cto_provider_name: varchar('cto_provider_name', { length: 255 }).notNull(),
    cto_producer_id: varchar('cto_producer_id', { length: 50 }).notNull(),
    cto_producer_name: varchar('cto_producer_name', { length: 255 }).notNull(),
    cto_marketer_id: varchar('cto_marketer_id', { length: 50 }).notNull(),
    cto_marketer_name: varchar('cto_marketer_name', { length: 255 }).notNull(),
    cto_operator_id: varchar('cto_operator_id', { length: 50 }),
    cto_operator_name: varchar('cto_operator_name', { length: 255 }),
    marketer_currency: varchar('marketer_currency', { length: 10 }),
    provider_currency: varchar('provider_currency', { length: 10 }),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow()
  },
  (table) => [
    index('cto_provider_id_idx').on(table.cto_provider_id),
    index('cto_producer_id_idx').on(table.cto_producer_id),
    index('cto_marketer_id_idx').on(table.cto_marketer_id)
  ]
);

export type AccountContract = typeof accountContractTable.$inferSelect;
export type NewAccountContract = typeof accountContractTable.$inferInsert;

// BookingStatus enum
export const bookingStatusEnum = pgEnum('booking_status', [
  BookingStatus.CANCELLATION_PENDING,
  BookingStatus.CANCELLATION_FAILED,
  BookingStatus.CANCELLED,
  BookingStatus.CANCELLED_WITH_CHARGES,
  BookingStatus.CONFIRMATION_DENIED,
  BookingStatus.CONFIRMATION_PENDING,
  BookingStatus.CONFIRMED,
  BookingStatus.MIXED,
  BookingStatus.REBOOKING,
  BookingStatus.REJECTED,
  BookingStatus.REQUEST_FAILED
]);

// FileCustomerStatus enum
export const fileCustomerStatusEnum = pgEnum('file_customer_status', [
  FileCustomerStatus.TO_ACCOUNT,
  FileCustomerStatus.CANCELLED,
  FileCustomerStatus.AMOUNT_CHARGED,
  FileCustomerStatus.END,
  FileCustomerStatus.INITIAL,
  FileCustomerStatus.INTERCOMPANY,
  FileCustomerStatus.INVOICED,
  FileCustomerStatus.PAYMENT_PENDING,
  FileCustomerStatus.PROFORMA_SENT,
  FileCustomerStatus.PROFORMA_TO_SEND,
  FileCustomerStatus.REBILLING
]);

// FileProviderStatus enum
export const fileProviderStatusEnum = pgEnum('file_provider_status', [
  FileProviderStatus.CANCELLED,
  FileProviderStatus.RECONFIRMED,
  FileProviderStatus.END,
  FileProviderStatus.ERROR,
  FileProviderStatus.EXPIRED_VALIDATION,
  FileProviderStatus.INITIAL,
  FileProviderStatus.PAID,
  FileProviderStatus.REBILLING,
  FileProviderStatus.REQUEST_REFUND,
  FileProviderStatus.TO_VALIDATE,
  FileProviderStatus.WHITELIST
]);

// Booking table
export const bookingTable = pgTable(
  'booking',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    public_id: integer('public_id').unique(),
    external_id: varchar('external_id', { length: 50 }).notNull().unique(),
    rebooking_id: varchar('rebooking_id', { length: 50 }),
    status: bookingStatusEnum('status')
      .notNull()
      .default(BookingStatus.CONFIRMATION_PENDING),
    customer_status: bookingStatusEnum('customer_status').default(
      BookingStatus.CONFIRMATION_PENDING
    ),
    customer_reference_id: varchar('customer_reference_id', { length: 50 }),
    provider_reference_id: varchar('provider_reference_id', { length: 255 }),
    account_contract_id: uuid('account_contract_id').references(
      () => accountContractTable.id
    ),
    creation_date: date('creation_date').notNull(),
    check_in: date('check_in').notNull(),
    check_out: date('check_out').notNull(),
    cancel_limit_date: date('cancel_limit_date'),
    canceled_date: date('canceled_date'),
    autocancel_date: date('autocancel_date'),
    deadline_date: date('deadline_date'),
    payment_informed_date: date('payment_informed_date'),
    net_price: numeric('net_price', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    net_price_usd: numeric('net_price_usd', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    gross_price: numeric('gross_price', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    gross_price_usd: numeric('gross_price_usd', { precision: 12, scale: 2 })
      .notNull()
      .default('0'),
    cto_provider_id: varchar('cto_provider_id', { length: 50 }),
    cto_provider_name: varchar('cto_provider_name', { length: 255 }),
    cto_producer_id: varchar('cto_producer_id', { length: 50 }),
    cto_producer_name: varchar('cto_producer_name', { length: 255 }),
    cto_marketer_id: varchar('cto_marketer_id', { length: 50 }),
    cto_marketer_name: varchar('cto_marketer_name', { length: 255 }),
    cto_operator_id: varchar('cto_operator_id', { length: 50 }),
    cto_operator_name: varchar('cto_operator_name', { length: 255 }),
    destination_id: integer('destination_id'),
    product_type: varchar('product_type', { length: 50 }),
    product_name: varchar('product_name', { length: 500 }),
    holder_name: varchar('holder_name', { length: 255 }),
    file_public_id: integer('file_public_id').unique(),
    file_status_customer: fileCustomerStatusEnum('file_status_customer'),
    file_status_provider: fileProviderStatusEnum('file_status_provider'),
    file_customer_deadline: date('file_customer_deadline'),
    file_provider_deadline: date('file_provider_deadline'),
    file_customer_paid_at: timestamp('file_customer_paid_at'),
    file_provider_paid_at: timestamp('file_provider_paid_at'),
    file_accounted_at: date('file_accounted_at'),
    file_created_at: timestamp('file_created_at'),
    quickbooks_estimate_id: varchar('quickbooks_estimate_id', { length: 50 }),
    quickbooks_purchase_order_id: varchar('quickbooks_purchase_order_id', {
      length: 50
    }),
    content_hash: varchar('content_hash', { length: 64 }),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow()
  },
  (table) => [
    index('external_id_idx').on(table.external_id),
    index('rebooking_id_idx').on(table.rebooking_id),
    index('content_hash_idx').on(table.content_hash)
  ]
);

export type Booking = typeof bookingTable.$inferSelect;
export type NewBooking = typeof bookingTable.$inferInsert;
