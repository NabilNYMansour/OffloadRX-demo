"use client";

import { Card, Flex, Group, Skeleton, Spoiler, Text, Title } from '@mantine/core';
import { useState } from 'react';
import classes from './card.module.css';
import { Image } from '@mantine/core';
import { SelectMedicine } from '@/db/schema';
import dynamic from 'next/dynamic';
import { FaHashtag } from 'react-icons/fa6';
import { formatExpiry } from '@/app/utils/helpers';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { GiChemicalDrop } from 'react-icons/gi';
import { FaCalendarTimes } from 'react-icons/fa';

const size = 350;

export const PostCardFullSkeleton = () => { // Skeleton will not have favourite button
  return (
    <>
      {/*============= Image =============*/}
      <Card miw="100%" className={classes.postCardNoHover} shadow="sm" radius="md" padding="lg" withBorder>
        <Flex miw="100%" direction="column" align="center" gap={25}>
          <Skeleton style={{ borderRadius: "6px" }}
            maw={size + "px"} h={size + "px"} />
        </Flex>
      </Card >

      {/*============= Details =============*/}
      <Card miw="100%" className={classes.postCardNoHover} shadow="sm" radius="md" padding="lg" withBorder>
        <Skeleton height={30} mb={15} w="50%" />
        <Flex direction="column" gap={10}>
          <Skeleton height={26} w="100%" />
          <Skeleton height={26} w="100%" />
          <Skeleton height={26} w="100%" />
          <Skeleton height={26} w="100%" />
        </Flex>
      </Card>

      {/*============= Description =============*/}
      <Card miw="100%" className={classes.postCardNoHover} shadow="sm" radius="md" padding="lg" withBorder>
        <Skeleton height={30} mb={15} w="50%" />
        <Skeleton height={180} w="100%" />
      </Card>
    </>
  );
}

const PostCardFull = ({ post }: {
  post: SelectMedicine, // Post type is not excatly same as SelectMedicine but is a subset
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/*============= Image =============*/}
      <Card miw="100%" className={classes.postCardNoHover} shadow="sm" radius="md" padding="lg" withBorder>
        <Flex miw="100%" direction="column" align="center" gap={25}>
          <Image
            src={post.imgUrl} alt={post.name}
            fit='scale-down' maw={size} mah={size}
            onLoad={() => setLoaded(true)} />
          <Skeleton style={{ borderRadius: "6px", display: loaded ? "none" : "block" }}
            maw={size + "px"} h={size + "px"} />
        </Flex>
      </Card >

      {/*============= Details =============*/}
      <Card miw="100%" className={classes.postCardNoHover} shadow="sm" radius="md" padding="lg" withBorder>
        <Title order={3} mb={15} className={classes.cardTitle}>
          Details
        </Title>
        <Flex direction="column" gap={5}>
          <Group>
            <Group gap={5} justify='center'>
              <Text size='md' c="dimmed" span><MdDriveFileRenameOutline /></Text>
              <Text size='md' c="dimmed" span>Name:</Text>
            </Group>
            <Text size='lg' fw={700} span>{post.name}</Text>
          </Group>

          <Group gap={10}>
            <Group gap={5} justify='center'>
              <Text size='md' c="dimmed" span><GiChemicalDrop /></Text>
              <Text size='md' c="dimmed" span>Composition:</Text>
            </Group>
            <Text size='lg' fw={700} span>{post.composition}</Text>
          </Group>

          <Group gap={10}>
            <Group gap={5} justify='center'>
              <Text size='md' c="dimmed" span><FaCalendarTimes /></Text>
              <Text size='md' c="dimmed" span>Expiry:</Text>
            </Group>
            <Text size='lg' c="red" fw={700} span>{formatExpiry(post.expiry)}</Text>
          </Group>

          <Group gap={10}>
            <Group gap={5} justify='center'>
              <Text size='md' c="dimmed" span><FaHashtag /></Text>
              <Text size='md' c="dimmed" span>Lot Number:</Text>
            </Group>
            <Text size='lg' fw={700} span>{post.lotNumber}</Text>
          </Group>
        </Flex>
      </Card>

      {/*============= Description =============*/}
      <Card miw="100%" className={classes.postCardNoHover} shadow="sm" radius="md" padding="lg" withBorder>
        <Title order={3} mb={15} className={classes.cardTitle}>
          Description
        </Title>
        <Spoiler maxHeight={120} showLabel="Show Description" hideLabel="Hide Description">
          <Text size='md'>{post.description}</Text>
        </Spoiler>
      </Card>
    </>
  );
};

export default dynamic(() => Promise.resolve(PostCardFull), {
  ssr: false,
  loading: () => <PostCardFullSkeleton />,
});