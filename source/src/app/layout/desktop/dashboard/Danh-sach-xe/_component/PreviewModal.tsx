"use client";
import React from "react";
import { Grid, Modal, Textarea, TextInput, Box, Button } from "@mantine/core";
import dayjs from "dayjs";
import BasicModal from "@/app/components/common/BasicModal";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import styles from "./index.module.scss";
import {
  IconCardboards,
  IconChevronLeft,
  IconPencil,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
const PreviewModal = ({
  data,
  session,
  onOk,
  opened,
  onCancel,
  ...props
}: any) => {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);
  const [openedTtdk, handlerOpen] = useDisclosure();
  const router = useRouter();
  const src = `https://partner.sandbox.ttdk.com.vn/?apikey=001def4c-d614-4472-a226-6d272e8ed4d1&name=${session?.user?.name}&phone=${session?.user?.phone}&licensePlates=${data?.numberPlates}`;

  return (
    <BasicModal
      size={800}
      withCloseButton={!isMobile}
      classNames={{
        root: styles.rootModal,
        header: styles.headerModal,
        title: styles.titleModal,
      }}
      title={
        <div className={styles.title}>
          <IconChevronLeft onClick={onCancel} />
        </div>
      }
      isOpen={opened}
      closeButtonProps
      onCloseModal={onCancel}
      lockScroll={false}
      fullScreen={isMobile}
      radius={isMobile ? 0 : 6}
      zIndex={999}
      {...props}
    >
      <Box maw={800}>
        <div className={styles.header}>
          <IconChevronLeft color="var(--primary-color)" onClick={onCancel} />
          <Button
            onClick={() => {
              router.push(`/dashboard/xe/${data?.id}`);
            }}
            color="var(--theme-color)"
            leftSection={<IconPencil color="red" size={16} />}
          >
            <span style={{ fontSize: 16, color: "white" }}>Sửa</span>
          </Button>
        </div>
        <ul className={styles.listInfo}>
          <h4 className={styles.plates}>{data?.numberPlates}</h4>
          <li>Hãng xe: {data?.brandName?.title || "Không rõ"}</li>
          <li>Dòng xe: {data?.modelName?.title || "Không rõ"} </li>
          <li>NSX: {data?.yearName?.title || "Không rõ"}</li>
          <li>Mẫu xe: {data?.carStyle?.name || "Không rõ"}</li>
          <li>Màu sắc: {data?.color || "Không rõ"}</li>
          <li>Số khung: {data?.vinNumber || "Không rõ"}</li>
          <Button
            mt={20}
            onClick={() => {
              handlerOpen.open();
            }}
            variant="outline"
            color="var(--primary-color)"
            leftSection={<IconCardboards />}
          >
            Đặt lịch đăng kiểm
          </Button>
        </ul>
      </Box>
      <BasicModal
        size={800}
        withCloseButton={!isMobile}
        classNames={{
          root: styles.rootModal,
          header: styles.headerModal,
          title: styles.titleModal,
        }}
        title={
          <div className={styles.title}>
            <IconChevronLeft
              onClick={() => {
                handlerOpen.close();
              }}
            />
          </div>
        }
        isOpen={openedTtdk}
        closeButtonProps
        onCloseModal={() => {
          handlerOpen.close();
        }}
        lockScroll={false}
        fullScreen={isMobile}
        radius={isMobile ? 0 : 6}
        zIndex={999}
        {...props}
      >
        <Box maw={800}>
          <div className={styles.header}>
            <IconChevronLeft
              color="var(--primary-color)"
              onClick={() => {
                handlerOpen.close();
              }}
            />
            <div></div>
          </div>
          <div style={{ height: "1800px" }}>
            <iframe
              id="iframe"
              src={src}
              width="100%"
              height="100%"
              allowFullScreen
              style={{ border: "none", borderRadius: 8 }}
              className={styles.ttdkContent}
            ></iframe>
          </div>
        </Box>
      </BasicModal>
    </BasicModal>
  );
};

export default PreviewModal;
