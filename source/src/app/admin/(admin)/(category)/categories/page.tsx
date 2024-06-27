import CategoryListPage from "./CategoryListPage";
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

  return (
    <CategoryListPage
      user={session?.user}
      dataSource={categories}
      deleteItem={handleDelete}
    />
  );
}
