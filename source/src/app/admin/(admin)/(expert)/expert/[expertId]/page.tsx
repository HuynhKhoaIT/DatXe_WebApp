import { Box } from "@mantine/core";
import ExpertForm from "../create/ExpertForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function UpdateCategory({
  params,
}: {
  params: { expertId: string };
}) {
  const expert = await callApi(apiConfig.admin.garage.getById, {
    pathParams: {
      id: params.expertId,
    },
  });
  async function updateItem(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.garage.update, {
        data: formData,
        pathParams: {
          id: params.expertId,
        },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  async function createQr(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.garage.createQrCode, {
        data: formData,
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  const provinces = await callApi(apiConfig.nation.provinceList, {});
  const provinceOptions = provinces?.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  const ultilities = await callApi(apiConfig.amentity.getList, {});
  const UltilitiesOptions = ultilities?.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  return (
    <Box maw={"100%"} mx="auto">
      <ExpertForm
        isEditing={true}
        dataDetail={expert}
        updateItem={updateItem}
        provinceOptions={provinceOptions}
        UltilitiesOptions={UltilitiesOptions}
        createQr={createQr}
        isCreateQr={expert?.bitlyUrl}
      />
    </Box>
  );
}
