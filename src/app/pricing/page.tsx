"use client";

import { Badge, Button, Card, Flex, Group, List, Modal, rem, Text, ThemeIcon, Title } from '@mantine/core';
import { useState } from 'react';
import { FaCheck, FaGear } from 'react-icons/fa6';
import { TbMedicalCrossFilled } from "react-icons/tb";
import { BiPlusMedical } from "react-icons/bi";
import { WiStars } from "react-icons/wi";
import { useDisclosure } from '@mantine/hooks';
import StayInTouch from '../ui/components/other/StayInTouch';
import classes from './page.module.css';


const Gears = () => (
  <FaGear size={75} className={classes.spinner} />
);

const prices = {
  plus: {
    monthly: 25,
    yearly: 20,

    monthlyDispeningFee: 3,
    yearlyDispeningFee: 2,
  },
  premium: {
    monthly: 75,
    yearly: 60,

    monthlyDispeningFee: 7,
    yearlyDispeningFee: 6,
  },
}

const Page = () => {
  const [yearly, setYearly] = useState(true);
  const [modalOpened, modalActions] = useDisclosure(false);

  return (
    <>
      <Modal centered radius="md" trapFocus
        classNames={{
          content: classes.content,
        }}
        opened={modalOpened} onClose={modalActions.close}>
        <Flex direction="column" justify="center" align="center" gap={10}>
          <Group justify='center'>
            <Gears />
            <Title>Coming Soon</Title>
          </Group>
          <Text size='sm' ta="center">
            We are working hard to bring you the best experience possible.
            <br />
          </Text>
          <Text size='sm' ta="center">
            Stay tuned for updates.
          </Text>
          <StayInTouch />
        </Flex>
      </Modal>

      <Flex direction="column" justify="center" align="center" w="100%" gap={10} p={20}>
        <Flex direction="column" align="center" mb={20} gap={5}>
          <Title>Pricing</Title>
          <Text size='sm' ta="center">
            Start with a free account, upgrade to unlock more features
          </Text>
        </Flex>

        <Group justify='center' gap={2}>
          <Button radius="xl" variant={yearly ? "transparent" : "filled"}
            onClick={() => setYearly(false)}
            color={yearly ? "dimmed" : "main"}
            style={{ transition: "all 0.2s" }}>
            Monthly
          </Button>

          <Button radius="xl" variant={yearly ? "filled" : "transparent"}
            onClick={() => setYearly(true)}
            color={yearly ? "#815CFF" : "dimmed"}
            style={{ transition: "all 0.2s" }}>
            <Group gap={5}>
              Yearly
              <Badge variant='light' color="#main">save up to 20%</Badge>
            </Group>
          </Button>
        </Group>

        <Group gap={10} m={20} justify='center' align='stretch' w="100%">

          <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 10 }}
            w={300} shadow="sm" radius="md" padding="lg" withBorder>
            <Flex direction="column" gap={10}>
              <Title ta="center" order={4} fw={500}>Basic</Title>

              <Flex direction="column" mih={80}>
                <Group gap={4} justify="center" align='flex-end'>
                  <Title order={1} size={rem(50)}>$0</Title>
                  <Text size='xl' c="dimmed">(free)</Text>
                </Group>
              </Flex>

              <List spacing="xs" size="sm" center
                icon={
                  <ThemeIcon variant='transparent' size={24} radius="xl">
                    <FaCheck />
                  </ThemeIcon>
                }>
                <List.Item>Acess to the marketplace</List.Item>
                <List.Item>3 free listing per month</List.Item>
                <Text size='xs' c="dimmed" pl="xl">+ $10 per extra listing</Text>
                <Text size='xs' c="main" pl="xl"> (equal to one <b>Dispensing Fee</b>)</Text>
                <List.Item>Basic Search and Filters</List.Item>
                <List.Item>Email Support</List.Item>
              </List>
            </Flex>

            <Button
              style={{ transition: "all 0.2s" }}
              onClick={modalActions.open}
              variant='outline' bd="1px solid" color="dimmed">
              Coming Soon
            </Button>
          </Card>

          <Card style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 10,
            overflow: "visible"
          }} w={300} shadow="sm" radius="md" padding="lg" bd="2px solid main">

            <Flex justify="center" w="100%" pos="absolute" left={0} top={0}
              style={{ transform: "translate(0, -50%)" }}>
              <Badge variant='filled'>
                Recommended
              </Badge>
            </Flex>

            <Flex direction="column" gap={10}>
              <Group gap={5} justify='center'>
                <ThemeIcon size="lg" radius="xl" variant='filled'>
                  <TbMedicalCrossFilled size={25} />
                </ThemeIcon>
                <Title ta="center" c="main" size={rem(25)} order={4} fw={700}>Plus</Title>
              </Group>

              <Flex direction="column">
                <Group gap={4} justify="center" align='flex-end'>
                  <Title order={1} size={rem(50)} c="main">${yearly ? prices.plus.yearly : prices.plus.monthly}</Title>
                  <Text size='xl' c="dimmed">/month</Text>
                </Group>
                <Text size='sm' ta="center" c="main">Equal to <b>{
                  yearly ? prices.plus.yearlyDispeningFee : prices.plus.monthlyDispeningFee
                } Dispensing Fees</b>
                </Text>
                {yearly && <Text size='xs' ta="center" c="dimmed">Billed annually</Text>}
              </Flex>

              <Text ta="center">Everything in <b>Basic</b>, and:</Text>

              <List spacing="xs" size="sm" center
                icon={
                  <ThemeIcon variant='transparent' size={24} radius="xl">
                    <FaCheck />
                  </ThemeIcon>
                }>
                <List.Item>50 free listings per month</List.Item>
                <Text size='xs' c="dimmed" pl="xl">+ $5 per extra listing</Text>
                <Text size='xs' c="main" pl="xl">(equal to half a <b>Dispensing Fee</b>)</Text>
                <List.Item>Dedicated Support</List.Item>
                <Text size='xs' c="dimmed" pl="xl">Guaranteed response within <b>48 hours</b></Text>
              </List>
            </Flex>
            <Button
              variant='outline'
              onClick={modalActions.open}
              style={{ transition: "all 0.2s" }}>
              Coming Soon
            </Button>
          </Card>

          <Card style={{
            display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 10,
            boxShadow: "0px 0px 25px 0px #815CFF"
          }} w={300} shadow="sm" radius="md" padding="lg" bd="2px solid #815CFF">
            <Flex direction="column" gap={10}>
              <Group gap={5} justify='center'>
                <ThemeIcon size="lg" radius="xl" variant='filled' color='#815CFF'>
                  <BiPlusMedical size={25} />
                </ThemeIcon>
                <Title ta="center" c="#815CFF" size={rem(25)} order={4} fw={700}>Premium</Title>
              </Group>

              <Flex direction="column">
                <Group gap={4} justify="center" align='flex-end'>
                  <Title order={1} size={rem(50)} c="#815CFF">${yearly ? prices.premium.yearly : prices.premium.monthly}</Title>
                  <Text size='xl' c="dimmed">/month</Text>
                </Group>
                <Text size='sm' ta="center" c="#815CFF">Equal to <b>{
                  yearly ? prices.premium.yearlyDispeningFee : prices.premium.monthlyDispeningFee
                } Dispensing Fees</b></Text>
                {yearly && <Text size='xs' ta="center" c="dimmed">Billed annually</Text>}
              </Flex>

              <Text ta="center">Everything in <b>Plus</b>, and:</Text>

              <List spacing="xs" size="sm" center
                icon={
                  <ThemeIcon variant='transparent' size={24} radius="xl" color='#815CFF'>
                    <FaCheck />
                  </ThemeIcon>
                }>
                <List.Item>Unlimited listing</List.Item>
                <List.Item>
                  <Group gap={5}>
                    <WiStars size={25} />
                    <b>AI Search</b>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group gap={5}>
                    <WiStars size={25} />
                    <b>AI listing auto-fill</b>
                  </Group>
                </List.Item>
                <List.Item>Priority Support</List.Item>
                <Text size='xs' c="dimmed" pl="xl">Guaranteed response within <b>24 hours</b></Text>
              </List>
            </Flex>
            <Button
              color="#815CFF"
              onClick={modalActions.open}
              style={{ transition: "all 0.2s" }}>
              Coming Soon
            </Button>
          </Card>
        </Group>
      </Flex>
    </>
  );
};

export default Page;