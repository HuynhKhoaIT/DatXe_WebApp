"use client";
import Link from "next/link";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
import ImageDefault from "@/assets/images/no_image.png";
import {
  IconCar,
  IconCheck,
  IconDots,
  IconDotsVertical,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { Menu } from "@mantine/core";
import ModalSetCarDefault from "@/app/layout/desktop/dashboard/Danh-sach-xe/_component/ModalSetCarDefault";
import { useDisclosure } from "@mantine/hooks";
import ModalDeleteCar from "@/app/layout/desktop/dashboard/Danh-sach-xe/_component/ModalDeleteCar";
import PreviewModal from "@/app/layout/desktop/dashboard/Danh-sach-xe/_component/PreviewModal";
export default function ItemCarMobile({
  data,
  deleteItem,
  handleSetDefault,
  session,
}: any) {
  const router = useRouter();
  const [
    openedSetDefault,
    { open: openSetDefault, close: closeSetDefault },
  ] = useDisclosure(false);
  const [
    openedDeleteCar,
    { open: openDeleteCar, close: closeDeleteCar },
  ] = useDisclosure(false);
  const [
    openedPreviewCar,
    { open: openPreviewCar, close: closePreviewCar },
  ] = useDisclosure(false);
  return (
    <div
      className={styles.boxCar}
      style={{
        backgroundImage: `url(${ImageDefault.src})`,
        backgroundPositionX: "50%",
        backgroundPositionY: "50%",
        // backgroundRepeat: "no-repeat",
        backgroundSize: "150%",
      }}
    >
      <div className={styles.overlay}></div>
      {data?.isDefault ? (
        <div className={styles.carDefault}>
          <i className={styles.iconCheck}>
            <IconCar color="green" size={16} />
          </i>
          <span>Xe mặc định</span>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.action}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <IconDotsVertical />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                openSetDefault();
              }}
              leftSection={<IconCar size={16} />}
            >
              Đặt làm xe mặc định
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                router.push(`/dashboard/xe/${data?.id}`);
              }}
              leftSection={<IconPencil size={16} />}
            >
              Chỉnh sửa
            </Menu.Item>
            <Menu.Item
              onClick={(e) => {
                openDeleteCar();
              }}
              leftSection={<IconTrash size={16} />}
            >
              Xoá xe
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <ul className={styles.listInfo}>
        <h4 className={styles.plates}>{data?.numberPlates}</h4>
        <li>Hãng xe: {data?.brandName?.title || "Không rõ"}</li>
        <li>Dòng xe: {data?.modelName?.title || "Không rõ"} </li>
        <li>NSX: {data?.yearName?.title || "Không rõ"}</li>
        <li>Mẫu xe: {data?.carStyle?.name || "Không rõ"}</li>
        <li>Màu sắc: {data?.color || "Không rõ"}</li>
        <li>Số khung: {data?.vinNumber || "Không rõ"}</li>
      </ul>
      <div
        onClick={() => {
          openPreviewCar();
        }}
        className={styles.previewDetail}
      >
        Xem chi tiết
      </div>
      <ModalDeleteCar
        openedDeleteCar={openedDeleteCar}
        closeDeleteCar={closeDeleteCar}
        deleteItem={deleteItem}
        deleteRow={data?.id}
      />
      <ModalSetCarDefault
        openedSetDefault={openedSetDefault}
        closeSetDefault={closeSetDefault}
        dataCarDefault={data}
        handleSetDefault={handleSetDefault}
      />
      <PreviewModal
        opened={openedPreviewCar}
        onOk={closePreviewCar}
        onCancel={closePreviewCar}
        width={800}
        data={data}
        session={session}
      />
    </div>
  );
}
