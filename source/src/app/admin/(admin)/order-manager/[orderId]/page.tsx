import React from "react";
import OrderForm from "./OrderForm";
import { callApi, getSession } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function ProductSavePage({
  params,
}: {
  params: { orderId: string };
}) {
  const session = await getSession();
  const orderDetail = await callApi(apiConfig.admin.order.getById, {
    pathParams: {
      id: params.orderId,
    },
  });
  async function handleUpdate(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.order.update, {
      pathParams: { id: params.orderId },
      data: formData,
    });
    return res;
  }
  async function handleUpdateStep(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.order.updateStep, {
      data: formData,
    });
    return res;
  }

  async function handleDbDLBD(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.order.updateStep, {
      data: formData,
    });
    return res;
  }

  const brand = await callApi(apiConfig.car.getBrands, {});
  const brandOptions = brand?.data.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));

  return (
    <OrderForm
      isEditing={true}
      dataDetail={orderDetail}
      updateItem={handleUpdate}
      updateStep={handleUpdateStep}
      dbDLBD={handleDbDLBD}
      brandOptions={brandOptions}
      session={session}
    />
  );
}
