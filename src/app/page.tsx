import { Flex } from "@mantine/core";
import LandingCarousel from './ui/components/landing/LandingCarousel';
import LandingHero from './ui/components/landing/LandingHero';
import Faq from './ui/components/landing/Faq';
import { FeaturesCards } from './ui/components/landing/FeaturesCards';
import Team from './ui/components/landing/Team';
import { getRandomMedicine } from "@/db/queries";

export default async function HomePage() {
  const randomMeds = await getRandomMedicine(4);

  return (
    <Flex direction="column" w="100%" align="center">
      <Flex wrap="wrap" w="100%" mih={900} justify="center" align="center">
        <LandingHero />
        <LandingCarousel randomMeds={randomMeds} />
      </Flex>

      <Flex bg="var(--mantine-color-main-light)"
        wrap="wrap" w="100%" justify="center" align="center">
        <FeaturesCards />
      </Flex>

      <Flex wrap="wrap" w="100%" justify="center" align="center">
        <Faq />
      </Flex>

      {/* <Flex bg="var(--mantine-color-main-light)"
        wrap="wrap" w="100%" justify="center" align="center">
        <Team />
      </Flex> */}
    </Flex>
  );
}
