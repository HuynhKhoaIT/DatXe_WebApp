import { Box } from "@mantine/core";
import BookingForm from "./BookingTTDKForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function UpdateBookingTTDK({
  params,
}: {
  params: { bookingId: string };
}) {
  const bookingData = await callApi(apiConfig.admin.ttdk.getById, {
    pathParams: { id: params.bookingId },
  });

  async function updateItem(formData: FormData) {
    "use server";
    await callApi(apiConfig.admin.ttdk.udpate, {
      data: formData,
      pathParams: {
        id: params.bookingId,
      },
    });
  }
  return (
    <Box maw={"100%"} mx="auto">
      <BookingForm
        isEditing={true}
        dataDetail={bookingData || []}
        updateItem={updateItem}
      />
    </Box>
  );
}
