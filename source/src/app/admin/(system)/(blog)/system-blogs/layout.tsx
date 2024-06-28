import { Fragment, ReactNode } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import { getSession } from "@/lib/auth";
import { FieldTypes, statusOptions } from "@/constants/masterData";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ActionBar from "@/app/components/common/ActionBar";
interface IProps {
  children: ReactNode;
}
const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Bài viết" },
];
export default async function Layout({ children }: IProps) {
  const searchData = [
    {
      name: "s",
      placeholder: "Tên",
      type: FieldTypes.STRING,
    },
    {
      name: "phoneNumber",
      placeholder: "Số điện thoại",
      type: FieldTypes.STRING,
    },
  ];
  const initialValuesSearch = {
    s: "",
    phoneNumber: "",
  };
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <ListPage
        actionBar={<ActionBar linkTo="/admin/system-blogs/create" />}
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
