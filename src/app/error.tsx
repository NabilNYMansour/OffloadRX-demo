'use client';

import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './error.module.css';

export default function Error({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened... </Title>
        <Text size="lg" ta="center" className={classes.description}>
          Don&apos;t worry, it&apos;s not from your end.
          <br />
          Our development team was already notified.
          <br />
          Try refreshing the page.
        </Text>
        <Group justify="center">
          <Button size="md"
            style={{ transition: "all 0.2s" }}
            onClick={
              () => reset()
            }>
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
}