"use client";
import ExpertForm from "@/app/admin/(admin)/expert/create/ExpertForm";
import { useAddExpert } from "@/app/admin/(admin)/hooks/expert/useAddExpert";
import { useExpertDetail } from "@/app/admin/(admin)/hooks/expert/useExpert";
import { Box } from "@mantine/core";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { expertId: string };
}) {
  const { data: expert, isLoading, isPending } = useExpertDetail(
    params.expertId
  );
  const {
    addItem,
    updateItem,
    provinceOptions,
    UltilitiesOptions,
    isLoadingUltilities,
    isPendingUpdate,
    isPendingAdd,
    createQr,
    isPendingQr,
  } = useAddExpert();
  return (
    <Box maw={"100%"} mx="auto">
      <ExpertForm
        isLoading={isLoading}
        isEditing={true}
        dataDetail={expert}
        addItem={addItem}
        updateItem={updateItem}
        provinceOptions={provinceOptions}
        UltilitiesOptions={UltilitiesOptions}
        isLoadingUltilities={isLoadingUltilities}
        isPendingUpdate={isPendingUpdate}
        isPendingAdd={isPendingAdd}
        createQr={createQr}
        isPendingQr={isPendingQr}
        isCreateQr={expert?.bitlyUrl}
        isSystem={true}
      />
    </Box>
  );
}
