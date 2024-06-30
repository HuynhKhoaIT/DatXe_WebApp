"use client";
import React from "react";
import { useCarDetail } from "@/app/admin/(admin)/hooks/car/useCar";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import CarForm from "@/app/admin/(admin)/(car)/car/create/CarForm";
export default function UpdateCar({ params, searchParams }: any) {
  const { data: car, isLoading, isPending } = useCarDetail(params?.id);
  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách khách hàng", href: "/admin/system-customers" },
    {
      title: "Danh sách xe",
      href: `/admin/system-customer/cars?customerId=${searchParams?.customerId}`,
    },
    { title: "Chi tiết xe" },
  ];
  return (
    <>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <CarForm
        isPreview={true}
        isEditing={true}
        dataDetail={car}
        isLoading={isLoading}
        isPending={isPending}
      />
    </>
  );
}
