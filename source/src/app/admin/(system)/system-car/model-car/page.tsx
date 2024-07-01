"use client";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Fragment, useState } from "react";
import ListPage from "@/app/components/layout/ListPage";
import { Button, Flex } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import TableBasic from "@/app/components/table/Tablebasic";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useModelCar } from "@/app/admin/(admin)/hooks/system-car/Model/useModelCar";

const DynamicModalDeleteItem = dynamic(
  () => import("../../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
export default function ModelCarListPage() {
  const searchParam = useSearchParams();
  const brandId = searchParam.get("brandId");
  const brandName = searchParam.get("brandName");

  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách hãng xe", href: "/admin/system-car" },
    {
      title: brandName,
    },
  ];
  var {
    modelCarList,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    deleteItem,
  } = useModelCar(brandId);

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
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Tên</span>
      ),
      name: "title",
      dataIndex: [],
      render: (dataRow: any) => {
        return (
          <Link
            href={`/admin/system-car/model-car/year-car?brandId=${brandId}&brandName=${brandName}&modelId=${dataRow.id}&modelName=${dataRow?.title}`}
          >
            {dataRow?.title}
          </Link>
        );
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
          <Flex>
            <Link
              href={{
                pathname: `/admin/system-car/model-car/${record.id}`,
                query: { brandId, brandName },
              }}
            >
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
            </Link>
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
                pathname: `/admin/system-car/model-car/create`,
                query: { brandId, brandName },
              }}
            >
              <Button
                h={{ base: 42, md: 50, lg: 50 }}
                size="md"
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
            data={modelCarList}
            columns={columns}
            loading={isLoading}
            // totalPage={modelCarList?.totalPage}
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
