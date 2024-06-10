"use client";
import { Flex, Pagination } from "@mantine/core";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function PaginationBase({
  activePage,
  setPage,
  totalPage,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);

  const handeSetPage = (page: any) => {
    if (page !== 1) {
      params?.set("page", `${page}`);
    } else {
      params?.delete("page");
    }
    console.log("params", searchParams);
    if (params?.toString()?.length > 0) {
      const path = pathname + "?" + params?.toString();
      router.push(path);
    } else {
      router.push(pathname);
    }
  };

  return (
    <Flex justify={"end"} bg={"#fff"} mt={20}>
      <Pagination
        size="xl"
        total={Number(totalPage)}
        value={activePage}
        onChange={(value) => {
          console.log(value);
          handeSetPage(value);
          if (setPage) setPage(value);
        }}
        mt={"auto"}
      />
    </Flex>
  );
}
