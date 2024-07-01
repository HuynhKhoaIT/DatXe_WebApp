import apiConfig from "@/constants/apiConfig";
import AmentityForm from "../create/AmentityForm";
import { callApi } from "@/lib/auth";
export const revalidate = 60;
export default async function UpdateAmentity({
  params,
}: {
  params: { id: number };
}) {
  const amentity = await callApi(apiConfig.amentity.getById, {
    pathParams: {
      id: params.id,
    },
  });
  async function handleUpdate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.amentity.update, {
        data: formData,
        pathParams: {
          id: params.id,
        },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return (
    <AmentityForm
      isEditing={true}
      dataDetail={amentity}
      updateItem={handleUpdate}
    />
  );
}
