"use client";
import { Fragment, ReactNode, Suspense } from "react";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { useSearchParams } from "next/navigation";
interface IProps {
  children: ReactNode;
}

export default function CreateLayout({ children }: IProps) {
  const searchParam = useSearchParams();
  const brandId = searchParam.get("brandId");
  const brandName = searchParam.get("brandName");

  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách hãng xe", href: "/admin/system-car" },
    {
      title: brandName,
      href: `/admin/system-car/model-car?brandId=${brandId}&brandName=${brandName}`,
    },
    { title: "Cập nhật dòng xe" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div>{children}</div>
    </Fragment>
  );
}
