"use client";
import TableBasic from "@/app/components/table/Tablebasic";
import { Badge, Button, Flex, Image } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import { statusOptions } from "@/constants/masterData";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DynamicModalDeleteItem = dynamic(
  () => import("../../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);

export default function TableListPage({ dataSource, deleteItem }: any) {
  const router = useRouter();
  const [deleteRow, setDeleteRow] = useState();
  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);
  const handleDeleteItem = async (id: any) => {
    const res = await deleteItem(id);
    if (res) {
      toast.success("Xoá thành công");
      router.refresh();
    }
  };

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "banners",
      dataIndex: ["banners"],
      width: "90px",
      render: (data: any) => {
        return (
          <ImageField
            radius="md "
            h={40}
            w={80}
            fit="contain"
            src={data && `${AppConstants.contentRootUrl}${data}`}
          />
        );
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Tiêu đề</span>
      ),
      name: "title",
      dataIndex: ["title"],
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
                pathname: `/admin/slide-banner/${record.id}`,
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
    <Fragment>
      <TableBasic
        data={dataSource?.data || []}
        columns={columns}
        totalPage={dataSource?.totalPage}
      />
      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
        deleteRow={deleteRow}
      />
    </Fragment>
  );
}
