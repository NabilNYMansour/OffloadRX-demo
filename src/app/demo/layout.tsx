import { Flex } from '@mantine/core';
import Disclaimer from '../ui/components/other/Disclaimer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" align="center" justify="center" w="100%">
      {/*============= Disclaimer =============*/}
      <Disclaimer />
      
      {/*============= Main content =============*/}
      {children}
    </Flex >
  );
};

export default Layout;