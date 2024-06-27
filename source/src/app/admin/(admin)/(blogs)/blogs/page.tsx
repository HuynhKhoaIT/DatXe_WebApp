import TableListPage from "./_component/TableListPage";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function Blogs({ searchParams }: any) {
  const posts = await callApi(apiConfig.admin.posts.getList, {
    params: searchParams,
  });
  async function handleDelete(formData: FormData) {
    "use server";
    const result = await callApi(apiConfig.admin.posts.delete, {
      pathParams: {
        id: formData,
      },
    });
    return { data: result };
  }

  return <TableListPage dataSource={posts} deleteItem={handleDelete} />;
}
