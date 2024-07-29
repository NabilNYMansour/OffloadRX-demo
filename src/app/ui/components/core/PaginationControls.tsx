"use client";

import { Group, Pagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import classes from '@/app/core.module.css';

const PaginationControls = ({ currentPage, numberOfPages }: { currentPage: number, numberOfPages: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //!!!!!!!!!!!!TODO!!!!!!!!!!!! 
  // potential race condition from all the various useEffects and their use of replace
  // consider using a single useEffect to update the URL in a parent component
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const handlePageChange = (newPage: number, scroll: boolean) => {
    const params = new URLSearchParams(searchParams);
    // minimum of 1 and maximum of numberOfPages
    const page = Math.max(Math.min(newPage, numberOfPages), 1);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    replace(`${pathname}?${params.toString()}`, { scroll });
  }

  useEffect(() => {
    handlePageChange(currentPage, false);
  });

  return (
    <Pagination.Root
      className={classes.slideUp}
      disabled={numberOfPages === 0} total={numberOfPages} value={currentPage}
      siblings={2}
      onChange={(newPage) => {
        handlePageChange(newPage, true);
      }}>
      <Group justify="center" gap={5}>
        <Pagination.First aria-label="Go to first page" />
        <Pagination.Previous aria-label="Go to previous page" />
        <Pagination.Items />
        <Pagination.Next aria-label="Go to next page" />
        <Pagination.Last aria-label="Go to last page" />
      </Group>
    </Pagination.Root>
  );
};

export default PaginationControls;
