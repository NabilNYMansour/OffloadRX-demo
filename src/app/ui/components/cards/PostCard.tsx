"use client";

import { AspectRatio, Box, Card, Container, Divider, Flex, Group, Loader, Skeleton, Text, Title } from '@mantine/core';
import React from 'react';
import classes from './PostCard.module.css';
import { Image } from '@mantine/core';
import { SelectMedicine } from '@/db/schema';
import dynamic from 'next/dynamic';

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

export const PostCardSkeleton = () => {
  return (
    <Container size={800} w="100%">
      <Card miw="100%" className={classes.card} shadow="sm" radius="md" padding="lg" withBorder>
        <Flex gap={25} miw="100%">
          <Skeleton miw={size + "px"} maw={size + "px"} h={size + "px"} style={{ borderRadius: "6px" }} />
          <Flex direction="column" w="100%">
            <Skeleton height={40} mt={4} mb={4} w="50%" />
            <Skeleton height={70} mt={4} w="60%" />
            <Divider mt={10} mb={10} w="0%" />
            <Skeleton height={105} w="100%" />
          </Flex>
        </Flex>
      </Card >
    </Container>
  );
}

const PostCard = ({ post }: { post: SelectMedicine }) => {
  const [loaded, setLoaded] = React.useState(false);

  const datePosted = new Date(post.datePosted);
  const days = Math.floor((new Date().getTime() - datePosted.getTime()) / (1000 * 60 * 60 * 24));

  const ago = agoCalculator(days);
  return (
    <Container size={800} w="100%">
      <Card miw="100%" className={classes.card} shadow="sm" radius="md" padding="lg" withBorder>
        <Flex gap={25} miw="100%">

          {/* Image */}
          <Flex miw={size + "px"} maw={size + "px"} h={size + "px"} align="center" justify="center"
            bd="5px solid red"
            style={{ borderRadius: "6px", overflow: "hidden", display: loaded ? "block" : "none" }}>
            <Image
              src={post.imgUrl} alt={post.name}
              fit='scale-down' width={size} height={size}
              onLoad={() => setLoaded(true)} />
          </Flex>
          <Skeleton style={{ borderRadius: "6px", display: loaded ? "none" : "block" }}
            miw={size + "px"} maw={size + "px"} h={size + "px"} />
          <Flex direction="column" w="100%">
            <Title lineClamp={1} c="main">{post.price}</Title>
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
              <Text c="dimmed">posted {ago}</Text>
            </Group>
            <Text size='sm' lineClamp={3}>{post.description}</Text>
          </Flex>
        </Flex>
      </Card >
    </Container>
  );
};

export default dynamic(() => Promise.resolve(PostCard), {
  ssr: false,
  loading: () => <PostCardSkeleton />
});