import CategoryListPage from "./CategoryListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { Fragment } from "react";

export default async function Categories() {
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh mục sản phẩm" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CategoryListPage />
    </Fragment>
  );
}
