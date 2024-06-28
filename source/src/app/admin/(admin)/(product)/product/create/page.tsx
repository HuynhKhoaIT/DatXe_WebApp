import React from "react";
import ProductSave from "./ProductSave";
import { callApi, getSession } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function CreateProduct() {
  const session = await getSession();
  const categories = await callApi(apiConfig.admin.productCategory.getList, {});
  const categoryOptions = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));

  async function handleCreate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.products.create, {
        data: formData,
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return (
    <ProductSave
      isDirection={false}
      user={session?.user}
      categoryOptions={categoryOptions}
      createItem={handleCreate}
    />
  );
}
