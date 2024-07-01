import { Fragment, ReactNode } from "react";
import ListPage from "@/app/components/layout/ListPage";
import SearchForm from "@/app/components/form/SearchForm";
import { FieldTypes, statusOptions } from "@/constants/masterData";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import ActionBar from "@/app/components/common/ActionBar";
interface IProps {
  children: ReactNode;
}

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Chuyên gia" },
];
export default async function Layout({ children }: IProps) {
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <ListPage
        style={{ height: "100%" }}
        titleTable={false}
        baseTable={<>{children}</>}
      />
    </Fragment>
  );
}
