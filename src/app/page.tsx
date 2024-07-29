"use server";

import { AdvancedSearchParams, FiltersParams, GeneralParams, SearchParams } from "@/lib/types";
import { getAllMedicine, getMedicineCount } from "@/db/queries";
import OffloadRXMain from "./ui/components/core/OffloadRXMain";

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const generalParams: GeneralParams = {
    search: String(searchParams["search"] ?? ""),
    sort: String(searchParams["sort"] ?? ""),
    page: Number(searchParams["page"] ?? 1),
  }

  const filtersParams: FiltersParams = {
    type: String(searchParams["type"] ?? ""),
    pf: String(searchParams["pf"] ?? ""),
    pt: String(searchParams["pt"] ?? ""),
    pr: String(searchParams["pr"] ?? ""),
    er: String(searchParams["er"] ?? ""),
  };

  const advancedSearchParams: AdvancedSearchParams = {
    name: String(searchParams["name"] ?? ""),
    composition: String(searchParams["composition"] ?? ""),
    city: String(searchParams["city"] ?? ""),
    zip: String(searchParams["zip"] ?? ""),
    lot: String(searchParams["lot"] ?? ""),
  };

  const limit = 10;
  const numberOfPosts = await getMedicineCount(generalParams, filtersParams, advancedSearchParams);
  const numberOfPages = Math.ceil(numberOfPosts[0].count / limit);
  generalParams.page = Math.max(Math.min(generalParams.page, numberOfPages), 1);

  const posts = await getAllMedicine(
    generalParams,
    filtersParams,
    advancedSearchParams,
    limit
  );

  return <OffloadRXMain
    posts={posts}
    postsCount={numberOfPosts[0].count}
    pagesCount={numberOfPages}
    currentPage={generalParams.page} />;
}
