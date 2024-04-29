"use client";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ListPage from "@/app/components/layout/ListPage";
import TableBasic from "@/app/components/table/Tablebasic";
import { Button, Flex, Image } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import ImageDefult from "@/assets/images/carService.jpeg";
import { useAmenitites } from "../../(admin)/hooks/amentity/useAmentity";

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách hãng xe" },
];
const DynamicModalDeleteItem = dynamic(
  () => import("../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);

export default function amentityListPage() {
  const {
    amenities,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    deleteItem,
  } = useAmenitites();
  const [deleteRow, setDeleteRow] = useState();

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
      name: "thumbnail",
      dataIndex: ["thumbnail"],
      width: "90px",
      render: (data: any) => {
        return (
          <Image
            radius="md "
            h={40}
            w={80}
            fit="contain"
            src={data || ImageDefult.src}
          />
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Tên</span>
      ),
      name: "title",
      dataIndex: ["title"],
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
        if (record.garageId == 2) {
          return;
        }
        return (
          <Flex>
            <Link
              href={{
                pathname: `/admin/amentity/${record.id}`,
              }}
            >
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
            </Link>
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
          </Flex>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <ListPage
        // searchForm={
        //   <SearchForm
        //     searchData={searchData}
        //     brandFilter={false}
        //     initialValues={initialValuesSearch}
        //   />
        // }
        actionBar={
          <Flex justify={"end"} align={"center"} gap={20}>
            <Link
              href={{
                pathname: `/admin/amentity/create`,
              }}
            >
              <Button
                h={{ base: 42, md: 50, lg: 50 }}
                size="lg"
                radius={0}
                leftSection={<IconPlus size={18} />}
              >
                Thêm mới
              </Button>
            </Link>
          </Flex>
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableBasic
            data={amenities?.data || []}
            columns={columns}
            loading={isLoading}
            totalPage={amenities?.totalPage}
            setPage={setPage}
            activePage={page}
          />
        }
      />
      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
        deleteRow={deleteRow}
      />
    </Fragment>
  );
}
