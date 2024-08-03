import '@mantine/carousel/styles.css';
import { ActionIcon, Button, Container, Flex, Text, TextInput, Title } from "@mantine/core";
import { RxCross1 } from 'react-icons/rx';
import classes from "./landing.module.css";
import CoolButton from '../buttons/CoolButton';


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
          pharmacies to <Text fw={700} span c="main.9">trade</Text> surplus
          medications, <Text fw={700} span c="main.9">reduce</Text> costs,
          and ensure valuable resources are used <Text fw={700} span c="main.9">effectively</Text>.
        </Text>
      </Container>
      <Flex w="100%" gap={10}>
        <TextInput
          pt={10}
          w="50%"
          radius="md" size="lg"
          placeholder={"Name"} />
        <TextInput
          pt={10}
          w="50%"
          radius="md" size="lg"
          placeholder={"Email"} />
      </Flex>
      <Flex direction="column" w="100%" gap={2}>
        <Button
          style={{ transition: "all 0.2s" }}
          radius="md" w="100%" size='lg'>
          Let's stay in touch!
        </Button>
        <Text size="xs" c="dimmed" ta="center">
          We'll only send updates about our platform and never share your info with anyone.
        </Text>
      </Flex>

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