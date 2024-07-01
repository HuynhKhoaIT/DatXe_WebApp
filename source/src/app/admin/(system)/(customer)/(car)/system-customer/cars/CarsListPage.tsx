"use client";
import React, { useState } from "react";
import { Badge, Button, Flex, Tooltip } from "@mantine/core";
import { IconEye, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { FieldTypes, statusOptions } from "@/constants/masterData";
import ListPage from "@/app/components/layout/ListPage";
import { useSearchParams } from "next/navigation";
import { getOptionsCar } from "@/app/admin/(admin)/(orders)/order-manager/until";
import SearchForm from "@/app/components/form/SearchForm";

const DynamicModalDeleteItem = dynamic(
  () => import("@/app/admin/_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
export default function CarsListPage({ cars, loading, deleteItem }: any) {
  const searchParams = useSearchParams();
  const customerId: any = searchParams.get("customerId");
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteItem = async (id: string) => {
    await deleteItem(id);
  };

  const [
    openedDeleteItem,
    { open: openDeleteItem, close: closeDeleteItem },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Biển số xe
        </span>
      ),
      name: "title",
      dataIndex: ["numberPlates"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Màu xe</span>
      ),
      name: "color",
      dataIndex: ["color"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hãng xe</span>
      ),
      name: "brandName",
      dataIndex: ["brandName", "title"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Dòng xe</span>
      ),
      name: "modelName",
      dataIndex: ["modelName", "title"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Năm sản xuất
        </span>
      ),
      name: "yearName",
      dataIndex: ["yearName", "title"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Loại xe</span>
      ),
      name: "carStyle",
      dataIndex: ["carStyle", "name"],
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
          <Tooltip label="Xem chi tiết" withArrow position="bottom">
            <Link
              href={{
                pathname: `/admin/system-customer/car/${record.id}`,
                query: { customerId },
              }}
            >
              <Button
                size="lg"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                color="gray"
                p={5}
              >
                <IconEye size={16} color="blue" />
              </Button>
            </Link>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <TableBasic
      data={cars?.data}
      columns={columns}
      loading={loading}
      totalPage={cars?.totalPage}
    />
  );
}
