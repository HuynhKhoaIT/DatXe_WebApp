"use client";
import React, { useState } from "react";
import { Badge } from "@mantine/core";
import dayjs from "dayjs";
import TableBasic from "@/app/components/table/Tablebasic";
import { stepOrderOptions } from "@/constants/masterData";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import Link from "next/link";
export default function OrdersListPage({ dataSource }: any) {
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Mã đơn hàng
        </span>
      ),
      dataIndex: [],
      name: "code",
      render: (dataRow: any) => {
        return (
          <Link
            href={`/dashboard/danh-sach-don-hang/${dataRow.slug}`}
            style={{
              color: "blue",
              cursor: "pointer",
              borderBottom: "1px solid blue",
            }}
          >
            {dataRow?.code}
          </Link>
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Biển số</span>
      ),
      name: "licensePlates",
      dataIndex: ["car", "numberPlates"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Ngày sửa</span>
      ),
      name: "dateTime",
      textAlign: "right",
      dataIndex: ["dateTime"],
      render: (dataRow: Date) => {
        return <span>{dayjs(dataRow).format("DD/MM/YYYY HH:mm")}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tổng đơn hàng
        </span>
      ),
      name: "total",
      dataIndex: ["total"],
      textAlign: "right",

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
      textAlign: "center",
      dataIndex: ["step"],
      width: "140px",
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
  ];

  return (
    <div className={styles.wrapper}>
      <div style={{ borderBottom: "1px solid #eeeeee" }}>
        <Typo size="18px" type="bold" className={styles.title}>
          Đơn hàng của tôi
        </Typo>
      </div>
      <TableBasic
        className={styles.table}
        columns={columns}
        data={dataSource?.data}
        totalPage={dataSource?.totalPage}
      />
    </div>
  );
}
