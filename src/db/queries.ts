"use server";

import { and, asc, between, count, desc, eq, gte, like, lte, or } from 'drizzle-orm';
import { medicineTable, SelectMedicine, emailTable, messageTable } from './schema';
import { db } from '.';
import { AdvancedSearchParams, FiltersParams, GeneralParams } from '@/lib/types';

//================== Medicine ==================// 
export async function getMedicineById(id: SelectMedicine['id']) {
  return await db.select().from(medicineTable).where(eq(medicineTable.id, id))
}

export async function getMedicineBySlug(slug: SelectMedicine['slug']) {
  return await db.select().from(medicineTable).where(eq(medicineTable.slug, slug))
}

//------- General Search -------//
const whereFunc = (searchTerm: string) => or(
  like(medicineTable.name, `%${searchTerm}%`),
  like(medicineTable.composition, `%${searchTerm}%`),
  like(medicineTable.city, `%${searchTerm}%`),
  like(medicineTable.street, `%${searchTerm}%`),
  like(medicineTable.postal, `%${searchTerm}%`),
  like(medicineTable.expiry, `%${searchTerm}%`),
  like(medicineTable.lotNumber, `%${searchTerm}%`),
)

//------- Filters -------//
const forSaleFunc = (type: string) => {
  const forSale = type === "selling" ? true : type === "wanted" ? false : null;
  if (forSale !== null) {
    return (eq(medicineTable.forSale, forSale));
  } else {
    return or();
  }
}

const priceFunc = (priceFrom: string, priceTo: string) => {
  if (priceFrom && priceTo) {
    return between(medicineTable.price, Number(priceFrom), Number(priceTo));
  } else if (priceFrom) {
    return gte(medicineTable.price, Number(priceFrom));
  } else if (priceTo) {
    return lte(medicineTable.price, Number(priceTo));
  } else {
    return or();
  }
}

const postedRangeFunc = (pr: string) => {
  if (pr) {
    const [from, to] = pr.split(",");
    return between(medicineTable.datePosted, new Date(from), new Date(to));
  } else {
    return or();
  }
}

const expiryRangeFunc = (er: string) => {
  if (er) {
    const [from, to] = er.split(",");
    return between(medicineTable.expiry, new Date(from), new Date(to));
  } else {
    return or();
  }
}

const filtersFunc = (filtersParams: FiltersParams) => {
  return and(
    forSaleFunc(filtersParams.type),
    priceFunc(filtersParams.pf, filtersParams.pt),
    postedRangeFunc(filtersParams.pr),
    expiryRangeFunc(filtersParams.er),
  )
}

//------- Advanced Search -------//
const advancedSearchFunc = (advancedSearchParams: AdvancedSearchParams) => {
  return and(
    like(medicineTable.name, `%${advancedSearchParams.name}%`),
    like(medicineTable.composition, `%${advancedSearchParams.composition}%`),
    like(medicineTable.city, `%${advancedSearchParams.city}%`),
    like(medicineTable.postal, `%${advancedSearchParams.postal}%`),
    like(medicineTable.lotNumber, `%${advancedSearchParams.lot}%`),
  )
}

//------- Sorting -------//
const orderByFunc = (sort: string) => {
  switch (sort) {
    case "price":
      return asc(medicineTable.price);
    case "-price":
      return desc(medicineTable.price);
    case "datePosted":
      return asc(medicineTable.datePosted);
    case "-datePosted":
      return desc(medicineTable.datePosted);
    default:
      return asc(medicineTable.id);
  }
}

export async function getAllMedicine(
  generalParams: GeneralParams,
  filtersParams: FiltersParams,
  advancedSearchParams: AdvancedSearchParams,
  limit: number
) {
  const actualPage = Math.max(generalParams.page - 1, 0);

  return await db.select().from(medicineTable)
    .where(
      and(
        whereFunc(generalParams.search),
        filtersFunc(filtersParams),
        advancedSearchFunc(advancedSearchParams)
      )
    )
    .orderBy(orderByFunc(generalParams.sort))
    .limit(limit).offset(actualPage * limit);
}

export async function getMedicineCount(
  generalParams: GeneralParams,
  filtersParams: FiltersParams,
  advancedSearchParams: AdvancedSearchParams,
) {
  return await db.select({ count: count() }).from(medicineTable)
    .where(
      and(
        whereFunc(generalParams.search),
        filtersFunc(filtersParams),
        advancedSearchFunc(advancedSearchParams)
      )
    )
}

//================== Email ==================//
export async function createEmail(name: string, email: string) {
  return await db.insert(emailTable).values({ name, email });
}

export async function getEmail(email: string) {
  return await db.select().from(emailTable).where(eq(emailTable.email, email));
}

//================== Message ==================//
export async function createMessage(emailId: number, subject: string, message: string) {
  await db.insert(messageTable).values({ emailId, subject, message });
}