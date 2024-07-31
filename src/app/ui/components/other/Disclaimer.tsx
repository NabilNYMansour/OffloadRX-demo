"use client";

import { useState } from 'react';
import CenterContainer from '../core/CenterContainer';
import { ActionIcon, Anchor, Card, Group, Text } from '@mantine/core';
import classes from '@/app/core.module.css';
import { IoMdAlert } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';

const Disclaimer = () => {
  const [close, setClosed] = useState(false);

  if (close) {
    return null;
  } else {
    return (
      <CenterContainer props={{ size: 800, mt: 10 }} >
        <Card className={classes.slideUp} bg="red" c="white" w="100%"
          shadow="sm" radius="md" padding="xl" withBorder>
          <Group justify='center' >
            <IoMdAlert color='yellow' size={45} />
            <Text size='xl' ta="center">
              This data is for demonstration purposes only and is taken
              from <Anchor c={"yellow"}
                href="https://www.kaggle.com/datasets/singhnavjot2062001/11000-medicine-details?resource=download">
                Kaggle
              </Anchor>
            </Text>
          </Group>

          <ActionIcon variant='subtle' color='white' radius="xl"
            aria-label="Close Disclaimer"
            onClick={() => setClosed(true)}
            pos="absolute" right={0} top={0} m={5}>
            <RxCross1 size={15} strokeWidth={1} />
          </ActionIcon>
        </Card>
      </CenterContainer>
    );
  }
};

export default Disclaimer;