"use client";

import { Card, Divider, Flex, Group, NumberFormatter, Skeleton, Text, Title } from '@mantine/core';
import { useState } from 'react';
import classes from './card.module.css';
import { Image } from '@mantine/core';
import { SelectMedicine } from '@/db/schema';
import dynamic from 'next/dynamic';
import { FaTag } from 'react-icons/fa6';
import { notifications } from '@mantine/notifications';
import { agoCalculator, formatExpiry, isFavourite, toggleFavourite } from '@/app/utils/helpers';
import { MdHandshake } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const size = 250;

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

const PostCard = ({ post }: {
  post: SelectMedicine, // Post type is not excatly same as SelectMedicine but is a subset
}) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  const [datePosted] = useState<Date>(new Date(post.datePosted));
  const [postedAgoString] = useState<string>(
    agoCalculator(Math.floor((new Date().getTime() - datePosted.getTime()) / (1000 * 60 * 60 * 24)))
  );

  const gotoPost = () => {
    router.push(`/post/${post.slug}`);
  }

  // const [isFavourited, setIsFavourited] = useState(isFavourite(post.id));

  // const handleFavourite = () => {
  //   if (!isFavourited) { // not favourited
  //     notifications.show({
  //       title: <Flex align="center" gap={5}>
  //         Added to favourites ⭐
  //       </Flex>,
  //       message: '"' + post.name + '" is added to your favourites.',
  //     });
  //   } else { // was favourited
  //     notifications.show({
  //       title: <Flex align="center" gap={5}>
  //         Removed from favourites ⭐
  //       </Flex>,
  //       message: '"' + post.name + '" is removed from your favourites.',
  //     });
  //   }
  //   toggleFavourite(post.id);
  //   setIsFavourited(!isFavourited);
  // }

  return (
    <Card miw="100%" className={classes.postCard} shadow="sm" radius="md" padding="lg" withBorder>
      <Flex gap={25} className={classes.cardFlex}
        onClick={gotoPost}>

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
          <Group gap={10}>
            <Text fw={700} lineClamp={1} c={post.forSale ? "main" : "yellow"}>
              {post.forSale ?
                <span><FaTag />Selling for:</span> :
                <span><MdHandshake />Wanted for:</span>
              }
            </Text>
            <Title order={post.price ? 1 : 3} lineClamp={1}
              c={post.price ? post.forSale ? "main" : "yellow" : "dimmed"}>
              {post.price ?
                <NumberFormatter prefix="$ " value={post.price} thousandSeparator /> :
                "Please Contact"
              }
            </Title>
          </Group>

          <Text size='xl' fw={900} lineClamp={1} span>{post.name}</Text>
          <Text size='md' fw={900} c="dimmed" lineClamp={2}>{post.composition}</Text>
          <Group>
            <Text size='sm' c="red" span>{"EXP" + formatExpiry(post.expiry)}</Text>
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
      {/* Functionality is not easily implemented with demo */}
      {/* <ActionIcon
        m={5} pos="absolute" right={0} top={0}
        onClick={handleFavourite} radius="xl" size="lg"
        variant='subtle' aria-label='add to favourite'>
        {isFavourited ? <FaStar size={25} /> : <FaRegStar size={25} />}
      </ActionIcon> */}
    </Card >
  );
};

export default dynamic(() => Promise.resolve(PostCard), {
  ssr: false,
  loading: () => <PostCardSkeleton />
});