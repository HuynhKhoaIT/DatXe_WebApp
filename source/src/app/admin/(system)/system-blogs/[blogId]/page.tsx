"use client";
import NewsForm from "@/app/admin/(admin)/(blogs)/blog/create/NewsForm";
import { useNewsDetail } from "@/app/admin/(admin)/hooks/news/useNews";
import { Box } from "@mantine/core";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { blogId: string };
}) {
  const { data: news, isLoading: isLoadingNews } = useNewsDetail(
    params?.blogId
  );

  return (
    <Box maw={"100%"} mx="auto">
      <NewsForm
        isLoading={isLoadingNews}
        isEditing={true}
        dataDetail={news?.data || []}
      />
    </Box>
  );
}
