"use client";
import { ReactNode, Fragment } from "react";
import styles from "../index.module.scss";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { useSearchParams } from "next/navigation";
interface IProps {
  children: ReactNode;
}

export default function CreateLayout({ children }: IProps) {
  const searchParam = useSearchParams();
  const brandId = searchParam.get("brandId");
  const modelId = searchParam.get("modelId");

  const Breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh sách hãng xe", href: "/admin/system-car" },
    {
      title: "Danh sách dòng xe",
      href: `/admin/system-car?brandId=${brandId}`,
    },
    {
      title: "Danh sách NSX",
      href: `/admin/system-car/model-car/year-car?brandId=${brandId}&modelId=${modelId}`,
    },

    { title: "Thêm NSX" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={Breadcrumbs} />
      <div>{children}</div>
    </Fragment>
  );
}
