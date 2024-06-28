import TableListPage from "./TableListPage";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function Customers({ searchParams }: any) {
  const customers = await callApi(apiConfig.admin.customer.getList, {
    params: searchParams,
  });

  async function handleDelete(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.customer.delete, {
      pathParams: { id: formData },
    });
    return res;
  }

  const customersDlbd = await callApi(apiConfig.admin.customer.getListDlbd, {
    params: searchParams,
  });

  return (
    <TableListPage
      customers={customers}
      customersDlbd={customersDlbd}
      deleteItem={handleDelete}
    />
  );
}
