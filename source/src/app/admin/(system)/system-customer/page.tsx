"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Fragment, useState } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import { IconCar, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { Badge, Button, Tooltip } from "@mantine/core";
import Link from "next/link";
import { FieldTypes, sexOptions, statusOptions } from "@/constants/masterData";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import { useCustomers } from "../hooks/customers/useCustomers";
import { useRouter } from "next/navigation";
const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách khách hàng" },
];

export default function Customers() {
  const {
    customers,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    deleteItem,
    activeTab,
    setActiveTab,
  } = useCustomers();
  const [deleteRow, setDeleteRow] = useState();

  const route = useRouter();
  const [
    openedDeleteItem,
    { open: openDeleteProduct, close: closeDeleteItem },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Họ và tên
        </span>
      ),
      name: "fullname",
      dataIndex: activeTab === "first" ? ["fullName"] : ["name"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Số điện thoại
        </span>
      ),
      name: "phoneNumber",
      dataIndex: activeTab === "first" ? ["phoneNumber"] : ["phone_number"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Ngày sinh
        </span>
      ),
      name: "dob",
      dataIndex: ["dob"],
      render: (dob: any) => {
        return <>{dob ? dayjs(dob).format("DD-MM-YYYY") : null}</>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Giới tính
        </span>
      ),
      name: "sex",
      dataIndex: ["sex"],
      width: "100px",
      render: (record: any) => {
        const matchedStatus = sexOptions.find((item) => item.value === record);
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
    activeTab === "first" && {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "140px",
      render: (record: any) => {
        return (
          <>
            <Tooltip label="Xe" withArrow position="bottom">
              <Button
                size="lg"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                color="gray"
                p={5}
                onClick={(e) => {
                  e.stopPropagation();
                  route.push(
                    `/admin/system-customer/cars?customerId=${record?.id}`
                  );
                }}
              >
                <IconCar size={16} />
              </Button>
            </Tooltip>
            <Link
              href={{
                pathname: `/admin/system-customer/${record.id}`,
              }}
            >
              <Tooltip label="Xem chi tiết" withArrow position="bottom">
                <Button
                  size="lg"
                  radius={0}
                  style={{ margin: "0 5px" }}
                  variant="transparent"
                  color="gray"
                  p={5}
                  onClick={() => {}}
                >
                  <IconEye size={16} color="blue" />
                </Button>
              </Tooltip>
            </Link>
            {/* <Tooltip label="Xoá" withArrow position="bottom">
              <Button
                size="lg"
                radius={0}
                p={5}
                variant="transparent"
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  openDeleteProduct();
                  e.stopPropagation();
                  setDeleteRow(record.id);
                }}
              >
                <IconTrash size={16} color="red" />
              </Button>
            </Tooltip> */}
          </>
        );
      },
    },
  ];
  const searchData = [
    {
      name: "s",
      placeholder: "Tên",
      type: FieldTypes.STRING,
    },
    {
      name: "phoneNumber",
      placeholder: "Số điện thoại",
      type: FieldTypes.STRING,
    },
  ];
  const initialValuesSearch = {
    s: "",
    phoneNumber: "",
  };
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
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
            data={customers?.data}
            columns={columns}
            loading={isLoading}
            totalPage={customers?.totalPage}
            setPage={setPage}
            activePage={page}
            onRow={`/admin/system-customer`}
          />
        }
      />
    </Fragment>
  );
}
