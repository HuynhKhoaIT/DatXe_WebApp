"use client";
import FilterCategories from "@/app/components/common/FilterCategory/FilterCategories";
import { GarageItem } from "@/app/components/elements/garage/GarageItem";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ImageField from "@/app/components/form/ImageField";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";
import { AppConstants } from "@/constants";
import {
  FieldTypes,
  kindProductOptions,
  statusOptions,
} from "@/constants/masterData";
import { Badge } from "@mantine/core";
import { Fragment } from "react";

export default function ProductsListPage({ products }: any) {
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "image",
      dataIndex: ["images"],
      width: "90px",
      render: (data: any) => {
        const images = JSON?.parse(data);
        return (
          <ImageField
            radius="md"
            height={40}
            width={80}
            src={images?.[0] && `${AppConstants.contentRootUrl}${images?.[0]}`}
          />
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>SKU</span>
      ),
      name: "sku",
      dataIndex: ["sku"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
      width: "140px",
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên sản phẩm
        </span>
      ),
      name: "name",
      dataIndex: ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá bán</span>
      ),
      name: "price",
      dataIndex: ["price"],
      textAlign: "right",
      width: "180px",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá sale</span>
      ),
      name: "priceSale",
      dataIndex: ["salePrice"],
      textAlign: "right",
      width: "180px",
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Loại</span>
      ),
      name: "kind",
      dataIndex: ["isProduct"],
      width: "100px",
      render: (record: any, index: number) => {
        const matchedStatus = kindProductOptions.find(
          (item) => item.value === record?.toString()
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
  ];

  return (
    <Fragment>
      <TableBasic
        data={products?.data}
        columns={columns}
        totalPage={products?.totalPage}
      />
    </Fragment>
  );
}
