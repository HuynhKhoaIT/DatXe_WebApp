"use client";
import React, { useState } from "react";
import { Badge, Button, Flex } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { FieldTypes, statusOptions } from "@/constants/masterData";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import ImageField from "@/app/components/form/ImageField";
import { AppConstants } from "@/constants";

const DynamicModalDeleteItem = dynamic(
  () => import("@/app/admin/_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
const DynamicModalCategories = dynamic(() => import("./ModalCategoriesDLBD"));

export default function CategoryListPage({
  user,
  dataSource,
  deleteItem,
}: any) {
  const [deleteRow, setDeleteRow] = useState();

  const handleDeleteItem = async (id: any) => {
    await deleteItem(id);
  };

  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const [
    openedModalCategories,
    { open: openModalCategories, close: closeModalCategories },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hình ảnh</span>
      ),
      name: "image",
      dataIndex: ["image"],
      width: "90px",
      render: (data: any) => {
        return (
          <ImageField
            radius="md"
            height={40}
            width={80}
            src={data && `${AppConstants.contentRootUrl}${data}`}
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
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
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
                pathname: `/admin/categories/${record.id}`,
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

  const searchData = [
    {
      name: "s",
      placeholder: "Tên danh mục",
      type: FieldTypes.STRING,
    },
    {
      name: "status",
      placeholder: "Trạng thái",
      type: "select",
      data: statusOptions,
    },
  ];
  const initialValuesSearch = {
    s: "",
    status: null,
  };

  return (
    <div>
      <ListPage
        searchForm={
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
        }
        actionBar={
          <Flex justify={"end"} align={"center"} gap={20}>
            {user?.useDLBD ? (
              <Button
                size="lg"
                h={{ base: 42, md: 50, lg: 50 }}
                radius={0}
                onClick={openModalCategories}
                leftSection={<IconPlus size={18} />}
              >
                Đồng bộ
              </Button>
            ) : (
              <></>
            )}

            <Link
              href={{
                pathname: `/admin/categories/create`,
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
            data={dataSource?.data}
            columns={columns}
            totalPage={dataSource?.totalPage}
          />
        }
      />

      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
        deleteRow={deleteRow}
      />
      {openedModalCategories && (
        <DynamicModalCategories
          openedModalCategories={openedModalCategories}
          closeModalCategories={closeModalCategories}
          profile={user}
        />
      )}
    </div>
  );
}
