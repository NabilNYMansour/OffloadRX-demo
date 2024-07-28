"use client";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './core.module.css';
import { ActionIcon, Button, Card, Checkbox, Flex, Group, NumberInput, Radio, Skeleton, Text, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { GrPowerReset } from "react-icons/gr";
import { DatePickerInput } from '@mantine/dates';
import { useState } from "react";

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

      <Text pt={10} size="xl">Favourites</Text>
      <Checkbox
        label="Favourites only" />

      <Text pt={10} size="xl">Offload Type</Text>

      <Radio.Group
        name="favoriteFramework"
        value={offloadType}
        onChange={setOffloadType}>
        <Flex gap={10} direction="column">
          <Radio value="all" label="All" />
          <Radio value="wo" label="Wanted only" />
          <Radio value="fso" label="For Sale only" />
        </Flex>
      </Radio.Group>


      <Text pt={10} size="xl">Price</Text>
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

      <Text pt={10} size="xl">Date Posted</Text>
      <DatePickerInput
        type="range"
        placeholder="Pick Post dates range"
      />

      <Text pt={10} size="xl">Expiry</Text>
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
