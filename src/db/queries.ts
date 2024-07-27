"use server";

import { count, eq, like } from 'drizzle-orm';
import { medicineTable, SelectMedicine } from './schema';
import { db } from '.';

export async function getMedicineById(id: SelectMedicine['id']) {
  return db.select().from(medicineTable).where(eq(medicineTable.id, id))
}

export async function getAllMedicine(searchTerm: string, page: number, limit: number) {
  const actualPage = Math.max(page - 1, 0);
  return await db.select().from(medicineTable)
    .where(like(medicineTable.name, `%${searchTerm}%`))
    .limit(limit).offset(actualPage * limit);
}

export async function getMedicineCount(searchTerm: string) {
  return await db.select({ count: count() }).from(medicineTable).where(like(medicineTable.name, `%${searchTerm}%`));
}
