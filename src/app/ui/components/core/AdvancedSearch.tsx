"use client";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './core.module.css';
import { ActionIcon, Button, Card, Divider, Flex, Group, NumberInput, Skeleton, Text, TextInput, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { GrPowerReset } from "react-icons/gr";
import { DateInput, DatePickerInput } from '@mantine/dates';
import React, { useState } from "react";
import { FaCity, FaHashtag, FaLocationDot, FaMagnifyingGlass } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { IconType } from 'react-icons/lib';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { GiChemicalDrop } from "react-icons/gi";
import { useMediaQuery } from '@mantine/hooks';

const CustomSearchInput = ({ title, placeholderTitle, icon }:
  { title: string, placeholderTitle: string, icon: React.ReactNode }
) => {
  return (
    <TextInput
      pt={10}
      label={title}
      radius="md"
      placeholder={'Search Posts by ' + placeholderTitle}
      leftSection={icon}
      rightSection={
        <ActionIcon variant='subtle' radius="xl"
          aria-label="Clear input"
        // onClick={() => setSearchValue("")}
        // style={{ display: searchValue ? undefined : 'none' }}
        >
          <RxCross1 size={15} />
        </ActionIcon>
      }
    // onChange={(event) => setSearchValue(event.currentTarget.value)}
    />
  );
}

const AdvancedSearchSkeleton = () => {
  return (
    <Skeleton radius="md" h={390} w="100%" />
  );
}

const AdvancedSearch = () => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Flex direction="column" w="100%">

      <Group justify='space-between'>
        <Title order={5}>Advanced Search</Title>
        <Button
          leftSection={<GrPowerReset />}>
          Reset
        </Button>
      </Group>

      <CustomSearchInput
        title="Name"
        placeholderTitle="Name"
        icon={<MdDriveFileRenameOutline />} />

      <CustomSearchInput
        title="Chemical Composition"
        placeholderTitle="Composition"
        icon={<GiChemicalDrop />} />

      <CustomSearchInput
        title="City"
        placeholderTitle="City"
        icon={<FaCity />} />

      <CustomSearchInput
        title="Zip Code"
        placeholderTitle="Zip Code"
        icon={<FaLocationDot />} />

      <CustomSearchInput
        title="LOT#"
        placeholderTitle="LOT#"
        icon={<FaHashtag />} />
    </Flex>
  );
};

const AdvancedSearchCard = () => {
  return (
    <Card className={classes.slideUp} w={300} shadow="sm" radius="md" padding="lg" withBorder>
      <AdvancedSearch />
    </Card>
  );
}

const AdvancedSearchSkeletonCard = () => {
  return (
    <Card className={classes.slideUp} w={300} shadow="sm" radius="md" padding="lg" withBorder>
      <AdvancedSearchSkeleton />
    </Card>
  );
}

export const AdvancedSearchDynamic = dynamic(() => Promise.resolve(AdvancedSearch), {
  ssr: false,
  loading: () => <AdvancedSearchSkeleton />
});

export const AdvancedSearchWrapped = dynamic(() => Promise.resolve(AdvancedSearchCard), {
  ssr: false,
  loading: () => <AdvancedSearchSkeletonCard />
});
