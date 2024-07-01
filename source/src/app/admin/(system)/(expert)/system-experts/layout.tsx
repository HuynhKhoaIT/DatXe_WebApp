import { Fragment, ReactNode } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import { FieldTypes, statusOptions } from "@/constants/masterData";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ActionBar from "@/app/components/common/ActionBar";
import FilterTable from "@/app/components/common/FilterTable";
interface IProps {
  children: ReactNode;
}

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách chuyên gia" },
];
export default async function Layout({ children }: IProps) {
  const searchData = [
    {
      name: "s",
      placeholder: "Tên hoặc số điện thoại",
      type: FieldTypes.STRING,
    },
  ];

  const initialValuesSearch = {
    s: "",
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
        filterCategory={
          <FilterTable keyQuery="status" stepOptions={statusOptions} />
        }
        // actionBar={<ActionBar linkTo="/admin/system-expert/create" />}
        style={{ height: "100%" }}
        titleTable={false}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
