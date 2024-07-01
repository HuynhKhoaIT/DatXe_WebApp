import NewsForm from "@/app/admin/(admin)/(blogs)/blog/create/NewsForm";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib/auth";
import React from "react";
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
