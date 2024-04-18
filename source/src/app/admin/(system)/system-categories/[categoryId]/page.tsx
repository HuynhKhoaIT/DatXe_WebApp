"use client";
import React, { useEffect, useState } from "react";
import CategoryForm from "../create/CategoryForm";
import axios from "axios";
import { useCategoryDetail } from "@/app/admin/hooks/category/useCategory";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { categoryId: string };
}) {
  const { data: category, isLoading } = useCategoryDetail(params?.categoryId);
  return (
    <CategoryForm
      isEditing={true}
      dataDetail={category}
      isLoading={isLoading}
    />
  );
}
