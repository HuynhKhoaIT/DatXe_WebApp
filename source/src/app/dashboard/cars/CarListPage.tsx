"use client";
import React, { useState } from "react";
import { deleteCar, setCarDefault } from "@/utils/car";
import { useSession } from "next-auth/react";
import {
  IconChevronRight,
  IconEye,
  IconPencil,
  IconTrash,
  IconBan,
  IconPlus,
} from "@tabler/icons-react";
import PreviewModal from "./PreviewModal";
import { Radio, Button, Modal, Group, Pagination, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TableBasic from "@/app/components/table/Tablebasic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { useAddCar } from "../hooks/car/useAddCar";
export default function CarListPage({
  carsData,
  page,
  setPage,
  deleteItem,
  loading,
}: any) {
  const { setDefault } = useAddCar();
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

  const handleDeleteCar = (carId: string) => {
    deleteItem(carId);
  };

  const [dataCarDefault, setdataCarDefault] = useState<any>();

  const handleRadioChange = (selectedRecord: any) => {
    openSetDefault();
    setdataCarDefault(selectedRecord);
  };
  const handleCarDefault = () => {
    setDefault({ uuId: dataCarDefault?.uuId });
    closeSetDefault();
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
            <Button
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
            </Button>
            <Link href={`/dashboard/cars/${record.id}`}>
              <Button
                size="lg"
                radius={0}
                style={{ margin: "0 5px" }}
                variant="transparent"
                color="gray"
                p={5}
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
      <div style={{ marginBottom: 20 }}>
        <Flex justify={"end"} align={"center"}>
          <Link
            href={{
              pathname: `/dashboard/cars/create`,
            }}
          >
            <Button
              size="lg"
              h={{ base: 42, md: 50, lg: 50 }}
              radius={0}
              leftSection={<IconPlus size={18} />}
            >
              Thêm mới
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
      <Modal title="Delete" opened={openedDeleteCar} onClose={closeDeleteCar}>
        <div>Bạn có muốn xoá không?</div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            variant="filled"
            key="cancel"
            onClick={closeDeleteCar}
            color="red"
            leftSection={<IconBan />}
          >
            Huỷ bỏ
          </Button>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            style={{ marginLeft: "12px" }}
            onClick={() => {
              closeDeleteCar();
              handleDeleteCar(deleteRow);
            }}
            variant="filled"
            leftSection={<IconChevronRight />}
          >
            Tiếp tục
          </Button>
        </Group>
      </Modal>

      <Modal
        size={400}
        opened={openedSetDefault}
        onClose={closeSetDefault}
        title="Xe mặc định"
        lockScroll={false}
      >
        <div>Biển số: {dataCarDefault?.numberPlates}</div>
        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            size="lg"
            radius={0}
            h={{ base: 42, md: 50, lg: 50 }}
            variant="outline"
            color="red"
            onClick={closeSetDefault}
            leftSection={<IconBan />}
          >
            Huỷ bỏ
          </Button>
          <Button
            size="lg"
            h={{ base: 42, md: 50, lg: 50 }}
            radius={0}
            variant="filled"
            onClick={() => handleCarDefault()}
          >
            Cập nhật
          </Button>
        </Group>
      </Modal>
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
