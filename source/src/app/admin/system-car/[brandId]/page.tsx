"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BrandCarForm from "../create/BrandCarForm";
import { useBrandDetail } from "../../hooks/system-car/Brand/useBrandCar";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { brandId: string };
}) {
  const { data: dataDetail, isLoading } = useBrandDetail(params?.brandId);
  return (
    <BrandCarForm
      isEditing={true}
      dataDetail={dataDetail}
      isLoading={isLoading}
    />
  );
}
