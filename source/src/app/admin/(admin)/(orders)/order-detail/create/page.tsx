import React from "react";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib/auth";
import OrderForm from "../[orderId]/OrderForm";
export default async function ChooseProducts({ searchParams }: any) {
  const brand = await callApi(apiConfig.car.getBrands, {});
  const brandOptions = brand?.data.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  async function handleCreate(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.order.create, {
      data: formData,
    });
    return res;
  }
  const categories = await callApi(apiConfig.admin.productCategory.getList, {});
  const categoryOptions = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  const products = await callApi(apiConfig.admin.products.getList, {
    params: searchParams,
  });
  return (
    <OrderForm
      createItem={handleCreate}
      brandOptions={brandOptions}
      products={products}
      categoryOptions={categoryOptions}
    />
  );
}
