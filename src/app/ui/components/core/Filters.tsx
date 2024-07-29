"use client";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from './core.module.css';
import { Button, Card, Checkbox, Flex, Group, NumberInput, Radio, Skeleton, Text, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { GrPowerReset } from "react-icons/gr";
import { DatePickerInput } from '@mantine/dates';
import { FaCalendarDays, FaStar, FaTag } from 'react-icons/fa6';
import { MdHandshake } from 'react-icons/md';
import { OffloadRX } from '../../icons/custom';
import { HiCurrencyDollar } from "react-icons/hi";
import { FaCalendarTimes } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useIsVisible } from '@/app/utils/hooks';

const FiltersSkeleton = () => {
  return (
    <Skeleton radius="md" h={503} w="100%" />
  );
}

const postedRangeInit = (searchParams: ReadonlyURLSearchParams) => {
  let prInit: [Date | null, Date | null] = [null, null];
  const searchSplit = searchParams.get("pr")?.split(',');
  if (searchSplit && searchSplit.length === 2) {
    prInit = [new Date(searchSplit[0]), new Date(searchSplit[1])];
  }
  return prInit
}

const expiryRangeInit = (searchParams: ReadonlyURLSearchParams) => {
  let erInit: [Date | null, Date | null] = [null, null];
  const searchSplit = searchParams.get("er")?.split(',');
  if (searchSplit && searchSplit.length === 2) {
    erInit = [new Date(searchSplit[0]), new Date(searchSplit[1])];
  }
  return erInit
}

const canReset = (searchParams: ReadonlyURLSearchParams) => {
  return searchParams.get("fo") || searchParams.get("type") || searchParams.get("pf") || searchParams.get("pt") || searchParams.get("pr") || searchParams.get("er");
}

const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [favouritesOnly, setFavouritesOnly] = useState<string>(searchParams.get("fo") ?? "");
  const [offloadType, setOffloadType] = useState<string>(searchParams.get("type") ?? "all");

  const [priceFrom, setPriceFrom] = useState<string | number>(searchParams.get("pf") ?? '');
  const [priceTo, setPriceTo] = useState<string | number>(searchParams.get("pt") ?? '');

  const [postedRange, setPostedRange] = useState<[Date | null, Date | null]>(postedRangeInit(searchParams));
  const [expiryRange, setExpiryRange] = useState<[Date | null, Date | null]>(expiryRangeInit(searchParams));

  const ref = useRef(null);
  const isVisible = useIsVisible(ref);

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('fo');
    params.delete('type');
    params.delete('pf');
    params.delete('pt');
    params.delete('pr');
    params.delete('er');
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const initFilters = () => {
    setFavouritesOnly(searchParams.get("fo") ?? "");
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

  //============= Init filters =============//
  useEffect(() => { // when visibility changes or when search params change
    initFilters();
  }, [isVisible, searchParams]);

  //============= Favourites only url param =============//
  function handleFavouritesOnly(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('fo', term);
    } else {
      params.delete('fo');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  useEffect(() => {
    handleFavouritesOnly(favouritesOnly);
  }, [favouritesOnly]);

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
    handleOffloadType(offloadType);
  }, [offloadType]);

  //============= Price from url param =============//
  function handlePriceFrom(term: number | string) {
    const params = new URLSearchParams(searchParams);
    if (term !== "") {
      params.set('pf', term.toString());
    } else {
      params.delete('pf');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  useEffect(() => {
    handlePriceFrom(priceFrom);
  }, [priceFrom]);

  //============= Price to url param =============//
  function handlePriceTo(term: number | string) {
    const params = new URLSearchParams(searchParams);
    if (term !== "") {
      params.set('pt', term.toString());
    } else {
      params.delete('pt');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  useEffect(() => {
    handlePriceTo(priceTo);
  }, [priceTo]);

  //============= Posted range url param =============//
  function handlePostedRange(term: [Date | null, Date | null]) {
    const params = new URLSearchParams(searchParams);
    if (term[0] && term[1]) {
      params.set('pr', term.map(date => date?.toLocaleDateString()).join(','));
    } else {
      params.delete('pr');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  useEffect(() => {
    handlePostedRange(postedRange);
  }, [postedRange]);

  //============= Expiry range url param =============//
  function handleExpiryRange(term: [Date | null, Date | null]) {
    const params = new URLSearchParams(searchParams);
    if (term[0] && term[1]) {
      params.set('er', term.map(date => date?.toLocaleDateString()).join(','));
    } else {
      params.delete('er');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  useEffect(() => {
    handleExpiryRange(expiryRange);
  }, [expiryRange]);

  return (
    <Flex direction="column" ref={ref}>

      <Flex direction="column">
        <Title order={1} ta="center">Filters</Title>
        <Button
          variant='light'
          disabled={!canReset(searchParams)}
          onClick={resetFilters}
          leftSection={<GrPowerReset />}>
          Reset Filters
        </Button>
      </Flex>

      {/*============= Favourites =============*/}
      <Group align='center' gap={5} pt={10}>
        <Text size="xl">Favourites</Text>
        <FaStar />
      </Group>
      <Checkbox
        onChange={(event) => setFavouritesOnly(event.currentTarget.checked ? "1" : "")}
        checked={favouritesOnly === "1"}
        label="Favourites only" />

      {/*============= Offload Type =============*/}
      <Group align='center' gap={5} pt={10}>
        <Text size="xl">Offload Type</Text>
        <OffloadRX size={20} />
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
          value={priceFrom}
          min={0}
          onChange={setPriceFrom} />
        <NumberInput
          placeholder="Max"
          prefix="$"
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
