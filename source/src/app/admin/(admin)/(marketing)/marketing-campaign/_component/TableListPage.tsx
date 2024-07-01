"use client";
import TableBasic from "@/app/components/table/Tablebasic";
import { Fragment, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Badge, Button, Flex, Tooltip } from "@mantine/core";
import { statusOptions } from "@/constants/masterData";
import Link from "next/link";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const DynamicModalDeleteItem = dynamic(
  () => import("../../../../_component/ModalDeleteItem"),
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
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên chương trình
        </span>
      ),
      name: "title",
      dataIndex: ["title"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Sản phẩm</span>
      ),
      name: "detail",
      dataIndex: ["detail"],
      textAlign: "center",
      render: (dataRow: any) => {
        return <span>{dataRow ? dataRow?.length : 0} Sản phẩm</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Thời gian bắt đầu
        </span>
      ),
      name: "dateTimeStart",
      dataIndex: ["dateTimeStart"],
      width: "200px",
      render: (dataRow: number) => {
        return (
          <span>
            {dataRow ? dayjs(dataRow).format("DD-MM-YYYY HH:MM") : null}
          </span>
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Thời gian kết thúc
        </span>
      ),
      name: "dateTimeEnd",
      dataIndex: ["dateTimeEnd"],
      width: "200px",
      render: (dataRow: number) => {
        return (
          <span>
            {dataRow ? dayjs(dataRow).format("DD-MM-YYYY HH:MM") : null}
          </span>
        );
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
              size="md"
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
                pathname: `/admin/marketing-detail/${record.id}`,
              }}
            >
              <Tooltip label="Cập nhật" withArrow position="bottom">
                <Button
                  size="md"
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
                size="md"
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
    <Fragment>
      <TableBasic
        data={dataSource?.data}
        columns={columns}
        totalPage={dataSource?.totalPage}
        onRow={`/admin/marketing-detail`}
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
