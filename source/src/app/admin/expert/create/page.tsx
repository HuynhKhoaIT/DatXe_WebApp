"use client";
import React from "react";
import ExpertForm from "./ExpertForm";
import { useAddExpert } from "../../hooks/expert/useAddExpert";
export default function CreateCategory() {
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
    <ExpertForm
      isEditing={false}
      addItem={addItem}
      updateItem={updateItem}
      provinceOptions={provinceOptions}
      UltilitiesOptions={UltilitiesOptions}
      isLoadingUltilities={isLoadingUltilities}
      isPendingUpdate={isPendingUpdate}
      isPendingAdd={isPendingAdd}
    />
  );
}
