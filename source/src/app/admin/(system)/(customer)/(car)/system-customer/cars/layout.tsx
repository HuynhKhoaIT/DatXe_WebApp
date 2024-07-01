import { Fragment, ReactNode } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import { FieldTypes, statusOptions } from "@/constants/masterData";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ActionBar from "@/app/components/common/ActionBar";
import { getOptionsCar } from "@/app/admin/(admin)/(orders)/order-manager/until";
interface IProps {
  children: ReactNode;
}
const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách khách hàng", href: "/admin/system-customers" },

  { title: "Danh sách xe" },
];

export default async function Layout({ children, searchParams }: any) {
  console.log("searchParams", searchParams);
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
    carBrandId: null,
    nameId: null,
    yearId: null,
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
        titleTable={false}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
