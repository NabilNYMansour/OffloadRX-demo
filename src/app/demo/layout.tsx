import { Anchor, Box, Card, Flex, Group, Text } from '@mantine/core';
import classes from '@/app/core.module.css';
import CenterContainer from '../ui/components/core/CenterContainer';
import { IoMdAlert } from "react-icons/io";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" align="center" justify="center" w="100%">
      {/*============= Disclaimer =============*/}
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
        </Card>
      </CenterContainer>

      {/*============= Main content =============*/}
      {children}
    </Flex >
  );
};

export default Layout;