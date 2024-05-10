"use client";
import React from "react";
import { useAddExpert } from "@/app/admin/(admin)/hooks/expert/useAddExpert";
import ExpertForm from "@/app/admin/(admin)/expert/create/ExpertForm";
export default function CreateCategory() {
  const {
    addItem,
    updateItem,
    provinceOptions,
    UltilitiesOptions,
    isLoadingUltilities,
  } = useAddExpert();
  return (
    <ExpertForm
      isSystem={true}
      isEditing={false}
      addItem={addItem}
      updateItem={updateItem}
      provinceOptions={provinceOptions}
      UltilitiesOptions={UltilitiesOptions}
      isLoadingUltilities={isLoadingUltilities}
    />
  );
}
