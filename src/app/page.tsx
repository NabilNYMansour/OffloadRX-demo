import { Box, Card, Flex, Group, Skeleton, Title } from "@mantine/core";
import PostCard from "./ui/components/cards/PostCard";
import PaginationControls from "./ui/components/core/PaginationControls";
import { SearchParams } from "@/lib/types";
import { getAllMedicine, getMedicineCount } from "@/db/queries";
import CenterContainer from "./ui/components/core/CenterContainer";
import { MdOutlineSearchOff } from "react-icons/md";
import Search from "./ui/components/core/search/Search";
import classes from './page.module.css';
import { AdvancedSearchWrapped } from "./ui/components/core/AdvancedSearch";
import { FiltersWrapped } from "./ui/components/core/Filters";

const noPostsFound = () => {
  return <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Group justify="center">
      <MdOutlineSearchOff size={28} />
      <Title order={3}> No posts found</Title>
    </Group>
  </Card>
}

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const page = searchParams["page"] ?? "1";
  const searchTerm = searchParams["search"] ?? "";
  const sort = searchParams["sort"] ?? "";
  const limit = 10;
  const posts = await getAllMedicine(String(searchTerm), String(sort), Number(page), limit);

  const numberOfPosts = await getMedicineCount(String(searchTerm));
  const numberOfPages = Math.ceil(numberOfPosts[0].count / limit);

  return (
    <Flex w="100%" pt={10} justify="center">

      <Box flex={1} className={classes.filters}>
        <Flex w="100%" pl={10} direction="column" align="flex-end">
          <FiltersWrapped />
        </Flex>
      </Box>

      <CenterContainer props={{ size: 800 }}>
        {/*============= Search =============*/}
        <Search count={numberOfPosts[0].count} />

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
        <PaginationControls currentPage={Number(page)} numberOfPages={numberOfPages} />
      </CenterContainer>

      <Box flex={1} className={classes.filters}>
        <Flex w="100%" pr={10} direction="column" align="flex-start">
          <AdvancedSearchWrapped />
        </Flex>
      </Box>
    </Flex>
  );
}
