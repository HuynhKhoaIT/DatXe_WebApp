"use client";
import TableBasic from "@/app/components/table/Tablebasic";
import { DATE_FORMAT_DISPLAY, ORDER_CANCEL, ORDER_DONE } from "@/constants";
import { ActionIcon, Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
const DynamicModalDeleteItem = dynamic(
  () => import("../../../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
export default function TableListPage({ dataSource, deleteItem }: any) {
  const router = useRouter();
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteItem = async (id: string) => {
    await deleteItem(id);
  };

  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Mã ĐH</span>
      ),
      name: "code",
      dataIndex: ["code"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên khách hàng
        </span>
      ),
      name: "fullName",
      dataIndex: ["fullname"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Số điện thoại
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["phone"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Biển số xe
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["licensePlates"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Ngày đặt lịch
        </span>
      ),
      name: "dateSchedule",
      dataIndex: ["dateSchedule"],
      textAlign: "right",
      render: (dataRow: any) => {
        return <span>{dayjs(dataRow).format(DATE_FORMAT_DISPLAY)}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giờ</span>
      ),
      name: "time",
      dataIndex: ["time"],
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
      render: (record: any) => {
        const deleteDisabled =
          record?.orderDLBDId ||
          record?.step == ORDER_DONE ||
          record?.step == ORDER_CANCEL;

        return (
          <>
            <Tooltip label="Cập nhật" withArrow position="bottom">
              <Button
                size="md"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                p={5}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/admin/booking-ttdk/${record?.id}`);
                }}
              >
                <IconPencil size={16} color="blue" />
              </Button>
            </Tooltip>
            {!deleteDisabled && (
              <Tooltip label="Xoá" withArrow position="bottom">
                <ActionIcon
                  size="md"
                  radius={0}
                  p={5}
                  variant="transparent"
                  onClick={(e) => {
                    // openDeleteProduct();
                    // setDeleteRow(record.id);
                    e.stopPropagation();
                  }}
                >
                  <IconTrash size={16} color={"red"} />
                </ActionIcon>
              </Tooltip>
            )}
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
        onRow={`/admin/booking-ttdk`}
      />
      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
        deleteRow={deleteRow}
      />
    </>
  );
}
