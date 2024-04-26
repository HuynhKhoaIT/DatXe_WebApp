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
import { useNewsList } from "../../(admin)/hooks/news/useNews";
import { useProductsHome } from "../hooks/home-page/ProductsHome";
import { useServicesHome } from "../hooks/home-page/ServicesHome";
const queryClient = new QueryClient();

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Dịch vụ nổi bật" },
];
const DynamicModalDeleteItem = dynamic(
  () => import("@/app/admin/_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
const ServicesHot = () => {
  const {
    products,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    categoryOptions,
    deleteItem,
  } = useServicesHome();

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
        const images = JSON?.parse(data);
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
        return <Image radius="md " h={40} w={40} fit="cover" src={images[0]} />;
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
                setDeleteRow(record?.product.id);
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
      {products?.length == 8 && (
        <Alert
          variant="light"
          color="yellow"
          title="Thông báo"
          icon={<IconInfoCircle />}
          mb={10}
        >
          Danh sách dịch vụ nổi bật tối đa 8 dịch vụ, để thêm dịch vụ mới vui
          lòng xoá dịch vụ cũ.
        </Alert>
      )}

      <ListPage
        actionBar={
          products?.length < 8 && (
            <Flex justify={"end"} align={"center"}>
              <Link
                href={{
                  pathname: `/admin/system-services/create`,
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
            onRow={`/admin/system-services`}
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
export default ServicesHot;
