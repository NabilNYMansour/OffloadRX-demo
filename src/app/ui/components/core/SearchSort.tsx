"use client";

import { Divider, Flex, Group, Modal, Popover, Select, Skeleton, Text, ThemeIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ActionIcon, TextInput } from '@mantine/core';
import { useDebouncedValue, useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { FaMagnifyingGlass, FaSort } from 'react-icons/fa6';
import { RxCross1 } from "react-icons/rx";
import { IoSettingsSharp } from "react-icons/io5";
import classes from '@/app/core.module.css';
import cx from 'clsx';
import { AdvancedSearchDynamic } from "./AdvancedSearch";
import { FiltersDynamic } from "./Filters";
import { FaQuestionCircle } from "react-icons/fa";

const SearchSortSkeleton = () => {
  return (
    <Flex direction="column" w="100%" gap={10}>
      <Skeleton radius="md" h={50} className={classes.slideUp} />
      <Skeleton radius="md" h={42} className={classes.slideUp} />
    </Flex>
  );
}

function getSortValue(key: string): string {
  switch (key) {
    case "Best Match":
      return "";
    case "Price: Lowest":
      return "price";
    case "Price: Highest":
      return "-price";
    case "Time: Oldest":
      return "datePosted";
    case "Time: Newest":
      return "-datePosted";
    default:
      return "";
  }
}

function getSortKey(value: string): string {
  switch (value) {
    case "":
      return "Best Match";
    case "price":
      return "Price: Lowest";
    case "-price":
      return "Price: Highest";
    case "datePosted":
      return "Time: Oldest";
    case "-datePosted":
      return "Time: Newest";
    default:
      return "Best Match";
  }
}

const availableSortValues = [
  "Best Match",
  "Price: Lowest",
  "Price: Highest",
  "Time: Oldest",
  "Time: Newest",
];

const SearchSort = ({ count }: { count: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchValue, setSearchValue] = useState<string>(searchParams.get("search") ?? "");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);
  const [sortValue, setSortValue] = useState<string>(getSortKey(searchParams.get("sort") ?? ""));

  const screenSmall = useMediaQuery('(max-width: 1400px)'); // same in @/app/page.module.css
  const [modalOpened, modalActions] = useDisclosure(false);

  //============= Search url param =============//
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  useEffect(() => {
    handleSearch(debouncedSearchValue);
  }, [debouncedSearchValue]);

  //============= Sort url param =============//
  function handleSort(sort: string) {
    const params = new URLSearchParams(searchParams);
    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  useEffect(() => {
    handleSort(getSortValue(sortValue));
  }, [sortValue]);

  //============= Small Screen side effect =============//
  useEffect(() => {
    if (!screenSmall) {
      modalActions.close();
    }
  }, [screenSmall, modalActions]);

  return (
    <>
      {/*============= Advanced Search and Filters Modal =============*/}
      <Modal
        title="Filters and Advanced Search"
        opened={modalOpened && screenSmall ? screenSmall : false}
        onClose={modalActions.close}>
        <Flex direction="column" gap={10} align="center">
          <FiltersDynamic />
          <Divider w="100%" mt={10} mb={10} />
          <AdvancedSearchDynamic />
        </Flex>
      </Modal>

      <Flex direction="column" w="100%" gap={10}>
        {/*============= Search Posts and ? =============*/}
        <Flex gap={10} align="center" className={classes.slideUp}>

          <Popover width={300} position="bottom" withArrow shadow="md">
            <Popover.Target>
              <ActionIcon size="lg" radius="md" aria-label="What is this">
                <FaQuestionCircle size={20} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm" ta="center">
                This is a demo of how the application would look like. You can search for posts, filter them, and sort them. It showcases the functionality of the platform and gives you an idea of how the final product will look and behave.
              </Text>
            </Popover.Dropdown>
          </Popover>

          <TextInput
            flex={1}
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
        </Flex>
        {/*============= Search Settings =============*/}
        <Flex justify="space-between" align="center" className={classes.slideUp}>

          {/*============= Filter Posts Button | count =============*/}
          {screenSmall ?
            <ActionIcon aria-label="Filter posts"
              size="lg" radius="md"
              className={cx(classes.filterButton, classes.shake)}
              onClick={modalActions.open}>
              <IoSettingsSharp />
            </ActionIcon> :
            <Text c="dimmed" fs="italic" key={count}
              className={classes.shake}>
              {count} results found
            </Text>
          }

          {/*============= Sort Posts =============*/}
          <Group gap={10}>
            <Text c="dimmed" fs="italic">Sort By</Text>
            <Select size="sm" radius="md"
              w={150}
              data={availableSortValues}
              onChange={(value) => setSortValue(value ?? "")}
              defaultValue={sortValue}
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

export default dynamic(() => Promise.resolve(SearchSort), {
  ssr: false,
  loading: () => <SearchSortSkeleton />
});