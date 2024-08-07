"use client";

import { useState } from 'react';
import CenterContainer from '../core/CenterContainer';
import { ActionIcon, Anchor, Card, Flex, Group, Text } from '@mantine/core';
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
        <Card className={classes.slideUp} bg="yellow" c="white" w="100%"
          shadow="sm" radius="md" padding="md" withBorder>
          <Flex align='center' direction="column" gap={10}>
            <IoMdAlert color='yellow' size={45} />
            <Text size='xl' ta="center">
              This data is for demonstration purposes only and is taken
              from <Anchor c={"white"} underline='always' target='_blank'
                href="https://www.kaggle.com/datasets/singhnavjot2062001/11000-medicine-details?resource=download">
                Kaggle
              </Anchor>.
              <br/>
              Also, the prices are not real and randomally generated.
            </Text>
          </Flex>

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