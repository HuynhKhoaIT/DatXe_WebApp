import TableListPage from "./_component/TableListPage";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function OrdersManaga({ searchParams }: any) {
  const orders = await callApi(apiConfig.admin.order.getList, {
    params: searchParams,
  });

  async function handleDeleteItem(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.order.delete, {
      pathParams: {
        id: formData,
      },
    });
    return res;
  }

  return <TableListPage dataSource={orders} deleteItem={handleDeleteItem} />;
}
