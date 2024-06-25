import React, { Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Button, Flex } from "@mantine/core";
import { FieldTypes, stepOrderOptions } from "@/constants/masterData";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import SearchForm from "@/app/components/form/SearchForm";
import ListPage from "@/app/components/layout/ListPage";
import FilterTable from "@/app/components/common/FilterTable";
import TableListPage from "./_component/TableListPage";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Quản lý đơn hàng" },
];
export default async function OrdersManaga({ searchParams }: any) {
  const orders = await callApi(apiConfig.admin.order.getList, {
    params: searchParams,
  });

  async function handleDeleteItem(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.order.delete, {
      pathParams: {
        id: formData,
      },
    });
    return res;
  }
  async function getOptionsCar(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.car.autoComplete, {
      params: formData,
    });

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
        actionBar={
          <Flex justify={"end"} align={"center"}>
            <Link
              href={{
                pathname: `/admin/order-manager/create`,
              }}
            >
              <Button
                size="lg"
                h={{ base: 42, md: 50, lg: 50 }}
                radius={0}
                leftSection={<IconPlus size={18} />}
              >
                Tạo đơn
              </Button>
            </Link>
          </Flex>
        }
        filterCategory={
          <FilterTable stepOptions={stepOrderOptions} keyQuery="step" />
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={
          <TableListPage dataSource={orders} deleteItem={handleDeleteItem} />
        }
      />
    </Fragment>
  );
}
