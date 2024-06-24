import React from "react";
import CustomersForm from "./CustomersForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function CreateCustomer() {
  async function handleCreate(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.customer.create, {
      data: formData,
    });
    return res;
  }
  const provinces = await callApi(apiConfig.nation.provinceList, {});
  const provinceOptions = provinces?.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <CustomersForm
        isEditing={false}
        createItem={handleCreate}
        provinceOptions={provinceOptions}
      />
    </div>
  );
}
