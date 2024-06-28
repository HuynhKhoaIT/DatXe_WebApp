import React, { Fragment } from "react";
import TableProducts from "./_component/TableProducts";
import { callApi, getSession } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function ProductsManaga({ searchParams }: any) {
  const session = await getSession();
  const products = await callApi(apiConfig.admin.products.getList, {
    params: searchParams,
  });
  const productsDlbd = await callApi(apiConfig.admin.products.getListDlbd, {
    params: searchParams,
  });

  async function handleDelete(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.products.delete, {
        pathParams: {
          id: formData,
        },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return (
    <TableProducts
      user={session?.user}
      products={products || []}
      productsDlbd={productsDlbd || []}
      deleteItem={handleDelete}
    />
  );
}
