import { Fragment, ReactNode } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import { callApi, getSession } from "@/lib/auth";
import {
  FieldTypes,
  kindMarketingOptions,
  kindProductOptions,
} from "@/constants/masterData";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ActionBar from "@/app/components/common/ActionBar";
import FilterCategories from "@/app/components/common/FilterCategory/FilterCategories";
import apiConfig from "@/constants/apiConfig";
interface IProps {
  children: ReactNode;
}

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Sản phẩm" },
];
export default async function Layout({ children }: IProps) {
  const session = await getSession();

  const categories = await callApi(apiConfig.admin.productCategory.getList, {});
  const categoryOptions = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));

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
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <ListPage
        searchForm={
          <SearchForm
            searchData={searchData}
            brandFilter={false}
            initialValues={initialValuesSearch}
          />
        }
        actionBar={<ActionBar linkTo="/admin/product/create" />}
        FilterCategories={<FilterCategories categories={categoryOptions} />}
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
