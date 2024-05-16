"use client";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";
import { kindProductOptions, statusOptions } from "@/constants/masterData";
import { Alert, Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import {
  IconArrowUp,
  IconInfoCircle,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import ImageDefult from "../../../../../public/assets/images/logoDatxe.png";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { QueryClient } from "@tanstack/react-query";
import { useServicesHome } from "../hooks/home-page/ServicesHome";
import { useProductsHome } from "../hooks/home-page/ProductsHome";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";
const queryClient = new QueryClient();

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Sản phẩm nổi bật" },
];
const DynamicModalDeleteItem = dynamic(
  () => import("@/app/admin/_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
const ProductsHot = () => {
  const {
    products,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    categoryOptions,
    deleteItem,
  } = useProductsHome();

  const [deleteRow, setDeleteRow] = useState();

  const handleDeleteItem = (id: any) => {
    deleteItem(id);
  };
  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "image",
      dataIndex: ["product", "images"],
      width: "90px",
      render: (data: any) => {
        let images;
        if (data) images = JSON?.parse(data);
        if (!images) {
          return (
            <Image
              radius="md"
              src={ImageDefult.src}
              h={40}
              w="auto"
              fit="contain"
            />
          );
        }
        return (
          <ImageField
            radius="md "
            height={40}
            width={40}
            src={images[0] && `${AppConstants.contentRootUrl}${images[0]}`}
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
      dataIndex: ["product", "name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giá bán</span>
      ),
      name: "price",
      dataIndex: ["product", "price"],
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
      dataIndex: ["product", "salePrice"],
      textAlign: "right",

      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
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
        return (
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
                setDeleteRow(record.product?.id);
              }}
            >
              <IconTrash size={16} color="red" />
            </Button>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      {products?.length == 10 && (
        <Alert
          variant="light"
          color="yellow"
          title="Thông báo"
          icon={<IconInfoCircle />}
          mb={10}
        >
          Danh sách sản phẩm nổi bật tối đa 10 sản phẩm, để thêm sản phẩm mới
          vui lòng xoá sản phẩm cũ.
        </Alert>
      )}

      <ListPage
        actionBar={
          products?.length < 10 && (
            <Flex justify={"end"} align={"center"}>
              <Link
                href={{
                  pathname: `/admin/system-products/create`,
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
          )
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableBasic
            data={products}
            columns={columns}
            loading={isLoading}
            // totalPage={products?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
      {openedDeleteItem && (
        <DynamicModalDeleteItem
          openedDeleteItem={openedDeleteItem}
          closeDeleteItem={closeDeleteItem}
          handleDeleteItem={handleDeleteItem}
          deleteRow={deleteRow}
        />
      )}
    </Fragment>
  );
};
export default ProductsHot;
