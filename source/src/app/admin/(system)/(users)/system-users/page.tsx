import { callApi, getSession } from "@/lib/auth";
import TableListPage from "./TableListPage";
import apiConfig from "@/constants/apiConfig";

export default async function UserListPage({ searchParams }: any) {
  const session = await getSession();
  const users = await callApi(apiConfig.admin.user.getList, {
    params: searchParams,
  });

  return <TableListPage dataSource={users} session={session} />;
}
