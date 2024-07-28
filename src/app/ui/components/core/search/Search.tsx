"use client";

import { Button, Divider, Flex, Group, Modal, Select, Skeleton, Text, ThemeIcon } from "@mantine/core";
import { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ActionIcon, TextInput } from '@mantine/core';
import { useDebouncedValue, useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FaMagnifyingGlass, FaSort } from 'react-icons/fa6';
import { RxCross1 } from "react-icons/rx";
import { IoFilterSharp, IoSettingsSharp } from "react-icons/io5";
import classes from '../core.module.css';
import cx from 'clsx';
import Filters from "../Filters";
import AdvancedSearch from "../AdvancedSearch";

const SearchSkeleton = () => {
  return (
    <Flex direction="column" w="100%" gap={10}>
      <Skeleton radius="md" h={50} className={classes.slideUp} />
      <Skeleton radius="md" h={42} className={classes.slideUp} />
    </Flex>
  );
}

const availableSortValues = [
  "Best Match",
  "Price: Lowest",
  "Price: Highest",
  "Time: Oldest",
  "Time: Newest",
];

const Search = ({ count }: { count: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const screenSmall = useMediaQuery('(max-width: 1400px)'); // same in @/app/page.module.css

  const [searchValue, setSearchValue] = useState<string>(searchParams.get("search") ?? "");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);
  const [sortValue, setSortValue] = useState<string | null>(searchParams.get("sort"));

  const [modalOpened, modalActions] = useDisclosure(false);


  //============= handle search search param =============//
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  //============= handle sort search param =============//
  function handleSort(sort: string) {
    const params = new URLSearchParams(searchParams);
    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  //============= Search side effect =============//
  useEffect(() => {
    handleSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  //============= Sort side effect =============//
  useEffect(() => {
    if (sortValue) {
      switch (sortValue) {
        case "Price: Lowest":
          handleSort("price");
          break;
        case "Price: Highest":
          handleSort("-price");
          break;
        case "Time: Oldest":
          handleSort("datePosted");
          break;
        case "Time: Newest":
          handleSort("-datePosted");
          break;
        default:
          handleSort("");
          break
      }
    }
  }, [sortValue]);

  return (
    <>
      {/*============= Advanced Search and Filters Modal =============*/}
      <Modal
        title="Filters and Advanced Search"
        opened={modalOpened} onClose={modalActions.close}>
        <Flex direction="column" gap={10} align="center">
          <Filters />
          <Divider w="100%" mt={10} mb={10} />
          <AdvancedSearch />
        </Flex>
      </Modal>

      <Flex direction="column" w="100%" gap={10}>
        {/*============= Search Posts =============*/}
        <TextInput
          className={classes.slideUp}
          size="lg"
          radius="md"
          value={searchValue}
          placeholder='Search Posts'
          leftSection={<FaMagnifyingGlass />}
          rightSection={
            <ActionIcon variant='subtle' radius="xl"
              aria-label="Clear input"
              onClick={() => setSearchValue("")}
              style={{ display: searchValue ? undefined : 'none' }}>
              <RxCross1 />
            </ActionIcon>
          }
          onChange={(event) => setSearchValue(event.currentTarget.value)}
        />
        {/*============= Search Settings =============*/}
        <Flex justify="space-between" align="center" className={classes.slideUp}>

          {/*============= Filter Posts Button | count =============*/}
          {screenSmall ?
            <ActionIcon size="lg"
              aria-label="Filter posts"
              className={cx(classes.filterButton, classes.slideUp)}
              onClick={modalActions.open}
              variant="light">
              <IoSettingsSharp />
            </ActionIcon> :
            <Text c="dimmed" fs="italic"
              className={classes.slideUp}
              onClick={() => console.log("Filter posts")}>
              {count} results found
            </Text>
          }

          {/*============= Sort Posts =============*/}
          <Group gap={10}>
            <Text c="dimmed" fs="italic">Sort By</Text>
            <Select size="sm" radius="md"
              w={150}
              data={availableSortValues}
              onChange={(value) => setSortValue(value)}
              defaultValue="Best Match"
              comboboxProps={{
                transitionProps: { transition: 'pop', duration: 200 },
                shadow: 'xl',
                radius: 'md',
                offset: 5,
                width: 150,
              }}
              allowDeselect={false}
              rightSection={
                <ThemeIcon radius="xl" variant="transparent" size="sm">
                  <FaSort />
                </ThemeIcon>
              } />
          </Group>
        </Flex>
      </Flex>
    </>
  );
};

export default dynamic(() => Promise.resolve(Search), {
  ssr: false,
  loading: () => <SearchSkeleton />
});