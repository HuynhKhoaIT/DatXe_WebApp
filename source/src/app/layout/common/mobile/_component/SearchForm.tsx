"use client";
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./index.module.scss";
import { ActionIcon, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
export default function SearchFormMobile() {
  const searchParams = useSearchParams();
  const s: any = searchParams.get("s");
  const router = useRouter();
  const form = useForm({
    initialValues: {
      searchValue: s || "",
    },
    validate: {},
  });
  const handleSubmit = (values: any) => {
    try {
      router.push(`/tim-kiem?s=${values?.searchValue}`);
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  return (
    <form
      style={{ flex: "1" }}
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
    >
      <Input
        {...form.getInputProps("searchValue")}
        classNames={{
          input: styles.inputSearch,
        }}
        leftSectionPointerEvents="all"
        leftSection={
          <ActionIcon variant="transparent" type="submit">
            <IconSearch color="var(--blue-color)" />
          </ActionIcon>
        }
        placeholder="Vui lòng nhập..."
      />
    </form>
  );
}
