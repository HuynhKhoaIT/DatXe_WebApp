import { callApi } from "@/lib/auth";
import CategoryListPage from "./CategoryListPage";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { Fragment } from "react";
import apiConfig from "@/constants/apiConfig";

export default async function Categories({ searchParams }: any) {
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
  return (
    <Fragment>
      <CategoryListPage dataSource={categories} deleteItem={handleDelete} />
    </Fragment>
  );
}
