import React from "react";
import ProductForm from "../create/ProductForm";
import { useProductDetail } from "../../hooks/product/useProduct";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export const dynamic = "force-dynamic";

export const revalidate = 0;

export default async function ProductSavePage({
  params,
}: {
  params: { productId: string };
}) {
  const productDetail = await callApi(apiConfig.admin.products.getById, {
    pathParams: { id: params.productId },
  });
  const categories = await callApi(apiConfig.admin.productCategory.getList, {});
  const categoryOptions = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  return (
    <ProductForm
      categoryOptions={categoryOptions}
      isEditing={true}
      dataDetail={productDetail?.data}
    />
  );
}
