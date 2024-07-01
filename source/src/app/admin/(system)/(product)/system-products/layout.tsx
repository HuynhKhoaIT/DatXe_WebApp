import { Fragment, ReactNode } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import {
  FieldTypes,
  kindProductOptions,
  statusOptions,
} from "@/constants/masterData";
import Breadcrumb from "@/app/components/form/Breadcrumb";
interface IProps {
  children: ReactNode;
}
const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Sản phẩm" },
];
export default async function Layout({ children }: IProps) {
  const searchData = [
    // {
    //   name: "garageId",
    //   placeholder: "Chuyên gia",
    //   type: FieldTypes.AUTOCOMPLETE,
    // },
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
    },
  ];
  const initialValuesSearch = {
    s: "",
    isProduct: null,
    brandId: null,
    nameId: null,
    yearId: null,
    brand: null,
    GarageId: null,
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
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
