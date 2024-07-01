import { callApi } from "@/lib/auth";
import TableListPage from "./TableListPage";
import apiConfig from "@/constants/apiConfig";

const Expert = async ({ searchParams }: any) => {
  const experts = await callApi(apiConfig.admin.garage.getList, {});
  async function handleDelete(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.garage.delete, {
        pathParams: { id: formData },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return <TableListPage dataSource={experts} deleteItem={handleDelete} />;
};
export default Expert;
