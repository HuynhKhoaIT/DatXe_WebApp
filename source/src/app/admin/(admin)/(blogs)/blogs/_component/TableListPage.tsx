"use client";
import ImageField from "@/app/components/form/ImageField";
import TableBasic from "@/app/components/table/Tablebasic";
import { AppConstants } from "@/constants";
import { statusOptions } from "@/constants/masterData";
import { Badge, Button, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const DynamicModalDeleteItem = dynamic(
  () => import("@/app/admin/_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
export default function TableListPage({ dataSource, deleteItem }: any) {
  const [deleteRow, setDeleteRow] = useState();
  const router = useRouter();
  const handleDeleteItem = async (id: any) => {
    const res = await deleteItem(id);
    if (res?.data?.success) {
      toast.success("Xoá thành công");
      router.refresh();
    } else {
      toast.error("Xoá thất bại");
    }
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
      name: "thumbnail",
      dataIndex: ["thumbnail"],
      width: "90px",
      render: (data: any) => {
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
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên bài viết
        </span>
      ),
      name: "name",
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
          <>
            <Link
              href={{
                pathname: `/admin/blog/${record.id}`,
              }}
            >
              <Tooltip label="Cập nhật" withArrow position="bottom">
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
              </Tooltip>
            </Link>

            <Tooltip label="Xoá" withArrow position="bottom">
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
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <>
      <TableBasic
        data={dataSource?.data}
        columns={columns}
        totalPage={dataSource?.totalPage}
        onRow={`/admin/blog`}
      />
      {openedDeleteItem && (
        <DynamicModalDeleteItem
          openedDeleteItem={openedDeleteItem}
          closeDeleteItem={closeDeleteItem}
          handleDeleteItem={handleDeleteItem}
          deleteRow={deleteRow}
        />
      )}
    </>
  );
}
