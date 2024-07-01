import React from "react";
import { useCarDetail } from "@/app/admin/(admin)/hooks/car/useCar";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import CarForm from "@/app/admin/(admin)/(car)/car/create/CarForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function UpdateCar({ params, searchParams }: any) {
  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách khách hàng", href: "/admin/system-customers" },
    {
      title: "Danh sách xe",
      href: `/admin/system-customer/cars?customerId=${searchParams?.customerId}`,
    },
    { title: "Chi tiết xe" },
  ];
  const car = await callApi(apiConfig.admin.car.getById, {
    pathParams: {
      id: params.id,
    },
  });
  return (
    <>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <CarForm isPreview={true} isEditing={true} dataDetail={car} />
    </>
  );
}
