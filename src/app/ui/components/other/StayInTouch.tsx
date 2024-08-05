"use client";

import { Button, Flex, Text, TextInput } from "@mantine/core";

const StayInTouch = () => {
  return (
    <>
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
    </>
  );
};

export default StayInTouch;