import { Card, Flex } from "@mantine/core";
import CenterContainer from "./ui/components/other/CenterContainer";
import PostCard from "./ui/components/cards/PostCard";
import PaginationControls from "./ui/components/other/PaginationControls";
import { SearchParams } from "@/lib/types";
import { getAllMedicine, getMedicineCount } from "@/db/queries";

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const page = searchParams["page"] ?? "1";
  const searchTerm = searchParams["search"] ?? "";
  const limit = 6
  const posts = await getAllMedicine(String(searchTerm), Number(page), limit);

  const numberOfPosts = await getMedicineCount(String(searchTerm));
  const numberOfPages = Math.ceil(numberOfPosts[0].count / limit);

  return <CenterContainer>
    <Flex direction="column" gap={10} pt={25} w="100%" align="stretch">
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </Flex>
    <PaginationControls currentPage={Number(page)} numberOfPages={numberOfPages} />
  </CenterContainer>
}
