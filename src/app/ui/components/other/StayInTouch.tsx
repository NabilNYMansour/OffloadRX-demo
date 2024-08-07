"use client";

import { Box, Button, Flex, LoadingOverlay, Text, TextInput } from "@mantine/core";
import { addToMailingList } from "@/lib/actions";
import { useForm } from "@mantine/form";
import { useState } from "react";

const StayInTouch = ({ close }: { close?: () => void }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },

    validate: {
      name: (value) => value.length > 0 ? null : 'Name is required',
      email: (value) => {
        if (value.length === 0) {
          return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Invalid email format';
        }
        return null;
      },
    },
  });

  const handleNewMailingList = async (name: string, email: string) => {
    setLoading(true);
    try {
      const result = await addToMailingList(name, email);
      if (result.error) {
        alert(result.error);
      } else {
        alert("Successfully added to mailing list! Stay tuned for updates.");
        form.reset();
        if (close) close();
      }
    } catch (error) {
      alert("Failed to add to mailing list! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box pos="relative">
      <form onSubmit={form.onSubmit((values) => handleNewMailingList(values.name, values.email))}>
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          loaderProps={{ type: 'dots', size: 'xl' }}
          overlayProps={{ radius: "sm", blur: 2 }} />

        <Flex direction="column" gap={10}>
          <Flex w="100%" gap={10}>
            <TextInput
              key={form.key('name')}
              {...form.getInputProps('name')}
              data-autofocus
              pt={10} w="50%" radius="md" size="lg"
              label="Name"
              placeholder="Your name"
              name="name" />
            <TextInput
              key={form.key('email')}
              {...form.getInputProps('email')}
              pt={10} w="50%" radius="md" size="lg"
              label="Email"
              placeholder="Your email"
              name="email" />
          </Flex>
          <Flex direction="column" w="100%" gap={2}>
            <Button
              type="submit"
              style={{ transition: "all 0.2s" }}
              radius="md" w="100%" size='lg'>
              Let&apos;s stay in touch!
            </Button>
            <Text size="xs" c="dimmed" ta="center">
              We&apos;ll only send updates about our platform and never share your info with anyone.
            </Text>
          </Flex>
        </Flex>
      </form>
    </Box>
  );
};

export default StayInTouch;