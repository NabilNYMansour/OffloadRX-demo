"use client";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from '@/app/core.module.css';
import { Button, Card, Checkbox, Flex, Group, NumberInput, Radio, Skeleton, Text, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { GrPowerReset } from "react-icons/gr";
import { DatePickerInput } from '@mantine/dates';
import { FaCalendarDays, FaStar, FaTag } from 'react-icons/fa6';
import { MdHandshake } from 'react-icons/md';
import { OffloadRx } from '../../icons/custom';
import { HiCurrencyDollar } from "react-icons/hi";
import { FaCalendarTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useIsVisible } from '@/app/utils/hooks';
import { useDebouncedValue, useLocalStorage, useMediaQuery } from '@mantine/hooks';

const FiltersSkeleton = () => {
  return (
    <Skeleton radius="md" h={440} w="100%" />
  );
}

const postedRangeInit = (searchParams: URLSearchParams) => {
  let prInit: [Date | null, Date | null] = [null, null];
  const searchSplit = searchParams.get("pr")?.split(',');
  if (searchSplit && searchSplit.length === 2) {
    prInit = [new Date(searchSplit[0]), new Date(searchSplit[1])];
  }
  return prInit;
}

const expiryRangeInit = (searchParams: URLSearchParams) => {
  let erInit: [Date | null, Date | null] = [null, null];
  const searchSplit = searchParams.get("er")?.split(',');
  if (searchSplit && searchSplit.length === 2) {
    erInit = [new Date(searchSplit[0]), new Date(searchSplit[1])];
  }
  return erInit;
}

const canReset = (searchParams: ReadonlyURLSearchParams) => {
  return searchParams.get("type") || searchParams.get("pf") || searchParams.get("pt") || searchParams.get("pr") || searchParams.get("er");
}

const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const isTouchScreen = useMediaQuery('(pointer:coarse)');

  const [offloadType, setOffloadType] = useState<string>(searchParams.get("type") ?? "all");
  const [debouncedOffloadType] = useDebouncedValue(offloadType, 500);

  const [priceFrom, setPriceFrom] = useState<string | number>(searchParams.get("pf") ?? '');
  const [debouncedPriceFrom] = useDebouncedValue(priceFrom, 500);

  const [priceTo, setPriceTo] = useState<string | number>(searchParams.get("pt") ?? '');
  const [debouncedPriceTo] = useDebouncedValue(priceTo, 500);

  const [postedRange, setPostedRange] = useState<[Date | null, Date | null]>(postedRangeInit(searchParams));
  const [debouncedPostedRange] = useDebouncedValue(postedRange, 500);

  const [expiryRange, setExpiryRange] = useState<[Date | null, Date | null]>(expiryRangeInit(searchParams));
  const [debouncedExpiryRange] = useDebouncedValue(expiryRange, 500);

  const ref = useRef(null);
  const isVisible = useIsVisible(ref);

  const initFilters = (searchParams: URLSearchParams) => {
    setOffloadType(searchParams.get("type") ?? "all");

    const pf = searchParams.get("pf");
    if (pf === "" || pf === null) {
      setPriceFrom('');
    } else {
      setPriceFrom(parseFloat(pf));
    }
    const pt = searchParams.get("pt");
    if (pt === "" || pt === null) {
      setPriceTo('');
    } else {
      setPriceTo(parseFloat(pt));
    }

    setPostedRange(postedRangeInit(searchParams));
    setExpiryRange(expiryRangeInit(searchParams));
  }

  const resetFilters = async () => {
    const params = new URLSearchParams(searchParams);
    params.delete('type');
    params.delete('pf');
    params.delete('pt');
    params.delete('pr');
    params.delete('er');
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  //============= Init filters =============//
  useEffect(() => { // when visibility changes or when search params change
    initFilters(searchParams);
  }, [isVisible, searchParams]);

  //============= Offload type url param =============//
  function handleOffloadType(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term !== "all") {
      params.set('type', term);
    } else {
      params.delete('type');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  useEffect(() => {
    handleOffloadType(debouncedOffloadType);
  }, [debouncedOffloadType]);

  //============= Price url param =============//
  function handlePriceChange(term: number | string, paramName: string) {
    const params = new URLSearchParams(searchParams);
    if (term !== "") {
      params.set(paramName, term.toString());
    } else {
      params.delete(paramName);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  useEffect(() => {
    handlePriceChange(debouncedPriceFrom, "pf");
  }, [debouncedPriceFrom]);

  useEffect(() => {
    handlePriceChange(debouncedPriceTo, "pt");
  }, [debouncedPriceTo]);

  //============= Range url param =============//
  function handleRange(term: [Date | null, Date | null], paramName: string) {
    const params = new URLSearchParams(searchParams);
    if (term[0] && term[1]) {
      const d1 = term[0] ? term[0].toISOString().slice(0, 10).replace(/-/g, '/') : null;
      const d2 = term[1] ? term[1].toISOString().slice(0, 10).replace(/-/g, '/') : null;
      params.set(paramName, `${d1},${d2}`);
    } else {
      params.delete(paramName);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  useEffect(() => {
    handleRange(debouncedPostedRange, 'pr');
  }, [debouncedPostedRange]);

  useEffect(() => {
    handleRange(debouncedExpiryRange, 'er');
  }, [debouncedExpiryRange]);

  return (
    <Flex direction="column" ref={ref}>

      <Flex direction="column">
        <Title order={1} ta="center">Filters</Title>
        <Button
          disabled={!canReset(searchParams)}
          onClick={async () => await resetFilters()}
          style={{ transition: "all 0.2s" }}
          leftSection={<GrPowerReset />}>
          Reset Filters
        </Button>
      </Flex>

      {/*============= Offload Type =============*/}
      <Group align='center' gap={5} pt={10}>
        <Text size="xl">Offload Type</Text>
        <OffloadRx size={20} />
      </Group>
      <Radio.Group
        name="offloadType"
        value={offloadType}
        onChange={setOffloadType}>
        <Flex gap={10} direction="column">
          <Radio value="all" label={<span>All</span>} />
          <Radio value="selling" label={<span><FaTag />Selling only</span>} />
          <Radio value="wanted" label={<span><MdHandshake />Wanted only</span>} />
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
          size={isTouchScreen ? "lg" : "sm"}
          value={priceFrom}
          min={0}
          onChange={setPriceFrom} />
        <NumberInput
          placeholder="Max"
          prefix="$"
          size={isTouchScreen ? "lg" : "sm"}
          value={priceTo}
          min={0}
          onChange={setPriceTo} />
      </Flex>

      {/*============= Date Posted =============*/}
      <Group align='center' gap={5} pt={10}>
        <Text size="xl">Date Posted</Text>
        <FaCalendarDays />
      </Group>
      <DatePickerInput
        type="range"
        value={postedRange}
        onChange={setPostedRange}
        placeholder="Pick Post dates range"
      />

      {/*============= Expiry =============*/}
      <Group align='center' gap={5} pt={10}>
        <Text size="xl">Expiry</Text>
        <FaCalendarTimes />
      </Group>
      <DatePickerInput
        type="range"
        value={expiryRange}
        onChange={setExpiryRange}
        placeholder="Pick Expiry dates range"
      />
    </Flex >
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
