import { Button, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export default function ActionBar({ linkTo, label = "Thêm mới", style }: any) {
  return (
    <Flex justify={"end"} align={"center"} style={style}>
      <Link href={linkTo}>
        <Button
          size="md"
          h={{ base: 42, md: 50, lg: 50 }}
          radius={0}
          leftSection={<IconPlus size={18} />}
        >
          {label}
        </Button>
      </Link>
    </Flex>
  );
}
