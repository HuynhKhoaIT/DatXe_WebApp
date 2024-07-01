import React from "react";
import AmentityForm from "./AmentityForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function CreateCategory() {
  async function handleCreate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.amentity.create, {
        data: formData,
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return <AmentityForm isEditing={false} createItem={handleCreate} />;
}
