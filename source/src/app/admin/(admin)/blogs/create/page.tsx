import React from "react";
import NewsForm from "./NewsForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function CreateCategory() {
  async function handleCreate(formData: FormData) {
    "use server";
    const result = await callApi(apiConfig.admin.posts.create, {
      data: formData,
    });
    return { data: result };
  }
  return <NewsForm isEditing={false} createItem={handleCreate} />;
}
