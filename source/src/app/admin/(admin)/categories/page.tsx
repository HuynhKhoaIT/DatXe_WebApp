import CategoryListPage from "./CategoryListPage";
import Breadcrumb from "@/app/components/form/Breadcrumb";
import { getServerSession } from "next-auth";
import { Fragment } from "react";
import { callApi, getSession } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function Categories({ searchParams }: any) {
  let session = await getSession();

  const categories = await callApi(apiConfig.admin.productCategory.getList, {
    params: searchParams,
  });
  async function handleDelete(formData: FormData) {
    "use server";
    await callApi(apiConfig.admin.productCategory.delete, {
      pathParams: {
        id: formData,
      },
    });
  }
  const breadcrumbs = [
    { title: "Tổng quan", href: "/admin" },
    { title: "Danh mục sản phẩm" },
  ];
  return (
    <Fragment>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <CategoryListPage
        user={session?.user}
        dataSource={categories}
        deleteItem={handleDelete}
      />
    </Fragment>
  );
}
