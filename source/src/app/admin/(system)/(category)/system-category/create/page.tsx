import React from "react";
import CategoryForm from "./CategoryForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default function CreateCategory() {
  async function handleCreate(formData: FormData) {
    "use server";
    await callApi(apiConfig.admin.productCategory.create, {
      data: formData,
    });
  }
  return <CategoryForm isEditing={false} createItem={handleCreate} />;
}
