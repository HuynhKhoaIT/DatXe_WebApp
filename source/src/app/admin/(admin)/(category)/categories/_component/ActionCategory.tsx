"use client";
import { Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import dynamic from "next/dynamic";
const DynamicModalCategories = dynamic(() => import("../ModalCategoriesDLBD"));

export default function ActioBarCategory({ session }: any) {
  const [
    openedModalCategories,
    { open: openModalCategories, close: closeModalCategories },
  ] = useDisclosure(false);

  return (
    <>
      <Flex justify={"end"} align={"center"} gap={20}>
        {session?.user?.useDLBD ? (
          <Button
            size="md"
            h={{ base: 42, md: 50, lg: 50 }}
            radius={0}
            onClick={openModalCategories}
            leftSection={<IconPlus size={18} />}
          >
            Đồng bộ
          </Button>
        ) : (
          <></>
        )}
        <Link
          href={{
            pathname: `/admin/category/create`,
          }}
        >
          <Button
            h={{ base: 42, md: 50, lg: 50 }}
            size="md"
            radius={0}
            leftSection={<IconPlus size={18} />}
          >
            Thêm mới
          </Button>
        </Link>
      </Flex>
      {openedModalCategories && (
        <DynamicModalCategories
          openedModalCategories={openedModalCategories}
          closeModalCategories={closeModalCategories}
          profile={session?.user}
        />
      )}
    </>
  );
}
