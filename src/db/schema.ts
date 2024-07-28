import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const medicineTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(), // Medicine Name
  composition: text('composition').notNull(), // Composition
  imgUrl: text('imgUrl').notNull(), // Image URL
  city: text('city').notNull(), // City
  street: text('street').notNull(), // Street
  zip: text('zip').notNull(), // Zip
  price: real('price').notNull(), // Price
  expiry: text('expiry').notNull(), // Expiry
  lotNumber: text('lot_number').notNull(), // Lot Number
  datePosted: text('date_posted').notNull(), // Date Posted
  description: text('description').notNull(), // Description
  slug: text('slug').notNull(), // Slug
});
export type InsertMedicine = typeof medicineTable.$inferInsert;
export type SelectMedicine = typeof medicineTable.$inferSelect;
