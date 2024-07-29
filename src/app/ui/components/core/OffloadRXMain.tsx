"use client";

import { MdOutlineSearchOff } from 'react-icons/md';
import classes from './core.module.css';
import { Box, Card, Flex, Group, Title } from "@mantine/core";
import { FiltersWrapped } from './Filters';
import CenterContainer from './CenterContainer';
import Search from './Search';
import PaginationControls from './PaginationControls';
import { AdvancedSearchWrapped } from './AdvancedSearch';
import PostCard from '../cards/PostCard';
import { SelectMedicine } from '@/db/schema';
import { useEffect, useState } from 'react';
import { Params } from '@/lib/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const noPostsFound = () => {
  return <Card className={classes.slideUp} shadow="sm" padding="lg" radius="md" withBorder>
    <Group justify="center">
      <MdOutlineSearchOff size={28} />
      <Title order={3}> No posts found</Title>
    </Group>
  </Card>
}
const OffloadRXMain = ({posts, postsCount, pagesCount, currentPage}:
  { posts: SelectMedicine[], postsCount: number, pagesCount: number, currentPage: number }
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [paramsList, setParamsList] = useState<Params>({
    search: "",
    sort: "",
    page: 1,
    type: "",
    pf: "",
    pt: "",
    pr: "",
    er: "",
    name: "",
    composition: "",
    city: "",
    zip: "",
    lot: "",
  });

  useEffect(() => {


  }, [paramsList]);

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
};

export default OffloadRXMain;