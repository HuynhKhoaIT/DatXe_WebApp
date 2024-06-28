"use client";
import React, { useState } from "react";
import { Badge, Button, Tabs, Tooltip } from "@mantine/core";
import { IconCar, IconPencil, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { FieldTypes, sexOptions, statusOptions } from "@/constants/masterData";
import dayjs from "dayjs";
import ListPage from "@/app/components/layout/ListPage";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DynamicModalDeleteItem = dynamic(
  () => import("@/app/admin/_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);

export default function TableListPage({
  customers,
  customersDlbd,
  deleteItem,
}: any) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("first");
  const [deleteRow, setDeleteRow] = useState();

  const handleDeleteItem = async (id: string) => {
    const res = await deleteItem(id);
    if (res) {
      toast.success("Xoá thành công");
      router.refresh();
    } else {
      toast.error("Xoá thất bại");
    }
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
                  router.push(`/admin/customers/cars?customerId=${record.id}`);
                }}
              >
                <IconCar size={16} />
              </Button>
            </Tooltip>
            <Link
              href={{
                pathname: `/admin/customers/${record.id}`,
              }}
            >
              <Tooltip label="Chỉnh sửa" withArrow position="bottom">
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
              </Tooltip>
            </Link>
            <Tooltip label="Xoá" withArrow position="bottom">
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
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ background: "#fff", position: "relative" }}>
        <div>
          <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
            <Tabs.List classNames={{ list: styles.list }}>
              <Tabs.Tab
                h={{ base: 42, md: 50, lg: 50 }}
                classNames={{ tab: styles.tab }}
                value="first"
              >
                Khách hàng trên sàn
              </Tabs.Tab>
              <Tabs.Tab
                h={{ base: 42, md: 50, lg: 50 }}
                classNames={{ tab: styles.tab }}
                value="second"
              >
                Khách hàng trên phần mềm
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first">
              <ListPage
                style={{ height: "100%" }}
                baseTable={
                  <TableBasic
                    data={customers?.data}
                    columns={columns}
                    totalPage={customers?.totalPage}
                    onRow={`/admin/customers`}
                  />
                }
              />
            </Tabs.Panel>
            <Tabs.Panel value="second">
              <ListPage
                style={{ height: "100%" }}
                baseTable={
                  <TableBasic
                    data={customersDlbd?.data}
                    columns={columns}
                    // totalPage={marketing?.totalPage}
                    // setPage={setPage}
                    // activePage={page}
                  />
                }
              />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
        deleteRow={deleteRow}
      />
    </div>
  );
}
