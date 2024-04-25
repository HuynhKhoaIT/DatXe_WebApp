"use client";
import { ReactNode, Fragment } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { useSearchParams } from "next/navigation";
interface IProps {
  children: ReactNode;
}

export default function CreateLayout({ children }: IProps) {
  const searchParams = useSearchParams();
  const customerId: any = searchParams.get("customerId");
  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách khách hàng", href: "/admin/customers" },
    {
      title: "Danh sách xe",
      href: `/admin/customers/cars?customerId=${customerId}`,
    },
    { title: "Cập nhật xe" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      {children}
    </Fragment>
  );
}
