"use client";
import TableBasic from "@/app/components/table/Tablebasic";
import { ORDER_CANCEL, ORDER_DONE } from "@/constants";
import { stepOrderOptions } from "@/constants/masterData";
import { ActionIcon, Badge, Box, Button, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
const DynamicModalDeleteItem = dynamic(
  () => import("../../../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
export default function TableListPage({ dataSource, deleteItem }: any) {
  const router = useRouter();
  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteItem = async (id: string) => {
    const res = await deleteItem(id);
    if (res) {
      toast.success("Xoá thành công");
      router.refresh();
    } else {
      toast.success("Xoá thất bại");
    }
  };

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
      dataIndex: ["customer"],
      render: (dataRow: any) => {
        return <span>{dataRow.fullName}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Số điện thoại
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["customer"],
      render: (dataRow: any) => {
        return <span>{dataRow.phoneNumber}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Biển số xe
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["car", "numberPlates"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tổng đơn hàng
        </span>
      ),
      textAlign: "right",

      name: "total",
      dataIndex: ["total"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tình trạng
        </span>
      ),
      name: "kind",
      dataIndex: ["step"],
      width: "100px",
      render: (record: any, index: number) => {
        const matchedStatus = stepOrderOptions.find(
          (item) => item.value === record.toString()
        );
        if (matchedStatus) {
          return (
            <Badge
              radius={0}
              size="lg"
              variant="light"
              color={matchedStatus.color}
              key={index}
            >
              {matchedStatus.label}
            </Badge>
          );
        }
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Đồng bộ</span>
      ),
      name: "orderDLBDId",
      textAlign: "center",
      dataIndex: ["orderDLBDId"],
      width: "100px",

      render: (dataRow: number) => {
        if (dataRow) return <IconCheck color="green" size={20} />;
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
                size="lg"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                p={5}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/admin/order-detail/${record?.id}`);
                }}
              >
                <IconPencil size={16} color="blue" />
              </Button>
            </Tooltip>
            {!deleteDisabled && (
              <Tooltip label="Xoá" withArrow position="bottom">
                <ActionIcon
                  size="lg"
                  radius={0}
                  p={5}
                  variant="transparent"
                  onClick={(e) => {
                    openDeleteProduct();
                    e.stopPropagation();
                    setDeleteRow(record.id);
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
        onRow={`/admin/order-manager`}
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
