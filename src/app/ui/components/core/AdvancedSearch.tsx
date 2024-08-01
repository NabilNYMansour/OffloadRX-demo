"use client";

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import classes from '@/app/core.module.css';
import { ActionIcon, Button, Card, Flex, Group, Skeleton, TextInput, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { GrPowerReset } from "react-icons/gr";
import React, { useEffect, useRef, useState } from "react";
import { FaCity, FaHashtag, FaLocationDot } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { GiChemicalDrop } from "react-icons/gi";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks';
import { useIsVisible } from '@/app/utils/hooks';

const CustomSearchInput = ({ title, placeholderTitle, icon, value, setValue }:
  {
    title: string, placeholderTitle: string, icon: React.ReactNode,
    value: string, setValue: React.Dispatch<React.SetStateAction<string>>
  }
) => {
  const isTouchScreen = useMediaQuery('(pointer:coarse)');
  return (
    <TextInput
      pt={10}
      label={title}
      radius="md" size={isTouchScreen ? 'lg' : 'sm'}
      value={value}
      placeholder={'Search by ' + placeholderTitle}
      leftSection={icon}
      rightSection={
        <ActionIcon variant='subtle' radius="xl"
          aria-label="Clear input"
          onClick={() => setValue("")}
          style={{ display: value ? undefined : 'none' }}>
          <RxCross1 size={15} />
        </ActionIcon>
      }
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}

const AdvancedSearchSkeleton = () => {
  return (
    <Skeleton radius="md" h={478} w="100%" />
  );
}

const canReset = (searchParams: URLSearchParams) => {
  return searchParams.get("name") || searchParams.get("composition") || searchParams.get("city") || searchParams.get("postal") || searchParams.get("lot");
}

const AdvancedSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [nameValue, setNameValue] = useState<string>(searchParams.get("name") ?? "");
  const [debouncedNameValue] = useDebouncedValue(nameValue, 500);

  const [compositionValue, setCompositionValue] = useState<string>(searchParams.get("composition") ?? "");
  const [debouncedCompositionValue] = useDebouncedValue(compositionValue, 500);

  const [cityValue, setCityValue] = useState<string>(searchParams.get("city") ?? "");
  const [debouncedCityValue] = useDebouncedValue(cityValue, 500);

  const [zipValue, setZipValue] = useState<string>(searchParams.get("postal") ?? "");
  const [debouncedZipValue] = useDebouncedValue(zipValue, 500);

  const [lotValue, setLotValue] = useState<string>(searchParams.get("lot") ?? "");
  const [debouncedLotValue] = useDebouncedValue(lotValue, 500);

  const searches = [
    { title: "Item Name", placeholderTitle: "Name", icon: <MdDriveFileRenameOutline />, value: nameValue, setValue: setNameValue },
    { title: "Chemical Composition", placeholderTitle: "Composition", icon: <GiChemicalDrop />, value: compositionValue, setValue: setCompositionValue },
    { title: "City", placeholderTitle: "City", icon: <FaCity />, value: cityValue, setValue: setCityValue },
    { title: "Postal Code", placeholderTitle: "Postal Code", icon: <FaLocationDot />, value: zipValue, setValue: setZipValue },
    { title: "LOT#", placeholderTitle: "LOT#", icon: <FaHashtag />, value: lotValue, setValue: setLotValue }
  ];

  const ref = useRef(null);
  const isVisible = useIsVisible(ref);

  const initAdvancedSearch = () => {
    setNameValue(searchParams.get("name") ?? "");
    setCompositionValue(searchParams.get("composition") ?? "");
    setCityValue(searchParams.get("city") ?? "");
    setZipValue(searchParams.get("postal") ?? "");
    setLotValue(searchParams.get("lot") ?? "");
  }

  const resetAdvancedSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('name');
    params.delete('composition');
    params.delete('city');
    params.delete('postal');
    params.delete('lot');
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  //============= Init Advanced Search =============//
  useEffect(() => { // when visibility changes or when search params change
    initAdvancedSearch();
  }, [isVisible, searchParams]);

  //============= Url params =============//
  useEffect(() => {
    handleSearchParam('name', debouncedNameValue);
  }, [debouncedNameValue]);

  useEffect(() => {
    handleSearchParam('composition', debouncedCompositionValue);
  }, [debouncedCompositionValue]);

  useEffect(() => {
    handleSearchParam('city', debouncedCityValue);
  }, [debouncedCityValue]);

  useEffect(() => {
    handleSearchParam('postal', debouncedZipValue);
  }, [debouncedZipValue]);

  useEffect(() => {
    handleSearchParam('lot', debouncedLotValue);
  }, [debouncedLotValue]);

  function handleSearchParam(param: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(param, value);
    } else {
      params.delete(param);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <Flex direction="column" w="100%">
      <Flex direction="column">
        <Title order={1} ta="center">Advanced Search</Title>
        <Button
          disabled={!canReset(searchParams)}
          onClick={resetAdvancedSearch}
          style={{ transition: "all 0.2s" }}
          leftSection={<GrPowerReset />}>
          Reset Advanced Search
        </Button>
      </Flex>

      {searches.map((search, index) => (
        <CustomSearchInput
          key={index}
          title={search.title}
          placeholderTitle={search.placeholderTitle}
          icon={search.icon}
          value={search.value}
          setValue={search.setValue} />
      ))}
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
