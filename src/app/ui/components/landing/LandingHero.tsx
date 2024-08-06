import '@mantine/carousel/styles.css';
import { ActionIcon, Button, Container, Flex, Text, TextInput, Title } from "@mantine/core";
import { RxCross1 } from 'react-icons/rx';
import classes from "./landing.module.css";
import CoolButton from '../buttons/CoolButton';
import StayInTouch from '../other/StayInTouch';


const LandingHero = () => {
  return (
    <Flex maw={600} miw={100} direction="column" justify="center" align="center" gap={10} p={20}>
      <Title p="md" c="light-dark(black, white)" fz="max(32px, min(5vw, 50px))">
        Connecting Pharmacies and Reducing Waste
      </Title>
      <Container>
        <Text size="lg" mt="md">
          A <Text span size="1.25em"
            fw={700}
            className={classes.highlight}>
            secure marketplace
          </Text> for
          pharmacies to <Text fw={700} span c="main">trade</Text> surplus
          medications, <Text fw={700} span c="main">reduce</Text> costs,
          and ensure valuable resources are used <Text fw={700} span c="main">effectively</Text>.
        </Text>
      </Container>

      <StayInTouch />

      <CoolButton href="/demo"
        style={{
          width: "100%", textTransform: "none", marginTop: 15, marginBottom: 15,
          paddingTop: 10, paddingBottom: 10, borderRadius: 8,
        }}>
        <Text fz="lg">Or try out our <Text fw={700} fz="xl" span>Demo</Text></Text>
      </CoolButton>
    </Flex>
  );
};

export default LandingHero;