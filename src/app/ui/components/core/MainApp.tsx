"use client";

import { MdOutlineSearchOff } from 'react-icons/md';
import classes from '@/app/core.module.css';
import { Box, Card, Flex, Group, Title } from "@mantine/core";
import { FiltersWrapped } from "./Filters";
import CenterContainer from "./CenterContainer";
import SearchSort from "./SearchSort";
import PaginationControls from "./PaginationControls";
import { AdvancedSearchWrapped } from "./AdvancedSearch";
import PostCard from "../cards/PostCard";
import { SelectMedicine } from "@/db/schema";

const noPostsFound = () => {
  return <Card className={classes.slideUp} shadow="sm" padding="lg" radius="md" withBorder>
    <Group justify="center">
      <MdOutlineSearchOff size={28} />
      <Title order={3}> No posts found</Title>
    </Group>
  </Card>
}

const MainApp = ({ posts, postsCount, currentPage, pagesCount }:
  {
    posts: SelectMedicine[],
    postsCount: number,
    currentPage: number,
    pagesCount: number
  }
) => {
  return (
    <Flex w="100%" h="100%" pt={10} justify="center">
      {/*============= Filters =============*/}
      <Box flex={1} className={classes.bigScreen}>
        <Flex w="100%" pl={10} direction="column" align="flex-end">
          <FiltersWrapped />
        </Flex>
      </Box>

      <CenterContainer props={{ size: 800 }}>
        {/*============= Search =============*/}
        <SearchSort count={postsCount} />

        {/*============= Posts =============*/}
        <Flex direction="column" gap={10} w="100%" align="stretch">
          {posts.length > 0 ?
            posts.map((post) => (
              <PostCard key={post.id + post.slug} {...post} />
            )) : noPostsFound()}
        </Flex>

        {/*============= Pagination =============*/}
        <PaginationControls currentPage={Number(currentPage)} numberOfPages={pagesCount} />
      </CenterContainer>

      {/*============= Advanced Search =============*/}
      <Box flex={1} className={classes.bigScreen}>
        <Flex w="100%" pr={10} direction="column" align="flex-start">
          <AdvancedSearchWrapped />
        </Flex>
      </Box>
    </Flex>
  );
};

export default MainApp;