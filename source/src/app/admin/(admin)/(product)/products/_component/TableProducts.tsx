"use client";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";
import { ActionIcon, Badge, Button, Flex, Tabs, Tooltip } from "@mantine/core";
import { useProduct } from "../../../hooks/product/useProduct";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";
import { kindProductOptions, statusOptions } from "@/constants/masterData";
import Link from "next/link";
import { IconArrowUp, IconPencil, IconTrash } from "@tabler/icons-react";
import styles from "./index.module.scss";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const DynamicModalSyncProduct = dynamic(
  () => import(".././_component/ModalSyncProduct"),
  {
    ssr: false,
  }
);
const DynamicModalDeleteItem = dynamic(
  () => import("../../../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
export default function TableProducts({
  user,
  products,
  deleteItem,
  productsDlbd,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let params = new URLSearchParams(searchParams);
  const [activeTab, setActiveTab] = useState<string | null>("first");
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

  const handleDeleteItem = async (id: any) => {
    const res = await deleteItem(id);
    if (res) {
      toast.success("Xoá thành công");
      router.refresh();
    }
  };
  const handeChangeTab = (value: any) => {
    // params?.delete("page");
    // if (params?.toString()?.length > 0) {
    //   const path = pathname + "?" + params?.toString();
    //   router.push(path);
    // } else {
    //   router.push(pathname);
    //   router.refresh();
    // }
    setActiveTab(value);
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
              size="md"
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
      textAlign: "center",
      render: (record: any) => {
        if (activeTab === "first") {
          return (
            <>
              <Link
                href={{
                  pathname: `/admin/product/${record.id}`,
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
  return (
    <div style={{ background: "#fff", position: "relative" }}>
      <div>
        <Tabs
          variant="pills"
          value={activeTab}
          onChange={(value) => {
            handeChangeTab(value);
            // setPage(1);
            // setPageDlbd(1);
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
            {user?.useDLBD ? (
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
                  totalPage={products?.totalPage}
                  onRow={`/admin/product`}
                />
              }
            />
          </Tabs.Panel>
          {user?.useDLBD ? (
            <Tabs.Panel value="second">
              <ListPage
                style={{ height: "100%" }}
                baseTable={
                  <TableBasic
                    data={productsDlbd?.data}
                    columns={columns}
                    totalPage={productsDlbd?.meta?.last_page}
                  />
                }
              />
            </Tabs.Panel>
          ) : (
            <></>
          )}
        </Tabs>
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
    </div>
  );
}
