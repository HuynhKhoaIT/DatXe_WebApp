import { callApi } from "@/lib/auth";
import TableListPage from "./TableListPage";
import apiConfig from "@/constants/apiConfig";

export default async function Banner({ searchParams }: any) {
  const banners = await callApi(apiConfig.admin.banner.getList, {
    params: {
      ...searchParams,
      kind: 2,
    },
  });

  async function hanldeDelete(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.banner.delete, {
        pathParams: {
          id: formData,
        },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return <TableListPage dataSource={banners} deleteItem={hanldeDelete} />;
}
