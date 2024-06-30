import React from "react";
import CarForm from "../create/CarForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export const revalidate = 60;
export default async function UpdateCar({
  params,
}: {
  params: { id: string };
}) {
  const car = await callApi(apiConfig.admin.car.getById, {
    pathParams: {
      id: params.id,
    },
  });
  async function handleUpdate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.car.update, {
        pathParams: {
          id: params.id,
        },
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
      isEditing={true}
      dataDetail={car}
      updateItem={handleUpdate}
      brandOptions={dataOption}
      customerOptions={customerOption}
    />
  );
}
