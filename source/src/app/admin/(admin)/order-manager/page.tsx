"use client";
export const revalidate = 0;
import React, { Fragment, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { ActionIcon, Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import { FieldTypes, stepOrderOptions } from "@/constants/masterData";
import Link from "next/link";
import {
  IconCircleCheck,
  IconEye,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import ListPage from "@/app/components/layout/ListPage";
import FilterTable from "@/app/components/common/FilterTable";
import { getOptionsCar } from "./until";
import { useOrders } from "../hooks/order/useOrder";
import { IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ORDER_CANCEL, ORDER_DONE } from "@/constants";
import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";
const DynamicModalDeleteItem = dynamic(
  () => import("../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Quản lý đơn hàng" },
];
export default function OrdersManaga() {
  const router = useRouter();
  const {
    orders: list,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    deleteItem,
  } = useOrders();

  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteItem = async (id: string) => {
    deleteItem(id);
  };

  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên khách hàng
        </span>
      ),
      name: "fullName",
      dataIndex: ["customer"],
      render: (dataRow: any) => {
        return <span>{dataRow.fullName}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Số điện thoại
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["customer"],
      render: (dataRow: any) => {
        return <span>{dataRow.phoneNumber}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Biển số xe
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["car", "numberPlates"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tổng đơn hàng
        </span>
      ),
      textAlign: "right",

      name: "total",
      dataIndex: ["total"],
      render: (dataRow: number) => {
        return <span>{dataRow?.toLocaleString()}đ</span>;
      },
    },

    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tình trạng
        </span>
      ),
      name: "kind",
      dataIndex: ["step"],
      width: "100px",
      render: (record: any, index: number) => {
        const matchedStatus = stepOrderOptions.find(
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
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Đồng bộ</span>
      ),
      name: "orderDLBDId",
      textAlign: "center",
      dataIndex: ["orderDLBDId"],
      width: "100px",

      render: (dataRow: number) => {
        if (dataRow) return <IconCheck color="green" size={20} />;
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
        const deleteDisabled =
          record?.orderDLBDId ||
          record?.step == ORDER_DONE ||
          record?.step == ORDER_CANCEL;

        return (
          <>
            <Tooltip label="Cập nhật" withArrow position="bottom">
              <Button
                size="lg"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                p={5}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/admin/order-manager/${record?.id}`);
                }}
              >
                <IconPencil size={16} color="blue" />
              </Button>
            </Tooltip>
            {!deleteDisabled && (
              <Tooltip label="Xoá" withArrow position="bottom">
                <ActionIcon
                  size="lg"
                  radius={0}
                  p={5}
                  variant="transparent"
                  onClick={(e) => {
                    openDeleteProduct();
                    e.stopPropagation();
                    setDeleteRow(record.id);
                  }}
                >
                  <IconTrash size={16} color={"red"} />
                </ActionIcon>
              </Tooltip>
            )}
          </>
        );
      },
    },
  ];

  const [customer, setCustomer] = useState([]);
  const searchData = [
    {
      name: "carId",
      placeholder: "Biển số xe",
      type: FieldTypes?.AUTOCOMPLETE,
      getOptionsData: getOptionsCar,
      isCamera: true,
    },
    // {
    //   name: "customerId",
    //   placeholder: "Khách hàng",
    //   type: FieldTypes?.AUTOCOMPLETE,
    //   value: customer,
    //   setValue: setCustomer,
    //   getOptionsData: getOptionsCustomers,
    // },
  ];

  const initialValuesSearch = {
    // s: "",
    // customerId: null,
    carId: null,
  };

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <ListPage
        searchForm={
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
        }
        actionBar={
          <Flex justify={"end"} align={"center"}>
            <Link
              href={{
                pathname: `/admin/order-manager/create`,
              }}
            >
              <Button
                size="lg"
                h={{ base: 42, md: 50, lg: 50 }}
                radius={0}
                leftSection={<IconPlus size={18} />}
              >
                Tạo đơn
              </Button>
            </Link>
          </Flex>
        }
        filterCategory={
          <FilterTable stepOptions={stepOrderOptions} keyQuery="step" />
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableBasic
            data={list?.data}
            columns={columns}
            loading={isLoading}
            totalPage={list?.totalPage}
            setPage={setPage}
            activePage={page}
            onRow={`/admin/order-manager`}
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
