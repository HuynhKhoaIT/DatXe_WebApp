"use client";
export const revalidate = 0;
import React, { Fragment, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { useRouter } from "next/navigation";
import {
  ActionIcon,
  Badge,
  Button,
  Flex,
  Image,
  Tabs,
  Tooltip,
} from "@mantine/core";
import ImageDefult from "../../../../../public/assets/images/logoDatxe.png";
import {
  FieldTypes,
  kindProductOptions,
  statusOptions,
} from "@/constants/masterData";
import Link from "next/link";
import {
  IconArrowUp,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import ListPage from "@/app/components/layout/ListPage";
import styles from "./index.module.scss";
import FilterCategories from "@/app/components/common/FilterCategory/FilterCategories";
import { useProduct } from "../hooks/product/useProduct";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";
import { useSession } from "next-auth/react";

const DynamicModalDeleteItem = dynamic(
  () => import("../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);

const DynamicModalSyncProduct = dynamic(
  () => import("./_component/ModalSyncProduct"),
  {
    ssr: false,
  }
);
const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Sản phẩm" },
];

export default function ProductsManaga() {
  const {
    products,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    pageDlbd,
    setPageDlbd,
    activeTab,
    setActiveTab,
    deleteItem,
    categoryOptions,
    productsDlbd,
    isLoadingDlbd,
  } = useProduct();

  if (error) return <>error</>;
  const router = useRouter();
  const { data } = useSession();
  const [deleteRow, setDeleteRow] = useState();
  const [onRowId, setOnRowId] = useState();
  const [
    openedSync,
    { open: openSyncProduct, close: closeSyncProduct },
  ] = useDisclosure(false);
  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const handleDeleteItem = (id: any) => {
    deleteItem(id);
  };

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "image",
      dataIndex: activeTab === "first" ? ["images"] : ["thumbnail"],
      width: "90px",
      render: (data: any) => {
        if (activeTab === "first" && data) {
          const images = JSON?.parse(data);
          return (
            <ImageField
              radius="md"
              height={40}
              width={80}
              src={
                images?.[0] && `${AppConstants.contentRootUrl}${images?.[0]}`
              }
            />
          );
        } else {
          return <ImageField radius="md" height={40} width={80} src={data} />;
        }
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
    activeTab === "first" && {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Số lượng</span>
      ),
      name: "quantity",
      dataIndex: ["quantity"],
      textAlign: "center",
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
    activeTab === "first" && {
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
    activeTab === "first" && {
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
    activeTab === "first" && {
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
      textAlign: "center",
      render: (record: any) => {
        if (activeTab === "first") {
          return (
            <>
              <Link
                href={{
                  pathname: `/admin/products/${record.id}`,
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
        }
        return (
          <>
            <Tooltip label="Lên sàn" withArrow position="bottom">
              <ActionIcon
                disabled={record?.isAsync == 1}
                variant="transparent"
                onClick={(e) => {
                  setOnRowId(record.id);
                  e.stopPropagation();
                  openSyncProduct();
                }}
              >
                <IconArrowUp
                  size={16}
                  color={record?.isAsync == 1 ? "gray" : "red"}
                />
              </ActionIcon>
            </Tooltip>
          </>
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
    {
      name: "isProduct",
      placeholder: "Loại",
      type: FieldTypes.SELECT,
      data: kindProductOptions,
    },
  ];
  const initialValuesSearch = {
    s: "",
    isProduct: null,
    brandId: null,
    nameId: null,
    yearId: null,
    brand: null,
  };

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div style={{ background: "#fff", marginBottom: 30 }}>
        <SearchForm
          searchData={searchData}
          brandFilter={true}
          initialValues={initialValuesSearch}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <Flex justify={"end"} align={"center"} gap={20}>
          <Link
            href={{
              pathname: `/admin/products/create`,
            }}
          >
            <Button
              size="lg"
              h={{ base: 42, md: 50, lg: 50 }}
              radius={0}
              leftSection={<IconPlus size={18} />}
            >
              Thêm mới
            </Button>
          </Link>
        </Flex>
      </div>

      <FilterCategories categories={categoryOptions} />

      <div style={{ background: "#fff", position: "relative" }}>
        <div>
          <Tabs
            variant="pills"
            value={activeTab}
            onChange={(value) => {
              setActiveTab(value);
              setPage(1);
              setPageDlbd(1);
            }}
          >
            <Tabs.List classNames={{ list: styles.list }}>
              <Tabs.Tab
                h={{ base: 42, md: 50, lg: 50 }}
                classNames={{ tab: styles.tab }}
                value="first"
              >
                Sản phẩm trên sàn
              </Tabs.Tab>
              {data?.user?.useDLBD ? (
                <Tabs.Tab
                  h={{ base: 42, md: 50, lg: 50 }}
                  classNames={{ tab: styles.tab }}
                  value="second"
                >
                  Sản phẩm trên phần mềm
                </Tabs.Tab>
              ) : (
                <></>
              )}
            </Tabs.List>
            <Tabs.Panel value="first">
              <ListPage
                actionBar={
                  <Flex justify={"end"} align={"center"} gap={20}>
                    <Link
                      href={{
                        pathname: `/admin/customers/create`,
                      }}
                    ></Link>
                  </Flex>
                }
                style={{ height: "100%" }}
                baseTable={
                  <TableBasic
                    data={products?.data}
                    columns={columns}
                    loading={isLoading}
                    totalPage={products?.totalPage}
                    setPage={setPage}
                    activePage={page}
                    onRow={`/admin/products`}
                  />
                }
              />
            </Tabs.Panel>
            {data?.user?.useDLBD ? (
              <Tabs.Panel value="second">
                <ListPage
                  style={{ height: "100%" }}
                  baseTable={
                    <TableBasic
                      data={productsDlbd?.data}
                      columns={columns}
                      loading={isLoadingDlbd}
                      totalPage={productsDlbd?.meta?.last_page}
                      setPage={setPageDlbd}
                      activePage={pageDlbd}
                    />
                  }
                />
              </Tabs.Panel>
            ) : (
              <></>
            )}
          </Tabs>
        </div>
      </div>
      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
        deleteRow={deleteRow}
      />
      {openedSync && (
        <DynamicModalSyncProduct
          opened={openedSync}
          close={closeSyncProduct}
          productId={onRowId}
        />
      )}
    </Fragment>
  );
}
