import React from "react";
import CarForm from "./CarForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function CreateCar() {
  async function handleCreate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.car.create, { data: formData });
    } catch (error) {
      return null;
    }
  }
  const brand = await callApi(apiConfig.car.getBrands, {});
  const dataOption = brand?.data.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  return (
    <CarForm
      isEditing={false}
      createItem={handleCreate}
      brandOptions={dataOption}
    />
  );
}
