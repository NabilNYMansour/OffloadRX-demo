"use server";

import { asc, count, desc, eq, like, or } from 'drizzle-orm';
import { medicineTable, SelectMedicine } from './schema';
import { db } from '.';

export async function getMedicineById(id: SelectMedicine['id']) {
  return db.select().from(medicineTable).where(eq(medicineTable.id, id))
}

const getAllWhereFunc = (searchTerm: string) => or(
  like(medicineTable.name, `%${searchTerm}%`),
  like(medicineTable.composition, `%${searchTerm}%`),
  like(medicineTable.city, `%${searchTerm}%`),
  like(medicineTable.street, `%${searchTerm}%`),
  like(medicineTable.zip, `%${searchTerm}%`),
  like(medicineTable.expiry, `%${searchTerm}%`),
  like(medicineTable.lotNumber, `%${searchTerm}%`),
)

export async function getAllMedicine(searchTerm: string, sort: string, page: number, limit: number) {
  const actualPage = Math.max(page - 1, 0);

  return await db.select().from(medicineTable)
    .where(getAllWhereFunc(searchTerm)).orderBy(
      sort === 'price' ? asc(medicineTable.price) :
        sort === '-price' ? desc(medicineTable.price) :
          sort === 'datePosted' ? asc(medicineTable.datePosted) :
            sort === '-datePosted' ? desc(medicineTable.datePosted) :
              asc(medicineTable.id)
    ).limit(limit).offset(actualPage * limit);
}

export async function getMedicineCount(searchTerm: string) {
  return await
    db.select({ count: count() }).from(medicineTable)
      .where(getAllWhereFunc(searchTerm));
}
