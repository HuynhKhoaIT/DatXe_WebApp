import { Fragment, ReactNode } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import { getSession } from "@/lib/auth";
import { FieldTypes, kindMarketingOptions } from "@/constants/masterData";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ActionBar from "@/app/components/common/ActionBar";
interface IProps {
  children: ReactNode;
}

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách chương trình" },
];
export default async function Layout({ children }: IProps) {
  const session = await getSession();
  const searchData = [
    {
      name: "s",
      placeholder: "Tên chương trình",
      type: FieldTypes.STRING,
    },
    {
      name: "state",
      placeholder: "Tình trạng",
      type: FieldTypes.SELECT,
      data: kindMarketingOptions,
    },
  ];
  const initialValuesSearch = {
    s: "",
    state: null,
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
        actionBar={
          <ActionBar linkTo="/admin/marketing-detail/choose-products" />
        }
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
