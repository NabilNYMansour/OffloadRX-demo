import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const medicineTable = sqliteTable('users', {
  id: integer('id').primaryKey(),

  name: text('name').notNull(), // Medicine Name
  composition: text('composition').notNull(), // Composition

  imgUrl: text('imgUrl').notNull(), // Image URL
  price: real('price').notNull(), // Price
  forSale: integer('for_sale', { mode: 'boolean' }).notNull(), // For Sale 1 for sale, 0 for wanted

  city: text('city').notNull(), // City
  street: text('street').notNull(), // Street
  zip: text('zip').notNull(), // Zip
  phoneNumber: text('phone_number').notNull(), // Phone Number
  email: text('email').notNull(), // Email

  datePosted: integer('date_posted', { mode: 'timestamp' }).notNull(), // Date Posted

  expiry: integer('expiry', { mode: 'timestamp' }).notNull(), // Expiry
  lotNumber: text('lot_number').notNull(), // Lot Number

  description: text('description').notNull(), // Description
  slug: text('slug').notNull(), // Slug
});

export type InsertMedicine = typeof medicineTable.$inferInsert;
export type SelectMedicine = typeof medicineTable.$inferSelect;
