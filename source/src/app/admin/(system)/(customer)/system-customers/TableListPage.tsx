"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { useState } from "react";
import TableBasic from "@/app/components/table/Tablebasic";
import { IconCar, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { Badge, Button, Tooltip } from "@mantine/core";
import Link from "next/link";
import { FieldTypes, sexOptions, statusOptions } from "@/constants/masterData";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";

export default function TableListPage({ dataSource }: any) {
  const route = useRouter();
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Họ và tên
        </span>
      ),
      name: "fullname",
      dataIndex: ["fullName"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Số điện thoại
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["phoneNumber"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Ngày sinh
        </span>
      ),
      name: "dob",
      dataIndex: ["dob"],
      render: (dob: any) => {
        return <>{dob ? dayjs(dob).format("DD-MM-YYYY") : null}</>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Giới tính
        </span>
      ),
      name: "sex",
      dataIndex: ["sex"],
      width: "100px",
      render: (record: any) => {
        const matchedStatus = sexOptions.find((item) => item.value === record);
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
      width: "140px",
      render: (record: any) => {
        return (
          <>
            <Tooltip label="Xe" withArrow position="bottom">
              <Button
                size="lg"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                color="gray"
                p={5}
                onClick={(e) => {
                  e.stopPropagation();
                  route.push(
                    `/admin/system-customer/cars?customerId=${record?.id}`
                  );
                }}
              >
                <IconCar size={16} />
              </Button>
            </Tooltip>
            <Link
              href={{
                pathname: `/admin/system-customer/${record.id}`,
              }}
            >
              <Tooltip label="Xem chi tiết" withArrow position="bottom">
                <Button
                  size="lg"
                  radius={0}
                  style={{ margin: "0 5px" }}
                  variant="transparent"
                  color="gray"
                  p={5}
                  onClick={() => {}}
                >
                  <IconEye size={16} color="blue" />
                </Button>
              </Tooltip>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <TableBasic
      data={dataSource?.data}
      columns={columns}
      totalPage={dataSource?.totalPage}
      onRow={`/admin/system-customer`}
    />
  );
}
