import React, { Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ListPage from "@/app/components/layout/ListPage";
import { callApi, getSession } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
import TableListPage from "./_component/TableListPage";
import { FieldTypes } from "@/constants/masterData";
import SearchForm from "@/app/components/form/SearchForm";
import { resolve } from "path";

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Đơn hàng TTDK" },
];

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

  async function getOptionsCar(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.car.autoComplete, {
      params: formData,
    });

    console.log("dataOption", res);
    const dataOption = res?.data?.map((item: any) => ({
      value: item.id.toString(),
      label: item.numberPlates,
      otherData: item,
    }));
    return dataOption;
  }

  const searchData = [
    {
      name: "carId",
      placeholder: "Biển số xe",
      type: FieldTypes?.AUTOCOMPLETE,
      getOptionsData: getOptionsCar,
      isCamera: true,
    },
  ];

  const initialValuesSearch = {
    // s: "",
    // customerId: null,
    carId: null,
  };

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <ListPage
        searchForm={
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableListPage dataSource={list} deleteItem={hanldeDelete} />
        }
      />
    </Fragment>
  );
}
