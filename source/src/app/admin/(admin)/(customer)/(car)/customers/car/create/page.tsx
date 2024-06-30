import React from "react";
import CarForm from "./CarForm";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
export default async function CreateCar() {
  async function handleCreate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.car.create, {
        data: formData,
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  const brand = await callApi(apiConfig.car.getBrands, {});
  const dataOption = brand?.data.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  const customers = await callApi(apiConfig.admin.customer.getList, {});
  const customerOption = customers?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.fullName + "-" + item.phoneNumber,
  }));
  return (
    <CarForm
      isEditing={false}
      createItem={handleCreate}
      brandOptions={dataOption}
      customerOptions={customerOption}
    />
  );
}
