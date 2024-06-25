import React from "react";
import OrderForm from "../[orderId]/OrderForm";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib/auth";
export default async function ChooseProducts() {
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
  return <OrderForm createItem={handleCreate} brandOptions={brandOptions} />;
}
