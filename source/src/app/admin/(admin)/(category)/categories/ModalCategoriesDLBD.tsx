"use client";
import TableBasic from "@/app/components/table/Tablebasic";
import {
  Box,
  Button,
  Group,
  Image,
  LoadingOverlay,
  Modal,
} from "@mantine/core";
import ImageDefult from "../../../../../../public/assets/images/logoDatxe.png";
import { IconArrowBarUp } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategoriesDlbd } from "./until";
import { QUERY_KEY } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useAddCategory } from "../../hooks/category/useAddCategory";
import { useEffect } from "react";
export default function ModalCategoriesDLBD({
  openedModalCategories,
  closeModalCategories,
  profile,
}: any) {
  const router = useRouter();
  const { syncItem, isSuccessSync } = useAddCategory();
  const {
    data: categoriesDlbd,
    isLoading,
    error,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.categoriesDlbd],
    queryFn: () => getCategoriesDlbd(profile),
  });

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "thumbnail",
      dataIndex: ["thumbnail"],
      width: "90px",
      render: (data: any) => {
        if (!data) {
          return (
            <Image
              radius="md"
              src={ImageDefult.src}
              h={40}
              w="auto"
              fit="contain"
            />
          );
        }
        return <Image radius="md " h={40} w={80} fit="contain" src={data} />;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Tên</span>
      ),
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "100px",
      textAlign: "center",
      render: (record: any) => {
        return (
          <Button
            size="md"
            radius={0}
            p={5}
            variant="transparent"
            color="red"
            onClick={(e) => {
              handleSynchronized(record);
            }}
          >
            <IconArrowBarUp size={16} color="blue" />
          </Button>
        );
      },
    },
  ];

  const handleSynchronized = async (data: any) => {
    syncItem(data);
  };
  useEffect(() => {
    if (isSuccessSync) {
      router.refresh();
      closeModalCategories();
    }
  }, [isSuccessSync]);
  return (
    <Modal
      title="Đồng bộ danh mục"
      opened={openedModalCategories}
      onClose={closeModalCategories}
      lockScroll={false}
    >
      <Box>
        <LoadingOverlay
          visible={isLoading}
          zIndex={99}
          loaderProps={{ type: "bars" }}
        />

        <TableBasic data={categoriesDlbd} columns={columns} />
      </Box>
    </Modal>
  );
}
