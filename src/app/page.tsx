"use server";

import { SearchParams } from "@/lib/types";
import { Flex} from "@mantine/core";


export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Flex w="100%" pt={10} justify="center">
      Hello world
    </Flex>
  );
}
