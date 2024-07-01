import { callApi } from "@/lib/auth";
import TableListPage from "./TableListPage";
import apiConfig from "@/constants/apiConfig";

export default async function amenities({ searchParams }: any) {
  const ultilities = await callApi(apiConfig.amentity.getList, {
    params: searchParams,
  });

  async function handleDelete(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.amentity.delete, {
        pathParams: { id: formData },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return <TableListPage dataSource={ultilities} deleteItem={handleDelete} />;
}
