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
  index
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm/sql';

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
