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
  { title: "Danh sách tiện ich" },
];
export default async function Layout({ children }: IProps) {
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <ListPage
        actionBar={<ActionBar linkTo="/admin/amentity/create" />}
        style={{ height: "100%" }}
        titleTable={true}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
