"use client";
import React, { useState } from "react";
import { Badge, Button, Flex, Tooltip } from "@mantine/core";
import { IconEye, IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import TableBasic from "@/app/components/table/Tablebasic";
import dynamic from "next/dynamic";
import { FieldTypes, statusOptions } from "@/constants/masterData";
import ListPage from "@/app/components/layout/ListPage";
import { useSearchParams } from "next/navigation";
import { getOptionsCar } from "@/app/admin/(admin)/order-manager/until";

const DynamicModalDeleteItem = dynamic(
  () => import("@/app/admin/_component/ModalDeleteItem"),
  {
    ssr: false,
  }
);
export default function CarsListPage({
  cars,
  activeTab,
  setActiveTab,
  page,
  setPage,
  loading,
  deleteItem,
}: any) {
  const searchParams = useSearchParams();
  const customerId: any = searchParams.get("customerId");
  const [deleteRow, setDeleteRow] = useState();
  const handleDeleteItem = (id: string) => {
    deleteItem(id);
  };

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
        return (
          <Tooltip label="Xem chi tiết" withArrow position="bottom">
            <Link
              href={{
                pathname: `/admin/system-customer/cars/${record.id}`,
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
                <IconEye size={16} color="blue" />
              </Button>
            </Link>
          </Tooltip>
        );
      },
    },
  ];

  const searchData = [
    {
      name: "carId",
      placeholder: "Biển số xe",
      type: FieldTypes?.AUTOCOMPLETE,
      getOptionsData: getOptionsCar,
      isCamera: true,
    },
  ];
  const initialValuesSearch = {
    carId: null,
    carBrandId: null,
    nameId: null,
    yearId: null,
  };
  return (
    // <Fragment>
    //   <div style={{ background: "#fff", marginBottom: 30 }}>
    //     {/* <SearchForm
    //       searchData={searchData}
    //       initialValues={initialValuesSearch}
    //       brandFilter={true}
    //     /> */}
    //   </div>
    //   <div style={{ marginBottom: 20 }}>
    //     <Flex justify={"end"} align={"center"}>
    //       <Link
    //         href={{
    //           pathname: `/admin/cars/create`,
    //         }}
    //       >
    //         <Button
    //           size="lg"
    //           h={{ base: 42, md: 50, lg: 50 }}
    //           radius={0}
    //           leftSection={<IconPlus size={18} />}
    //         >
    //           Thêm mới
    //         </Button>
    //       </Link>
    //     </Flex>
    //   </div>
    //   <div style={{ background: "#fff", position: "relative" }}>
    //     <TableBasic
    //       data={cars?.data}
    //       columns={columns}
    //       loading={loading}
    //       totalPage={cars?.totalPage}
    //       setPage={setPage}
    //       activePage={page}
    //       onRow={`/admin/cars`}
    //     />
    //   </div>

    //   <DynamicModalDeleteItem
    //     openedDeleteItem={openedDeleteItem}
    //     closeDeleteItem={closeDeleteItem}
    //     handleDeleteItem={handleDeleteItem}
    //     deleteRow={deleteRow}
    //   />
    // </Fragment>
    <ListPage
      style={{ height: "100%" }}
      titleTable={true}
      baseTable={
        <TableBasic
          data={cars?.data}
          columns={columns}
          loading={loading}
          totalPage={cars?.totalPage}
          setPage={setPage}
          activePage={page}
          onRow={`/admin/system-customer/cars`}
        />
      }
    />
  );
}
