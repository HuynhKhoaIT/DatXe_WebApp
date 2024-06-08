"use client";
import React, { useState } from "react";
import {
  IconChevronRight,
  IconEye,
  IconPencil,
  IconTrash,
  IconBan,
  IconPlus,
} from "@tabler/icons-react";
import { Radio, Button, Modal, Group, Pagination, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TableBasic from "@/app/components/table/Tablebasic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import PreviewModal from "./_component/PreviewModal";
import ModalSetCarDefault from "./_component/ModalSetCarDefault";
import ModalDeleteCar from "./_component/ModalDeleteCar";
export default function CarsListPage({
  carsData,
  page,
  setPage,
  deleteItem,
  loading,
}: any) {
  const [
    openedPreviewCar,
    { open: openPreviewCar, close: closePreviewCar },
  ] = useDisclosure(false);
  const [
    openedDeleteCar,
    { open: openDeleteCar, close: closeDeleteCar },
  ] = useDisclosure(false);

  const [
    openedSetDefault,
    { open: openSetDefault, close: closeSetDefault },
  ] = useDisclosure(false);

  const [detail, setDetail] = useState<any>({});
  const [deleteRow, setDeleteRow] = useState("");

  const [dataCarDefault, setdataCarDefault] = useState<any>();

  const handleRadioChange = (selectedRecord: any) => {
    openSetDefault();
    setdataCarDefault(selectedRecord);
  };

  const columns = [
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Mặc định</span>
      ),
      name: "carDefault",
      dataIndex: [],
      width: "90px",
      textAlign: "center",
      render: (dataRow: any) => {
        return (
          <>
            <Radio
              style={{ display: "flex", justifyContent: "center" }}
              checked={dataRow?.isDefault}
              onChange={() => handleRadioChange(dataRow)}
            />
          </>
        );
      },
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Biển số</span>
      ),
      name: "numberPlates",
      dataIndex: ["numberPlates"],
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
      name: "bandName",
      dataIndex: ["brandName", "title"],
    },
    {
      label: (
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>Dòng xe</span>
      ),
      name: "modelName",
      dataIndex: ["modelName", "title"],
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
        <span style={{ whiteSpace: "nowrap", fontSize: "16px" }}>
          Hành động
        </span>
      ),
      dataIndex: [],
      width: "120px",
      render: (record: any) => {
        return (
          <>
            {/* <Button
              size="lg"
              radius={0}
              p={5}
              variant="transparent"
              onClick={() => {
                setDetail(record);
                openPreviewCar();
              }}
            >
              <IconEye size={16} />
            </Button> */}
            <Link href={`/dashboard/danh-sach-xe/${record.id}`}>
              <Button
                size="lg"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                color="gray"
                p={5}
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
                openDeleteCar();
                setDeleteRow(record.id);
              }}
            >
              <IconTrash size={16} color="red" />
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.createCar}>
        <Flex justify={"end"} align={"center"}>
          <Link
            href={{
              pathname: `/dashboard/danh-sach-xe/create`,
            }}
          >
            <Button
              size="lg"
              h={{ base: 40, md: 50, lg: 50 }}
              // radius={0}
              leftSection={<IconPlus size={18} />}
            >
              Thêm xe
            </Button>
          </Link>
        </Flex>
      </div>

      <div className={styles.content}>
        <div style={{ borderBottom: "1px solid #eeeeee" }}>
          <Typo size="18px" type="bold" className={styles.title}>
            Xe của tôi
          </Typo>
        </div>
        <TableBasic
          className={styles.table}
          data={carsData?.data}
          columns={columns}
          totalPage={carsData?.totalPage}
          loading={loading}
          setPage={setPage}
          activePage={page}
        />
      </div>

      <ModalDeleteCar
        openedDeleteCar={openedDeleteCar}
        closeDeleteCar={closeDeleteCar}
        deleteItem={deleteItem}
        deleteRow={deleteRow}
      />
      <ModalSetCarDefault
        openedSetDefault={openedSetDefault}
        closeSetDefault={closeSetDefault}
        dataCarDefault={dataCarDefault}
      />
      <PreviewModal
        opened={openedPreviewCar}
        onOk={closePreviewCar}
        onCancel={closePreviewCar}
        width={800}
        data={detail}
      />
    </div>
  );
}
