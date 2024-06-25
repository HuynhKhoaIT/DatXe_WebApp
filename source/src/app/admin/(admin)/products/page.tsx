import React, { Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Button, Flex } from "@mantine/core";
import { FieldTypes, kindProductOptions } from "@/constants/masterData";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import SearchForm from "@/app/components/form/SearchForm";
import TableProducts from "./_component/TableProducts";
import { callApi, getSession } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
import FilterCategories from "@/app/components/common/FilterCategory/FilterCategories";

const Breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Sản phẩm" },
];

export default async function ProductsManaga() {
  const session = await getSession();
  const searchData = [
    {
      name: "s",
      placeholder: "Tên sản phẩm",
      type: FieldTypes.STRING,
    },
    {
      name: "isProduct",
      placeholder: "Loại",
      type: FieldTypes.SELECT,
      data: kindProductOptions,
      submitOnChanged: true,
    },
  ];
  const initialValuesSearch = {
    s: "",
    isProduct: null,
    brandId: null,
    nameId: null,
    yearId: null,
    brand: null,
  };

  const categories = await callApi(apiConfig.admin.productCategory.getList, {});
  const categoryOptions = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));

  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div style={{ background: "#fff", marginBottom: 30 }}>
        <SearchForm
          searchData={searchData}
          brandFilter={true}
          initialValues={initialValuesSearch}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <Flex justify={"end"} align={"center"} gap={20}>
          <Link
            href={{
              pathname: `/admin/products/create`,
            }}
          >
            <Button
              size="lg"
              h={{ base: 42, md: 50, lg: 50 }}
              radius={0}
              leftSection={<IconPlus size={18} />}
            >
              Thêm mới
            </Button>
          </Link>
        </Flex>
      </div>

      <FilterCategories categories={categoryOptions} />
      <TableProducts user={session?.user} />
    </Fragment>
  );
}
