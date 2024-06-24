import { Box } from "@mantine/core";
import NewsForm from "../create/NewsForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function UpdateCategory({
  params,
}: {
  params: { blogId: string };
}) {
  const post = await callApi(apiConfig.admin.posts.getById, {
    pathParams: {
      id: params.blogId,
    },
  });
  async function handleUpdate(formData: FormData) {
    "use server";
    const result = await callApi(apiConfig.admin.posts.update, {
      pathParams: {
        id: params.blogId,
      },
      data: formData,
    });
    return { data: result };
  }
  return (
    <Box maw={"100%"} mx="auto">
      <NewsForm
        isEditing={true}
        dataDetail={post.data || []}
        updateItem={handleUpdate}
      />
    </Box>
  );
}
