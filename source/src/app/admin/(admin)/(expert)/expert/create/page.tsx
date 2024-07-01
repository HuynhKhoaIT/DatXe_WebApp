import React from "react";
import ExpertForm from "./ExpertForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function CreateCategory() {
  async function addItem(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.garage.create, {
        data: formData,
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  async function createQr(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.garage.createQrCode, {
        data: formData,
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  const provinces = await callApi(apiConfig.nation.provinceList, {});
  const provinceOptions = provinces?.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  const ultilities = await callApi(apiConfig.amentity.getList, {});
  const UltilitiesOptions = ultilities?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));

  return (
    <ExpertForm
      isEditing={false}
      addItem={addItem}
      provinceOptions={provinceOptions}
      UltilitiesOptions={UltilitiesOptions}
      createQr={createQr}
    />
  );
}
