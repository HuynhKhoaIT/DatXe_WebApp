import React from "react";
import MarketingCampaignForm from "./MarketingCampaignForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function ChooseProducts() {
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
  return <MarketingCampaignForm createItem={handleCreate} />;
}
