import ExpertForm from "@/app/admin/(admin)/(expert)/expert/create/ExpertForm";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib/auth";
import React from "react";
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
  const provinces = await callApi(apiConfig.nation.provinceList, {});
  const provinceOptions = provinces?.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  const ultilities = await callApi(apiConfig.amentity.getList, {});
  const UltilitiesOptions = ultilities?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));

  return (
    <ExpertForm
      isSystem={true}
      isEditing={false}
      addItem={addItem}
      provinceOptions={provinceOptions}
      UltilitiesOptions={UltilitiesOptions}
    />
  );
}
