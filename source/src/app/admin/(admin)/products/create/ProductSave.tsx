"use client";
import { Box, Space } from "@mantine/core";
import ProductForm from "./ProductForm";
export default function ProductSave({ isDirection, productDetail }: any) {
  return (
    <Box maw={"100%"} mx="auto">
      <ProductForm
        isEditing={false}
        dataDetail={isDirection ? productDetail : []}
        isDirection={isDirection}
      />
    </Box>
  );
}
