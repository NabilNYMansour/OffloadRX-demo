"use client";

import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container, Flex, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { IoSend } from 'react-icons/io5';

export function SendMessage() {
  const isTouchScreen = useMediaQuery('(pointer:coarse)');
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => { })}>
      <Flex direction="column" w="100%" p={25}>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
          fw={900}
          ta="center">
          Got a question?
        </Title>
        <Text size="xs" c="dimmed" ta="center">
          Send us a message and we&apos;ll get back to you as soon as possible.
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <TextInput
            size={isTouchScreen ? "lg" : "md"}
            radius="md"
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
            {...form.getInputProps('name')} />
          <TextInput
            size={isTouchScreen ? "lg" : "md"}
            radius="md"
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            {...form.getInputProps('email')} />
        </SimpleGrid>

        <TextInput
          size={isTouchScreen ? "lg" : "md"}
          radius="md"
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
          {...form.getInputProps('subject')} />
        <Textarea
          radius="md"
          size={isTouchScreen ? "lg" : "md"}
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={5}
          rows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps('message')} />

        <Group justify="center" mt="sm">
          <Button
            size={isTouchScreen ? "lg" : "md"}
            radius="md"
            style={{ transition: "all 0.2s" }}
            rightSection={<IoSend size={20} />}
            type="submit">
            Send message
          </Button>
        </Group>
      </Flex>
    </form>
  );
}