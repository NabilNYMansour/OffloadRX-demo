"use server";

import { AdvancedSearchParams, FiltersParams, GeneralParams, SearchParams } from "@/lib/types";
import { getAllMedicine, getMedicineCount } from "@/db/queries";
import { redirect } from "next/navigation";
import MainApp from "../ui/components/core/MainApp";

export default async function DemoPage({ searchParams }: { searchParams: SearchParams }) {
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
    postal: String(searchParams["postal"] ?? ""),
    lot: String(searchParams["lot"] ?? ""),
  };

  const limit = 10;
  const numberOfPosts = await getMedicineCount(generalParams, filtersParams, advancedSearchParams);
  const numberOfPages = Math.ceil(numberOfPosts[0].count / limit);

  const pageLimit = Math.max(Math.min(generalParams.page, numberOfPages), 1);
  if (pageLimit !== generalParams.page) {
    const newSearchParams = new URLSearchParams();
    for (const key in searchParams) {
      newSearchParams.set(key, searchParams[key] as string ?? "");
    }
    newSearchParams.set("page", pageLimit.toString());
    return redirect(`demo?${newSearchParams.toString()}`); // TODO: Fix redirect so that 'demo' is not hardcoded
  }

  const posts = await getAllMedicine(
    generalParams,
    filtersParams,
    advancedSearchParams,
    limit
  );

  const postsCount = numberOfPosts[0].count;
  const pagesCount = numberOfPages;
  const currentPage = generalParams.page;

  return <MainApp
    posts={posts} postsCount={postsCount}
    currentPage={currentPage} pagesCount={pagesCount} />;
}
