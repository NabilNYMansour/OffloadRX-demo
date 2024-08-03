import { Divider, Flex, Text } from '@mantine/core';
import { SendMessage } from '../components/other/SendMessage';
import Link from 'next/link';

export function Footer() {

  return (
    <Flex direction="column" justify="center" align="center"
      pt="xl" pb="md">
      <SendMessage />

      <Divider my="md" w="80%" />

      <Flex gap={10}>
        <Link href='/privacy' style={{ color: "inherit" }}>
          <Text fz="lg" lh="md">
            Privacy
          </Text>
        </Link>

        <Link href='/terms' style={{ color: "inherit" }}>
          <Text fz="lg" lh="md">
            Terms
          </Text>
        </Link>
      </Flex>

      <Text fz="xs" lh="md">
        © {new Date().getFullYear()} OffloadRx Inc.
      </Text>
    </Flex>
  );
}