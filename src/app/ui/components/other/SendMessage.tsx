"use client";

import { sendMessage } from '@/lib/actions';
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Container, Flex, Text, Box, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';
import { IoSend } from 'react-icons/io5';

export function SendMessage() {
  const isTouchScreen = useMediaQuery('(pointer:coarse)');
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length === 0 ? 'Name is required' : null,
      email: (value) => {
        if (value.trim().length === 0) {
          return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Invalid email format';
        }
        return null;
      },
      subject: (value) => value.trim().length === 0 ? 'Subject is required' : null,
      message: (value) => value.trim().length === 0 ? 'Message is required' : null,
    },
  });

  const handleNewMessage = async (name: string, email: string, subject: string, message: string) => {
    setLoading(true);
    try {
      const result = await sendMessage(name, email, subject, message);
      if (result.error) {
        alert(result.error);
      } else {
        alert("Message sent successfully! We'll get back to you as soon as possible.");
        form.reset();
      }
    } catch (error) {
      alert("Failed to send message! Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box pos="relative">
      <form onSubmit={form.onSubmit(() => {
        handleNewMessage(
          form.values.name,
          form.values.email,
          form.values.subject,
          form.values.message
        )
      })}>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          loaderProps={{ type: 'dots', size: 'xl' }}
          overlayProps={{ radius: "sm", blur: 2 }} />
        <Flex direction="column" w="100%" p={25}>
          <Title
            order={2}
            size="h1"
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
    </Box>
  );
}