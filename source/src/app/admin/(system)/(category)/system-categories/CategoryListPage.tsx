"use client";
import React, { useState } from "react";
import { Badge, Button, Flex, Image } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { statusOptions } from "@/constants/masterData";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DynamicModalDeleteItem = dynamic(
  () => import("../../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);

export default function CategoryListPage({ dataSource, deleteItem }: any) {
  console.log(dataSource);
  const [deleteRow, setDeleteRow] = useState();
  const router = useRouter();
  const handleDeleteItem = async (id: any) => {
    await deleteItem(id);
    toast.success("Xoá thành công");
    router.refresh();
  };

  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "image",
      dataIndex: ["image"],
      width: "90px",
      render: (data: any) => {
        if (!data) {
          return <ImageField radius="md" height={40} width={80} f />;
        }
        return (
          <ImageField
            radius="md"
            height={40}
            width={80}
            src={data && `${AppConstants.contentRootUrl}${data}`}
          />
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Tên</span>
      ),
      name: "title",
      dataIndex: ["title"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Trạng thái
        </span>
      ),
      name: "status",
      dataIndex: ["status"],
      width: "100px",
      render: (record: any) => {
        const matchedStatus = statusOptions.find(
          (item) => item.value === record
        );
        if (matchedStatus) {
          return (
            <Badge
              variant="light"
              radius={0}
              size="lg"
              color={matchedStatus.color}
              key={record}
            >
              {matchedStatus.label}
            </Badge>
          );
        }
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
      render: (record: any) => {
        return (
          <Flex>
            <Link
              href={{
                pathname: `/admin/system-category/${record.id}`,
              }}
            >
              <Button
                size="lg"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                color="gray"
                p={5}
                onClick={() => {}}
              >
                <IconPencil size={16} color="blue" />
              </Button>
            </Link>
            <Button
              size="lg"
              radius={0}
              p={5}
              variant="transparent"
              color="red"
              onClick={(e) => {
                openDeleteProduct();
                e.stopPropagation();
                setDeleteRow(record.id);
              }}
            >
              <IconTrash size={16} color="red" />
            </Button>
          </Flex>
        );
      },
    },
  ];

  return (
    <div>
      <TableBasic
        data={dataSource?.data}
        columns={columns}
        totalPage={dataSource?.totalPage}
      />

      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
        deleteRow={deleteRow}
      />
    </div>
  );
}
