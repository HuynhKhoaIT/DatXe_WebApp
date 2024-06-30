import { Fragment, ReactNode, Suspense } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import { getSession } from "@/lib/auth";
import { FieldTypes, statusOptions } from "@/constants/masterData";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ActionBar from "@/app/components/common/ActionBar";
import { Skeleton } from "@mantine/core";
interface IProps {
  children: ReactNode;
}

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách xe" },
];

export default async function Layout({ children }: any) {
  const session = await getSession();
  const searchData = [
    // {
    //   name: "carId",
    //   placeholder: "Biển số xe",
    //   type: FieldTypes?.AUTOCOMPLETE,
    //   getOptionsData: getOptionsCar,
    //   isCamera: true,
    // },
    {
      name: "s",
      placeholder: "Biển số xe",
      type: FieldTypes?.STRING,
      // getOptionsData: getOptionsCar,
      // isCamera: true,
    },
  ];
  const initialValuesSearch = {
    s: null,
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
        actionBar={<ActionBar linkTo="/admin/car/create" />}
        style={{ height: "100%" }}
        titleTable={false}
        baseTable={
          <Suspense fallback={<Skeleton h={500} />}>{children}</Suspense>
        }
      />
    </Fragment>
  );
}
