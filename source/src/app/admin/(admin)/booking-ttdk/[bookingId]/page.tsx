"use client";
import { Box } from "@mantine/core";
import { useNewsDetail } from "../../hooks/news/useNews";
import BookingForm from "./BookingTTDKForm";
import { useBookingDetail } from "../../hooks/bookingTTDK/useBookingTTDK";
export const revalidate = 60;
export default function UpdateBookingTTDK({
  params,
}: {
  params: { bookingId: string };
}) {
  const { data: bookingData, isLoading: isLoadingBooking } = useBookingDetail(
    params?.bookingId
  );

  return (
    <Box maw={"100%"} mx="auto">
      <BookingForm
        isLoading={isLoadingBooking}
        isEditing={true}
        dataDetail={bookingData || []}
      />
    </Box>
  );
}
