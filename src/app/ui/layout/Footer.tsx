"use client";

import { Flex, Text } from '@mantine/core';
import classes from './Footer.module.css';
import { usePathname } from 'next/navigation';

export function Footer() {
  const currPath = usePathname();

  if (/\/excalidraw/.test(currPath)) {
    return null;
  }

  return (
    <div className={classes.footer}>
      <Flex direction="column" justify="center" align="center">
        <Text fz="xs" lh="md">
          © {new Date().getFullYear()} OffloadRx Inc.
        </Text>
      </Flex>
    </div>
  );
}