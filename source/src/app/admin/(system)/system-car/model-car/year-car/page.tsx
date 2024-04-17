"use client";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Fragment, useState } from "react";
import ListPage from "@/app/components/layout/ListPage";
import { Badge, Button, Flex } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import TableBasic from "@/app/components/table/Tablebasic";
import { statusOptions } from "@/constants/masterData";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { useModelCar } from "../../../../hooks/system-car/Model/useModelCar";
import { useSearchParams } from "next/navigation";
import { useYearCar } from "@/app/admin/hooks/system-car/YearCar/useYearCar";

const DynamicModalDeleteItem = dynamic(
  () => import("../../../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
export default function YearCarListPage() {
  const searchParam = useSearchParams();
  const brandId = searchParam.get("brandId");
  const modelId = searchParam.get("modelId");
  const brandName = searchParam.get("brandName");
  const modelName = searchParam.get("modelName");

  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách hãng xe", href: "/admin/system-car" },
    {
      title: brandName,
      href: `/admin/system-car/model-car?brandId=${brandId}&brandName=${brandName}`,
    },
    { title: modelName },
  ];
  var {
    yearCarList,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    deleteItem,
  } = useYearCar(modelId);

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
      dataIndex: ["title"],
      render: (dataRow: any) => {
        return <>{dataRow}</>;
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
                pathname: `/admin/system-car/model-car/year-car/${record.id}`,
                query: { brandId, brandName, modelId, modelName },
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
                <IconPencil size={16} />
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
                pathname: `/admin/system-car/model-car/year-car/create`,
                query: { brandId, brandName, modelId, modelName },
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
            data={yearCarList}
            columns={columns}
            loading={isLoading}
            totalPage={yearCarList?.totalPage}
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
