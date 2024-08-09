"use client";

import '@mantine/carousel/styles.css';
import { Flex, Text } from "@mantine/core";
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import PostCard from '../cards/PostCard';
import classes from "./LandingCarousel.module.css";

const LandingCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const isSmallScreen = useMediaQuery('(max-width: 1300px)');

  return (
    <Flex direction="column" justify="center" align="stretch"
      className={classes.carousel}
      w={700} p={20} mah={isSmallScreen ? undefined : 600}>
      {isSmallScreen ?
        <>
          {/* The Carousel is repeated due to some bugs in changing orientation dynamically */}
          <Text size="md" fw={700} p={20} pb={5} ta="center">
            Here are some examples of what you can find on our platform
          </Text>
          <Carousel
            initialSlide={1}
            classNames={classes}
            withControls={false}
            plugins={[autoplay.current]}
            withIndicators loop slideGap={10}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            orientation="horizontal">
            <Carousel.Slide>
              <PostCard city="Toronto"
                composition="Something 1" name="Medicine Name 1"
                description="This is a description.This is a description.This is a description.This is a descriptionThis is a description"
                expiry={new Date()} forSale={true}
                imgUrl="https://via.placeholder.com/250"
                lotNumber="123456" price={100}
                datePosted={new Date()} />
            </Carousel.Slide>

            <Carousel.Slide>
              <PostCard city="Toronto"
                composition="Something 1" name="Medicine Name 1"
                description="This is a description"
                expiry={new Date()} forSale={true}
                imgUrl="https://via.placeholder.com/250"
                lotNumber="123456" price={100}
                datePosted={new Date()} />
            </Carousel.Slide>

            <Carousel.Slide>
              <PostCard city="Toronto"
                composition="Something 1" name="Medicine Name 1"
                description="This is a description"
                expiry={new Date()} forSale={true}
                imgUrl="https://via.placeholder.com/250"
                lotNumber="123456" price={100}
                datePosted={new Date()} />
            </Carousel.Slide>

            <Carousel.Slide>
              <PostCard city="Toronto"
                composition="Something 1" name="Medicine Name 1"
                description="This is a description"
                expiry={new Date()} forSale={true}
                imgUrl="https://via.placeholder.com/250"
                lotNumber="123456" price={100}
                datePosted={new Date()} />
            </Carousel.Slide>
          </Carousel>
        </> :
        <Carousel
          initialSlide={1}
          classNames={classes}
          withControls={false}
          plugins={[autoplay.current]}
          withIndicators loop slideGap={10}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          orientation='vertical'>
          <Carousel.Slide>
            <PostCard city="Toronto"
              composition="Something 1" name="Medicine Name 1"
              description="This is a description.This is a description.This is a description.This is a descriptionThis is a description"
              expiry={new Date()} forSale={true}
              imgUrl="https://via.placeholder.com/250"
              lotNumber="123456" price={100}
              datePosted={new Date()} />
          </Carousel.Slide>

          <Carousel.Slide>
            <PostCard city="Toronto"
              composition="Something 1" name="Medicine Name 1"
              description="This is a description"
              expiry={new Date()} forSale={true}
              imgUrl="https://via.placeholder.com/250"
              lotNumber="123456" price={100}
              datePosted={new Date()} />
          </Carousel.Slide>

          <Carousel.Slide>
            <PostCard city="Toronto"
              composition="Something 1" name="Medicine Name 1"
              description="This is a description"
              expiry={new Date()} forSale={true}
              imgUrl="https://via.placeholder.com/250"
              lotNumber="123456" price={100}
              datePosted={new Date()} />
          </Carousel.Slide>

          <Carousel.Slide>
            <PostCard city="Toronto"
              composition="Something 1" name="Medicine Name 1"
              description="This is a description"
              expiry={new Date()} forSale={true}
              imgUrl="https://via.placeholder.com/250"
              lotNumber="123456" price={100}
              datePosted={new Date()} />
          </Carousel.Slide>
        </Carousel>
      }
    </Flex>
  );
};

export default LandingCarousel;