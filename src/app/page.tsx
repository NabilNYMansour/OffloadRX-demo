"use server";

import { AdvancedSearchParams, FiltersParams, GeneralParams, SearchParams } from "@/lib/types";
import { getAllMedicine, getMedicineCount } from "@/db/queries";
import { MdOutlineSearchOff } from 'react-icons/md';
import classes from '@/app/core.module.css';
import { Box, Card, Flex, Group, Title } from "@mantine/core";
import { FiltersWrapped } from "./ui/components/core/Filters";
import CenterContainer from "./ui/components/core/CenterContainer";
import Search from "./ui/components/core/Search";
import PostCard from "./ui/components/cards/PostCard";
import PaginationControls from "./ui/components/core/PaginationControls";
import { AdvancedSearchWrapped } from "./ui/components/core/AdvancedSearch";
import { redirect } from "next/navigation";
import { headers } from 'next/headers';

const noPostsFound = () => {
  return <Card className={classes.slideUp} shadow="sm" padding="lg" radius="md" withBorder>
    <Group justify="center">
      <MdOutlineSearchOff size={28} />
      <Title order={3}> No posts found</Title>
    </Group>
  </Card>
}

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

  const pageLimit = Math.max(Math.min(generalParams.page, numberOfPages), 1);
  if (pageLimit !== generalParams.page) {
    const newSearchParams = new URLSearchParams();
    for (const key in searchParams) {
      newSearchParams.set(key, searchParams[key] as string ?? "");
    }
    newSearchParams.set("page", pageLimit.toString());
    const headersList = headers();
    const header_url = headersList.get('x-url') || "";
    return redirect(`${header_url}/?${newSearchParams.toString()}`);
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

  return (
    <Flex w="100%" pt={10} justify="center">

      {/*============= Filters =============*/}
      <Box flex={1} className={classes.bigScreen}>
        <Flex w="100%" pl={10} direction="column" align="flex-end">
          <FiltersWrapped key={"cardFilter"} />
        </Flex>
      </Box>

      <CenterContainer props={{ size: 800 }}>
        {/*============= Search =============*/}
        <Search count={postsCount} />

        {/*============= Posts =============*/}
        <Flex direction="column" gap={10} w="100%" align="stretch">
          {posts.length > 0 ?
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            )) :
            noPostsFound()
          }
        </Flex>

        {/*============= Pagination =============*/}
        <PaginationControls currentPage={Number(currentPage)} numberOfPages={pagesCount} />
      </CenterContainer>

      {/*============= Advanced Search =============*/}
      <Box flex={1} className={classes.bigScreen}>
        <Flex w="100%" pr={10} direction="column" align="flex-start">
          <AdvancedSearchWrapped key={"cardAdvanced"} />
        </Flex>
      </Box>
    </Flex>
  );
}
