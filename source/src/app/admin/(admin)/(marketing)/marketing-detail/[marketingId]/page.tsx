import React from "react";
import MarketingCampaignForm from "../choose-products/MarketingCampaignForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function MarketingSavePage({
  params,
}: {
  params: { marketingId: string };
}) {
  const marketingDetail = await callApi(apiConfig.admin.marketing.getById, {
    pathParams: {
      id: params.marketingId,
    },
  });

  async function hanldeUpdate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.marketing.update, {
        pathParams: {
          id: params.marketingId,
        },
        data: formData,
      });
      return res;
    } catch (error) {
      return error;
    }
  }
  return (
    <div>
      <MarketingCampaignForm
        isEditing={true}
        dataDetail={marketingDetail}
        updateItem={hanldeUpdate}
      />
    </div>
  );
}
