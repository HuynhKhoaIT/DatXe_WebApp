import { Fragment, ReactNode, Suspense } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
interface IProps {
  children: ReactNode;
}

export default function CreateLayout({ children }: IProps) {
  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách marketing", href: "/admin/system-marketing-list" },
    { title: "Cập nhật marketing" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div>{children}</div>
    </Fragment>
  );
}
