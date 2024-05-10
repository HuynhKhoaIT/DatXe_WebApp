"use client";
import { Box } from "@mantine/core";
import React from "react";
export const dynamic = "force-dynamic";
import ProductSave from "../create/ProductSave";
import { useProductDLPDDetail } from "../../hooks/product/useProduct";
import { useSearchParams } from "next/navigation";

export default function ProductDirection() {
  const searchParams = useSearchParams();
  const productId: any = searchParams.get("productId");
  const { data: productDetail, isPending, isLoading } = useProductDLPDDetail(
    productId
  );

  return (
    <Box maw={"100%"} mx="auto">
      <ProductSave
        isDirection={true}
        productDetail={productDetail}
        isLoading={isLoading || isPending}
      />
    </Box>
  );
}
