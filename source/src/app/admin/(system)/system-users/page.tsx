"use client";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Fragment, useState } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import TableBasic from "@/app/components/table/Tablebasic";
import {
  IconCar,
  IconEye,
  IconPencil,
  IconRepeat,
  IconTrash,
} from "@tabler/icons-react";
import { Badge, Button, Tooltip } from "@mantine/core";
import Link from "next/link";
import { FieldTypes, sexOptions, statusOptions } from "@/constants/masterData";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import { useUsers } from "../hooks/users/useUsers";
import dynamic from "next/dynamic";

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách người dùng" },
];
const DynamicModalChangeGarage = dynamic(
  () => import("./_component/ModalChangeGarage"),
  {
    ssr: false,
  }
);
export default function UserListPage() {
  const {
    users,
    isLoading,
    isFetching,
    error,
    page,
    setPage,
    deleteItem,
    activeTab,
    setActiveTab,
  } = useUsers();

  const [userId, setUserId] = useState();
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Họ và tên
        </span>
      ),
      name: "fullname",
      dataIndex: ["fullName"],
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
      textAlign: "center",
      render: (record: any) => {
        return (
          <>
            <Tooltip label="Điều hướng chuyên gia" withArrow position="bottom">
              <Button
                size="lg"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                color="gray"
                p={5}
                onClick={(e) => {
                  e.stopPropagation();
                  setUserId(record.id);
                  openModal();
                }}
              >
                <IconRepeat size={16} color="blue" />
              </Button>
            </Tooltip>
            <Link
              href={{
                pathname: `/admin/system-users/${record.id}`,
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
          </>
        );
      },
    },
  ];
  const searchData = [
    {
      name: "phoneNumber",
      placeholder: "Số điện thoại",
      type: FieldTypes.STRING,
    },
  ];
  const initialValuesSearch = {
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
            data={users?.data}
            columns={columns}
            loading={isLoading}
            totalPage={users?.totalPage}
            setPage={setPage}
            activePage={page}
            onRow={`/admin/system-users`}
          />
        }
      />
      <DynamicModalChangeGarage
        opened={openedModal}
        close={closeModal}
        userId={userId}
      />
    </Fragment>
  );
}
