"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import YearCarForm from "../create/YearCarForm";
import { useBrandDetail } from "@/app/admin/hooks/system-car/Brand/useBrandCar";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { yearId: string };
}) {
  const { data: dataDetail, isLoading } = useBrandDetail(params?.yearId);

  return (
    <YearCarForm
      isEditing={true}
      dataDetail={dataDetail}
      isLoading={isLoading}
    />
  );
}
