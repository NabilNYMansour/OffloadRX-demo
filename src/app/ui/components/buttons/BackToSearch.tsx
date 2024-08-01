"use client";

import { Button, Flex } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

const BackToSearch = () => {
  const router = useRouter();

  return (
    <Flex justify="" w="100%">
      <Button
        variant="subtle"
        onClick={() => router.push("/demo")}
        leftSection={<IoIosArrowBack size={20} />}>
        Back to Search
      </Button>
    </Flex>
  );
};

export default BackToSearch;