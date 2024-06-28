"use client";
import { Badge, Box, Button, Tooltip } from "@mantine/core";
import { FieldTypes, kindProductOptions } from "@/constants/masterData";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import FilterCategories from "@/app/components/common/FilterCategory/FilterCategories";
import ImageField from "@/app/components/form/ImageField";
import { IconPlus } from "@tabler/icons-react";
import { useProducts } from "../../../hooks/products/useProducts";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import { Fragment } from "react";
import { useAddProductHome } from "../../../hooks/home-page/useAddProductHome";
import { AppConstants } from "@/constants";
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Sản phẩm nổi bật", href: "/admin/products-hot" },
  { title: "Thêm sản phẩm" },
];

export default function ChooseProducts() {
  const {
    products,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    categoryOptions,
  } = useProducts();

  const { addItem, isPending } = useAddProductHome();
  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "image",
      dataIndex: ["images"],
      width: "90px",
      render: (data: any) => {
        const images = JSON.parse(data);
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
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "100px",
      render: (record: any) => {
        return (
          <Tooltip label="Thêm" withArrow position="bottom">
            <Button
              style={{ margin: "0 5px" }}
              p={5}
              onClick={() => {
                addItem(record);
              }}
              leftSection={<IconPlus size={16} />}
            >
              Thêm
            </Button>
          </Tooltip>
        );
      },
    },
  ];
  const searchData = [
    {
      name: "s",
      placeholder: "Tên sản phẩm",
      type: FieldTypes.STRING,
    },
  ];
  const initialValuesSearch = {
    s: "",
  };

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <ListPage
        searchForm={
          <SearchForm
            searchData={searchData}
            brandFilter={true}
            initialValues={initialValuesSearch}
          />
        }
        filterCategory={<FilterCategories categories={categoryOptions} />}
        style={{ height: "100%" }}
        baseTable={
          <TableBasic
            loading={isLoading || isPending}
            data={products?.data}
            columns={columns}
            totalPage={products?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
      <FooterSavePage isOk={false} />
    </Fragment>
  );
}
