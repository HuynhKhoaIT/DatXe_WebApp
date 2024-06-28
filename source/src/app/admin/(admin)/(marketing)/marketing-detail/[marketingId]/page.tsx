import React from "react";
import MarketingCampaignForm from "../choose-products/MarketingCampaignForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function MarketingSavePage({
  params,
  searchParams,
}: {
  params: { marketingId: string };
  searchParams: any;
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
  const categories = await callApi(apiConfig.admin.productCategory.getList, {});
  const categoryOptions = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  const products = await callApi(apiConfig.admin.products.getList, {
    params: searchParams,
  });
  return (
    <div>
      <MarketingCampaignForm
        isEditing={true}
        dataDetail={marketingDetail}
        updateItem={hanldeUpdate}
        products={products}
        categoryOptions={categoryOptions}
      />
    </div>
  );
}
