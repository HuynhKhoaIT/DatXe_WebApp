"use client";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import React from "react";
export const dynamic = "force-dynamic";
import { getCategories } from "@/app/libs/prisma/category";
import ProductSave from "../create/ProductSave";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useProductDLPDDetail } from "../../hooks/product/useProduct";
import { useSearchParams } from "next/navigation";

export default function ProductDirection() {
  const searchParams = useSearchParams();
  const productId: any = searchParams.get("productId");
  const { data: productDetail } = useProductDLPDDetail(productId);

  return (
    <Box maw={"100%"} mx="auto">
      <ProductSave isDirection={true} productDetail={productDetail} />
    </Box>
  );
}
