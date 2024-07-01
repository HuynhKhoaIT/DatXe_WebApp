import BannerForm from "../create/BannerForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function UpdateAmentity({
  params,
}: {
  params: { id: number };
}) {
  const banner = await callApi(apiConfig.admin.banner.getById, {
    pathParams: {
      id: params.id,
    },
  });

  async function handleUpdateItem(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.banner.update, {
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
    <BannerForm
      isEditing={true}
      dataDetail={banner?.data}
      updateItem={handleUpdateItem}
    />
  );
}
