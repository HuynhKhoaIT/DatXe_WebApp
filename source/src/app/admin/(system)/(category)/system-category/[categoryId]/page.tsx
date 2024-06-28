import { callApi } from "@/lib/auth";
import CategoryForm from "../create/CategoryForm";
import apiConfig from "@/constants/apiConfig";
export const revalidate = 60;
export default async function UpdateCategory({
  params,
}: {
  params: { categoryId: string };
}) {
  const category = await callApi(apiConfig.admin.productCategory.getById, {
    pathParams: { id: params.categoryId },
  });
  async function handleUpdate(formData: FormData) {
    "use server";
    await callApi(apiConfig.admin.productCategory.update, {
      data: formData,
    });
  }
  return (
    <CategoryForm
      isEditing={true}
      dataDetail={category}
      updateItem={handleUpdate}
    />
  );
}
