import React from "react";
import MarketingCampaignForm from "./MarketingCampaignForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function ChooseProducts({ searchParams }: any) {
  async function handleCreate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.marketing.create, {
        data: formData,
      });
      return res;
    } catch (error) {
      return error;
    }
  }
  const categories = await callApi(apiConfig.admin.productCategory.getList, {});
  const categoryOptions = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  const products = await callApi(apiConfig.admin.products.getList, {
    params: searchParams,
  });
  return (
    <MarketingCampaignForm
      createItem={handleCreate}
      products={products}
      categoryOptions={categoryOptions}
    />
  );
}
