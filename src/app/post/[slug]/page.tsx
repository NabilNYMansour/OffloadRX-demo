import BackToSearch from "@/app/ui/components/buttons/BackToSearch";
import ContactCard from "@/app/ui/components/cards/ContactCard";
import PostCardFull from "@/app/ui/components/cards/PostCardFull";
import CenterContainer from "@/app/ui/components/core/CenterContainer";
import Disclaimer from "@/app/ui/components/other/Disclaimer";
import { agoCalculator } from "@/app/utils/helpers";
import { getMedicineBySlug } from "@/db/queries";
import { SelectMedicine } from "@/db/schema";
import { Flex, Group, NumberFormatter, Text, Title } from "@mantine/core";
import { notFound } from "next/navigation";
import { FaTag } from "react-icons/fa6";
import { MdHandshake } from "react-icons/md";

export default async function Page({ params }: { params: { slug: string } }) {
  const postQuery: SelectMedicine[] = await getMedicineBySlug(params.slug);

  if (postQuery.length === 0) {
    notFound();
  }

  const post = postQuery[0];

  const datePosted = new Date(post.datePosted);
  const postedAgoString = agoCalculator(Math.floor((new Date().getTime() - datePosted.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <CenterContainer props={{ size: 1000, pt: 10 }}>
      <BackToSearch />
      <Flex w="100%" h="100%" wrap="wrap" justify="center" gap={10}>

        <Flex direction="column" w="100%" gap={10}>
          <Title order={1}>
            {post.name}
          </Title>

          <Group gap={10}>
            <Text fw={700} c={post.forSale ? "main" : "yellow"}>
              {post.forSale ?
                <span><FaTag />Selling for:</span> :
                <span><MdHandshake />Wanted for:</span>}
            </Text>

            <Title order={post.price ? 2 : 3}
              c={post.price ? post.forSale ? "main" : "yellow" : "dimmed"}>
              {post.price ?
                <NumberFormatter prefix="$ " value={post.price} thousandSeparator /> :
                "Please Contact"}
            </Title>
          </Group>

          <Text size="md" c="dimmed">
            posted {postedAgoString}
          </Text>
        </Flex>

        <Flex w={650} direction="column" gap={10}>
          <PostCardFull post={post} />
        </Flex>

        <Flex maw={300} flex={1} direction="column" gap={10}>
          <ContactCard post={post} />
          <Disclaimer />
        </Flex>

      </Flex>
    </CenterContainer>
  );
};
