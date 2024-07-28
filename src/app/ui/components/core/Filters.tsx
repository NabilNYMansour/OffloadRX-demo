"use client";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './core.module.css';
import { Button, Card, Checkbox, Flex, Group, NumberInput, Radio, Skeleton, Text, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { GrPowerReset } from "react-icons/gr";
import { DatePickerInput } from '@mantine/dates';
import { useState } from "react";
import {  FaCalendarDays, FaStar, FaTag } from 'react-icons/fa6';
import { MdDateRange, MdHandshake } from 'react-icons/md';
import { OffloadRX } from '../../icons/custom';
import { HiCurrencyDollar } from "react-icons/hi";
import { FaCalendarTimes, FaRegCalendarTimes } from "react-icons/fa";

const FiltersSkeleton = () => {
  return (
    <Skeleton radius="md" h={459} w="100%" />
  );
}

const Filters = () => {
  const [offloadType, setOffloadType] = useState<string>("all");
  return (
    <Flex direction="column">
      <Group justify='space-between'>
        <Title order={5}>Filters</Title>
        <Button
          leftSection={<GrPowerReset />}>
          Reset
        </Button>
      </Group>

      {/*============= Favourites =============*/}
      <Group align='center' gap={5} pt={10}>
        <Text size="xl">Favourites</Text>
        <FaStar />
      </Group>
      <Checkbox
        label="Favourites only" />

      {/*============= Offload Type =============*/}
      <Group align='center' gap={5} pt={10}>
        <Text size="xl">Offload Type</Text>
        <OffloadRX size={20} />
      </Group>
      <Radio.Group
        name="favoriteFramework"
        value={offloadType}
        onChange={setOffloadType}>
        <Flex gap={10} direction="column">
          <Radio value="all" label={<span>All</span>} />
          <Radio value="fso" label={<span><FaTag />Selling only</span>} />
          <Radio value="wo" label={<span><MdHandshake />Wanted only</span>} />
        </Flex>
      </Radio.Group>

      {/*============= Price =============*/}
      <Group align='center' gap={5} pt={10}>
        <Text size="xl">Price</Text>
        <HiCurrencyDollar />
      </Group>
      <Flex gap={10}>
        <NumberInput
          placeholder="Min"
          prefix="$"
          allowNegative={false}
          decimalScale={2}
        />
        <NumberInput
          placeholder="Max"
          prefix="$"
          allowNegative={false}
          decimalScale={2}
        />
      </Flex>

      {/*============= Date Posted =============*/}
      <Group align='center' gap={5} pt={10}>
        <Text size="xl">Date Posted</Text>
        <FaCalendarDays />
      </Group>
      <DatePickerInput
        type="range"
        placeholder="Pick Post dates range"
      />

      {/*============= Expiry =============*/}
      <Group align='center' gap={5} pt={10}>
        <Text size="xl">Expiry</Text>
        <FaCalendarTimes />
      </Group>
      <DatePickerInput
        type="range"
        placeholder="Pick Expiry dates range"
      />
    </Flex>
  );
};

const FiltersCard = () => {
  return (
    <Card className={classes.slideUp} w={300} shadow="sm" radius="md" padding="lg" withBorder>
      <Filters />
    </Card>
  );
}

const FiltersSkeletonCard = () => {
  return (
    <Card className={classes.slideUp} w={300} shadow="sm" radius="md" padding="lg" withBorder>
      <FiltersSkeleton />
    </Card>
  );
}

export const FiltersDynamic = dynamic(() => Promise.resolve(Filters), {
  ssr: false,
  loading: () => <FiltersSkeleton />
});

export const FiltersWrapped = dynamic(() => Promise.resolve(FiltersCard), {
  ssr: false,
  loading: () => <FiltersSkeletonCard />
});
