"use client";

import { ActionIcon, AspectRatio, Box, Card, Container, Divider, Flex, Group, Loader, NumberFormatter, Skeleton, Text, Title } from '@mantine/core';
import React, { use, useEffect, useState } from 'react';
import classes from './PostCard.module.css';
import { Image } from '@mantine/core';
import { SelectMedicine } from '@/db/schema';
import dynamic from 'next/dynamic';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import { notifications } from '@mantine/notifications';

const size = 250;

const agoCalculator = (days: number) => {
  var months = Math.floor(days / 30);
  days = days - months * 30;
  var weeks = Math.floor(days / 7);
  days = Math.floor(days - weeks * 7);
  if (months > 0) {
    return months + " month" + (months > 1 ? "s" : "") + " ago";
  } else if (weeks > 0) {
    return weeks + " week" + (weeks > 1 ? "s" : "") + " ago";
  } else if (days > 0) {
    return days + " day" + (days > 1 ? "s" : "") + " ago";
  } else {
    return "today";
  }
}

export const PostCardSkeleton = () => { // Skeleton will not have favourite button
  return (
    <Card miw="100%" className={classes.postCard} shadow="sm" radius="md" padding="lg" withBorder>
      <Flex gap={25} miw="100%" className={classes.cardFlex}>
        <Skeleton miw={size + "px"} maw={size + "px"} h={size + "px"} style={{ borderRadius: "6px" }} />
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

const PostCard = ({ post }: { post: SelectMedicine }) => {
  const [loaded, setLoaded] = React.useState(false);

  const [datePosted] = useState<Date>(new Date(post.datePosted));
  const [postedAgoString] = useState<string>(
    agoCalculator(Math.floor((new Date().getTime() - datePosted.getTime()) / (1000 * 60 * 60 * 24)))
  );

  const [isFavourite, setIsFavourite] = useState(localStorage.getItem(post.slug) !== null);

  const handleFavourite = () => {
    if (!isFavourite) { // not favourited so add to favourites
      notifications.show({
        title: <Flex align="center" gap={5}>
          Added to favourites ⭐
        </Flex>,
        message: '"' + post.name + '" is added to your favourites.',
      });
      localStorage.setItem(post.slug, JSON.stringify("1")); // store in local storage (only care about key not value)
    } else { // was favourited so remove from favourites
      notifications.show({
        title: <Flex align="center" gap={5}>
          Removed from favourites ⭐
        </Flex>,
        message: '"' + post.name + '" is removed from your favourites.',
      });
      localStorage.removeItem(post.slug);
    }
    setIsFavourite(!isFavourite);
  }

  return (
    <Card miw="100%" className={classes.postCard} shadow="sm" radius="md" padding="lg" withBorder>
      <Flex gap={25} className={classes.cardFlex}>

        {/*============= Image =============*/}
        <>
          <Flex miw={size + "px"} maw={size + "px"} h={size + "px"} align="center" justify="center"
            style={{ borderRadius: "6px", overflow: "hidden", display: loaded ? "block" : "none" }}>
            <Image
              src={post.imgUrl} alt={post.name}
              fit='scale-down' width={size} height={size}
              onLoad={() => setLoaded(true)} />
          </Flex>
          <Skeleton style={{ borderRadius: "6px", display: loaded ? "none" : "block" }}
            miw={size + "px"} maw={size + "px"} h={size + "px"} />
        </>

        {/*============= Text =============*/}
        <Flex direction="column" w="100%">
          <Title lineClamp={1} c="main">
            <NumberFormatter prefix="$ " value={post.price} thousandSeparator />
          </Title>
          <Text size='xl' fw={900} lineClamp={1} span>{post.name}</Text>
          <Text size='md' fw={900} c="dimmed" lineClamp={2}>{post.composition}</Text>
          <Group>
            <Text size='sm' c="red" span>{post.expiry}</Text>
            <Divider orientation='vertical' />
            <Text size='sm' c="dimmed" span>{post.lotNumber}</Text>
          </Group>
          <Divider mt={10} mb={10} w="100%" />
          <Group>
            <Text c="dimmed">{post.city}</Text>
            <Divider orientation='vertical' />
            <Text c="dimmed">posted {postedAgoString}</Text>
          </Group>
          <Text size='sm' lineClamp={3}>{post.description}</Text>
        </Flex>
      </Flex>

      {/*============= Favourite =============*/}
      <ActionIcon
        m={5} pos="absolute" right={0} top={0}
        onClick={handleFavourite} radius="xl" size="lg"
        variant='subtle' aria-label='add to favourite'>
        {isFavourite ? <FaStar size={25} /> : <FaRegStar size={25} />}
      </ActionIcon>
    </Card >
  );
};

export default dynamic(() => Promise.resolve(PostCard), {
  ssr: false,
  loading: () => <PostCardSkeleton />
});