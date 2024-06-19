"use client";
import { Button, Flex, Grid, Box, Space } from "@mantine/core";
import { IconArrowDown, IconChevronDown } from "@tabler/icons-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ButtonShowMore({ limitCurrent, defaultValue }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  function handleClick() {
    params?.set("limit", `${Number(limitCurrent) + defaultValue}`);
    const path = pathname + "?" + params?.toString();
    router.push(path);
  }
  return (
    <Flex justify="center" mt={36} mb={20}>
      <Button
        color={"var(--theme-color)"}
        onClick={handleClick}
        variant="transparent"
        rightSection={<IconChevronDown size={18} />}
        // disabled={isFetching}
      >
        Xem Thêm
      </Button>
    </Flex>
  );
}
