import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
import TableListPage from "./_component/TableListPage";

export default async function BookingTTDK({ searchParams }: any) {
  const list = await callApi(apiConfig.admin.ttdk.getList, {
    params: searchParams,
  });
  async function hanldeDelete(formData: FormData) {
    "use server";
    await callApi(apiConfig.admin.ttdk.delete, {
      pathParams: formData,
    });
  }

  return <TableListPage dataSource={list} deleteItem={hanldeDelete} />;
}
