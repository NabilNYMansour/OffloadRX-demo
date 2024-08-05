"use client";

import { Card, Divider, Flex, Group, NumberFormatter, Skeleton, Text, Title } from '@mantine/core';
import { useState } from 'react';
import classes from './card.module.css';
import { Image } from '@mantine/core';
import dynamic from 'next/dynamic';
import { FaTag } from 'react-icons/fa6';
import { agoCalculator, formatExpiry } from '@/app/utils/helpers';
import { MdHandshake } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const size = 250;

export const PostCardSkeleton = () => {
  return (
    <Card miw="100%" className={classes.postCardNoHover} shadow="sm" radius="md" padding="lg" withBorder>
      <Flex gap={25} miw="100%" className={classes.cardFlex}>
        <Skeleton miw={size + "px"} maw={size + "px"} h={size + "px"} style={{ borderRadius: "8px" }} />
        <Flex direction="column" w="100%">
          <Skeleton height={40} mt={4} mb={4} w="50%" />
          <Skeleton height={70} mt={4} w="60%" />
          <Divider mt={10} mb={10} w="0%" />
          <Skeleton height={105} w="100%" />
        </Flex>
      </Flex>
    </Card >
  );
}

const PostCard = ({
  name, composition,
  datePosted, expiry,
  imgUrl, forSale, price,
  lotNumber, city, description,

  slug,
}: {
  name: string,
  composition: string,
  datePosted: Date,
  expiry: Date,
  imgUrl: string,
  forSale: boolean,
  price: number | null,
  lotNumber: string,
  city: string,
  description: string
  
  slug?: string, // if slug is not provided, the card will not be clickable
}) => {
  const [loaded, setLoaded] = useState(false);
  const { push } = useRouter();

  const handleAgo = () => {
    return agoCalculator(Math.floor((new Date().getTime() - datePosted.getTime()) / (1000 * 60 * 60 * 24)));
  }

  const gotoPost = () => {
    push(`/post/${slug}`);
  }

  return (
    <Card miw="100%" className={slug ? classes.postCard : classes.postCardNoHover} shadow="sm" radius="md" padding="lg" withBorder>
      <Flex gap={25}
        className={classes.cardFlex}
        onClick={slug ? gotoPost : undefined}>

        {/*============= Image =============*/}
        <>
          <Flex miw={size + "px"} maw={size + "px"} h={size + "px"} align="center" justify="center"
            style={{ borderRadius: "8px", overflow: "hidden", display: loaded ? "block" : "none" }}>
            <Image
              src={imgUrl} alt={name}
              fit='scale-down' width={size} height={size}
              onLoad={() => setLoaded(true)} />
          </Flex>
          <Skeleton style={{ borderRadius: "8px", display: loaded ? "none" : "block" }}
            miw={size + "px"} maw={size + "px"} h={size + "px"} />
        </>

        {/*============= Text =============*/}
        <Flex direction="column" w="100%">
          <Group gap={10}>
            <Text fw={700} lineClamp={1} c={forSale ? "main" : "yellow"}>
              {forSale ?
                <span><FaTag />Selling for:</span> :
                <span><MdHandshake />Wanted for:</span>
              }
            </Text>
            <Title order={price ? 1 : 3} lineClamp={1}
              c={price ? forSale ? "main" : "yellow" : "dimmed"}>
              {price ?
                <NumberFormatter prefix="$ " value={price} thousandSeparator /> :
                "Please Contact"
              }
            </Title>
          </Group>
          <Text size='xl' fw={900} lineClamp={1} span>{name}</Text>
          <Text size='md' fw={900} c="dimmed" lineClamp={2}>{composition}</Text>
          <Group>
            <Text size='sm' c="red" span>{"EXP" + formatExpiry(expiry)}</Text>
            <Divider orientation='vertical' />
            <Text size='sm' c="dimmed" span>{lotNumber}</Text>
          </Group>
          <Divider mt={10} mb={10} w="100%" />
          <Group>
            <Text c="dimmed">{city}</Text>
            <Divider orientation='vertical' />
            <Text c="dimmed">posted {handleAgo()}</Text>
          </Group>
          <Text size='sm' lineClamp={3}>{description}</Text>
        </Flex>
      </Flex>
    </Card >
  );
};

export default dynamic(() => Promise.resolve(PostCard), {
  ssr: false,
  loading: () => <PostCardSkeleton />
});