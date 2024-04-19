"use client";
import { Box } from "@mantine/core";
import ExpertForm from "../create/ExpertForm";
import { useExpertDetail } from "../../hooks/expert/useExpert";
import { useAddExpert } from "../../hooks/expert/useAddExpert";
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
        isLoading={isLoading || isPending}
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
      />
    </Box>
  );
}
