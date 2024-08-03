"use client";

import '@mantine/carousel/styles.css';
import { Container, Flex, Text, Title } from "@mantine/core";
import LandingCarousel from './ui/components/landing/LandingCarousel';
import PostCard from './ui/components/cards/PostCard';
import LandingHero from './ui/components/landing/LandingHero';
import Faq from './ui/components/landing/Faq';
import { FeaturesCards } from './ui/components/landing/FeaturesCards';

export default async function HomePage() {
  return (
    <Flex direction="column" w="100%" align="center">
      <Flex wrap="wrap" w="100%" mih={800} justify="center" align="center">
        <LandingHero />
        <LandingCarousel />
      </Flex>
      
      <Flex wrap="wrap" w="100%" bg="var(--mantine-color-main-light)" justify="center" align="center">
        <FeaturesCards />
      </Flex>

      <Faq />
    </Flex>
  );
}
