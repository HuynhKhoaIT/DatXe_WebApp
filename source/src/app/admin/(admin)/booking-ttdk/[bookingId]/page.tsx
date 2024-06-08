"use client";
import { Box } from "@mantine/core";
import { useNewsDetail } from "../../hooks/news/useNews";
import BookingForm from "./BookingTTDKForm";
export const revalidate = 60;
export default function UpdateBookingTTDK({
  params,
}: {
  params: { blogId: string };
}) {
  const { data: news, isLoading: isLoadingNews } = useNewsDetail(
    params?.blogId
  );

  return (
    <Box maw={"100%"} mx="auto">
      <BookingForm
        isLoading={isLoadingNews}
        isEditing={true}
        dataDetail={news?.data || []}
      />
    </Box>
  );
}
