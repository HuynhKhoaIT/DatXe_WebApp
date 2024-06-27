import { Button, Flex } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export default function ActionBar({ linkTo, label = "Thêm mới" }: any) {
  return (
    <Flex justify={"end"} align={"center"}>
      <Link
        href={{
          pathname: linkTo,
        }}
      >
        <Button
          size="lg"
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
