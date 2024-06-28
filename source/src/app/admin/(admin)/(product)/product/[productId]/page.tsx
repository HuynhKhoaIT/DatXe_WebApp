import React from "react";
import ProductForm from "../create/ProductForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
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
  async function handleUpdate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.products.update, {
        pathParams: {
          id: params.productId,
        },
        data: formData,
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return (
    <ProductForm
      categoryOptions={categoryOptions}
      isEditing={true}
      dataDetail={productDetail?.data}
      updateItem={handleUpdate}
    />
  );
}
