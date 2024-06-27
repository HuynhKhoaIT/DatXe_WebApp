import CategoryForm from "../create/CategoryForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
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
      handleUpdate={handleUpdate}
    />
  );
}
