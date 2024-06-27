import { callApi } from "@/lib/auth";
import TableListPage from "./_component/TableListPage";
import apiConfig from "@/constants/apiConfig";
export default async function Discounts({ searchParams }: any) {
  const data = await callApi(apiConfig.admin.marketing.getList, {
    params: searchParams,
  });
  async function handleDelete(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.marketing.delete, {
        pathParams: {
          id: formData,
        },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return <TableListPage dataSource={data} deleteItem={handleDelete} />;
}
