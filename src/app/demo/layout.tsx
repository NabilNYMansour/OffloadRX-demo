import { Flex } from '@mantine/core';
import Disclaimer from '../ui/components/other/Disclaimer';
import { MAIN_URL } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo",
  description: "Demo page for OffloadRx",
  alternates: {
    canonical: `${MAIN_URL}/demo`,
  }
};

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