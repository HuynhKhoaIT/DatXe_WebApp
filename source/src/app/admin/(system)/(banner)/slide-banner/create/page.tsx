import React from "react";
import BannerForm from "./BannerForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default function CreateCategory() {
  async function handleCreate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.banner.create, {
        data: formData,
      });
      return res;
    } catch (error) {
      return error;
    }
  }
  return <BannerForm isEditing={false} createItem={handleCreate} />;
}
