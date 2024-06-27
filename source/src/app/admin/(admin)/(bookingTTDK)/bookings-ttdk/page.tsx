import React, { Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ListPage from "@/app/components/layout/ListPage";
import { callApi, getSession } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
import TableListPage from "./_component/TableListPage";
import { FieldTypes } from "@/constants/masterData";
import SearchForm from "@/app/components/form/SearchForm";
import { resolve } from "path";

export default async function BookingTTDK({ searchParams }: any) {
  const list = await callApi(apiConfig.admin.ttdk.getList, {
    params: searchParams,
  });
  async function hanldeDelete(formData: FormData) {
    "use server";
    await callApi(apiConfig.admin.ttdk.delete, {
      pathParams: formData,
    });
  }

  return <TableListPage dataSource={list} deleteItem={hanldeDelete} />;
}
