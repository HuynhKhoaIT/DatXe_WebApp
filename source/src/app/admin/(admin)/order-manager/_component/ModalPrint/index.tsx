"use client";
import OrderDetailPageMobile from "@/app/layout/mobile/gio-hang/OrderDetailPageMobile";
import { Box, Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function ModalPrint({ openModal, close, dataDetail }: any) {
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  return (
    <Modal
      opened={openModal}
      onClose={close}
      lockScroll
      centered
      radius={0}
      zIndex={999}
      closeOnEscape={false}
      closeOnClickOutside={false}
      fullScreen={isMobile}
      size={isMobile ? "100%" : "400px"}
    >
      <div>
        <OrderDetailPageMobile dataSource={dataDetail} close={close} />
      </div>
    </Modal>
  );
}
