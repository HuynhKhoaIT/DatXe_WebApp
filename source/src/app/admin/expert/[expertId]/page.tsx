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
      />
    </Box>
  );
}
