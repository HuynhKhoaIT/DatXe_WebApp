import { callApi } from "@/lib/auth";
import TableListPage from "./TableListPage";
import apiConfig from "@/constants/apiConfig";

const Blogs = async ({ searchParams }: any) => {
  const blogs = await callApi(apiConfig.admin.posts.getList, {
    params: searchParams,
  });
  async function handleDelete(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.posts.delete, {
        pathParams: {
          id: formData,
        },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return <TableListPage dataSource={blogs} deleteItem={handleDelete} />;
};
export default Blogs;
