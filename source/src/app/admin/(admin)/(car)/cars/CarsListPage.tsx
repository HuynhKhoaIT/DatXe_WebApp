"use client";
import React, { Fragment, Suspense, useState } from "react";
import { Badge, Button, Flex, Image, Skeleton, Tabs } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { statusOptions } from "@/constants/masterData";
import ListPage from "@/app/components/layout/ListPage";
import styles from "./index.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
const DynamicModalDeleteItem = dynamic(
  () => import("../../../_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
export default function CarsListPage({ cars, carsDlbd, deleteItem }: any) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const customerId = searchParams.get("customerId");
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
  const [activeTab, setActiveTab] = useState("first");

  const [
    openedDeleteItem,
    { open: openDeleteItem, close: closeDeleteItem },
  ] = useDisclosure(false);

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Biển số xe
        </span>
      ),
      name: "title",
      dataIndex: activeTab == "first" ? ["numberPlates"] : ["licensePlates"],
      render: (dataRow: any) => {
        return <span>{dataRow}</span>;
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Màu xe</span>
      ),
      name: "color",
      dataIndex: ["color"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Hãng xe</span>
      ),
      name: "brandName",
      dataIndex:
        activeTab == "first"
          ? ["brandName", "title"]
          : ["brandCarName", "name"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Dòng xe</span>
      ),
      name: "modelName",
      dataIndex:
        activeTab == "first"
          ? ["modelName", "title"]
          : ["modelCarName", "name"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Năm sản xuất
        </span>
      ),
      name: "yearName",
      dataIndex: ["yearName", "title"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Loại xe</span>
      ),
      name: "carStyle",
      dataIndex: ["carStyle", "name"],
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
              size="md"
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
        return (
          <Flex>
            <Link
              href={{
                pathname: customerId
                  ? `/admin/customers/car/${record.id}`
                  : `/admin/cars/${record.id}`,
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
                openDeleteItem();
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
      <Tabs variant="pills" value={activeTab} onChange={setActiveTab}>
        <Tabs.List classNames={{ list: styles.list }}>
          <Tabs.Tab
            h={{ base: 42, md: 50, lg: 50 }}
            classNames={{ tab: styles.tab }}
            value="first"
          >
            Xe trên sàn
          </Tabs.Tab>
          <Tabs.Tab
            h={{ base: 42, md: 50, lg: 50 }}
            classNames={{ tab: styles.tab }}
            value="second"
          >
            Xe trên phần mềm
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">
          <ListPage
            style={{ height: "100%" }}
            baseTable={
              <Suspense fallback={<Skeleton h={500} />}>
                <TableBasic
                  data={cars?.data}
                  columns={columns}
                  totalPage={cars?.totalPage}
                  onRow={customerId ? `/admin/customers/car` : `/admin/cars`}
                />
              </Suspense>
            }
          />
        </Tabs.Panel>
        <Tabs.Panel value="second">
          <ListPage
            style={{ height: "100%" }}
            baseTable={
              <Suspense fallback={<Skeleton h={500} />}>
                <TableBasic data={carsDlbd?.data} columns={columns} />
              </Suspense>
            }
          />
        </Tabs.Panel>
      </Tabs>

      <DynamicModalDeleteItem
        openedDeleteItem={openedDeleteItem}
        closeDeleteItem={closeDeleteItem}
        handleDeleteItem={handleDeleteItem}
        deleteRow={deleteRow}
      />
    </Fragment>
  );
}
