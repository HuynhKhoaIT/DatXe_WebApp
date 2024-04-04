"use client";
import React, { useEffect, useState } from "react";
import ModelCarForm from "../create/ModelCarForm";
import { useBrandDetail } from "@/app/admin/hooks/system-car/Brand/useBrandCar";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { modelId: string };
}) {
  const { data: dataDetail, isLoading } = useBrandDetail(params?.modelId);

  return (
    <ModelCarForm
      isEditing={true}
      dataDetail={dataDetail}
      isLoading={isLoading}
    />
  );
}
