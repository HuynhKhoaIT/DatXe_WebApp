"use client";
import { Modal, ScrollArea, Box } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useProductDLPDDetail } from "../../../hooks/product/useProduct";
import { useMediaQuery } from "@mantine/hooks";
import ProductSave from "../../product/create/ProductSave";

export default function ModalSyncProduct({ opened, close, productId }: any) {
  const { data: productDetail, isPending, isLoading } = useProductDLPDDetail(
    productId
  );
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Đồng bộ sản phẩm"
      size="98%"
      fullScreen={isMobile}
      radius={0}
    >
      <ProductSave
        isDirection={true}
        productDetail={productDetail}
        isLoading={isLoading || isPending}
        closeModalSync={close}
      />
    </Modal>
  );
}
