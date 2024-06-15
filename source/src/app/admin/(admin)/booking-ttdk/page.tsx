"use client";
export const revalidate = 0;
import React, { Fragment, useState } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { ActionIcon, Badge, Button, Flex, Image, Tooltip } from "@mantine/core";
import { FieldTypes, stepOrderOptions } from "@/constants/masterData";
import {
  IconCircleCheck,
  IconEye,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import ListPage from "@/app/components/layout/ListPage";
import { useRouter } from "next/navigation";
import { DATE_FORMAT_DISPLAY, ORDER_CANCEL, ORDER_DONE } from "@/constants";
import { getOptionsCar } from "../order-manager/until";
import { useBookingTTDK } from "../hooks/bookingTTDK/useBookingTTDK";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
const DynamicModalDeleteItem = dynamic(
  () => import("../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Đơn hàng TTDK" },
];
export default function BookingTTDK() {
  const router = useRouter();
  const { data } = useSession();
  const {
    bookingTTDK: list,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    deleteItem,
  } = useBookingTTDK({ token: data?.user?.token });

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
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Mã ĐH</span>
      ),
      name: "code",
      dataIndex: ["code"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Tên khách hàng
        </span>
      ),
      name: "fullName",
      dataIndex: ["fullname"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Số điện thoại
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["phone"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Biển số xe
        </span>
      ),
      name: "phoneNumber",
      dataIndex: ["licensePlates"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Ngày đặt lịch
        </span>
      ),
      name: "dateSchedule",
      dataIndex: ["dateSchedule"],
      textAlign: "right",
      render: (dataRow: any) => {
        return <span>{dayjs(dataRow).format(DATE_FORMAT_DISPLAY)}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Giờ</span>
      ),
      name: "time",
      dataIndex: ["time"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
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
                  router.push(`/admin/booking-ttdk/${record?.id}`);
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
            onRow={`/admin/booking-ttdk`}
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
