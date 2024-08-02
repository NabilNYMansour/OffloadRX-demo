"use server";

import { Box, Container, Flex, Text, Title } from "@mantine/core";
import classes from "@/app/home.module.css";

export default async function HomePage() {
  return (
    <Flex wrap="wrap" w="100%" justify="center" align="center">
      <Flex maw={600} miw={400} direction="column" align="center">
        <Title
          p="md"
          c="light-dark(black, white)"
          fz="max(32px, min(5vw, 50px))">
          Connecting Pharmacies and Reducing Waste
        </Title>
        <Container>
          <Text size="lg" mt="md">
            A <Text span size="1.25em"
              fw={700}
              className={classes.highlight}>
              secure marketplace
            </Text> for
            pharmacies to <Text fw={700} span c="main.9">trade</Text> surplus
            medications, <Text fw={700} span c="main.9">reduce</Text> costs,
            and ensure valuable resources are used <Text fw={700} span c="main.9">effectively</Text>.
          </Text>
        </Container>

      </Flex>

      <Box bd="5px solid red" w={800} maw={500} miw={400}>
        heelo wolrd
      </Box>
    </Flex>
  );
}
