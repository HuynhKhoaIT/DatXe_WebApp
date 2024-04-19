"use client";
import styles from "./index.module.scss";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconBan, IconPlus } from "@tabler/icons-react";
export default function FooterSavePage({
  saveLoading,
  okText = "Thêm",
  cancelText = "Huỷ",
  isOk = true,
  children,
}: any) {
  const router = useRouter();
  return (
    <div className={styles.footerSavePage}>
      {children}
      <Button
        size="lg"
        radius={0}
        h={{ base: 42, md: 50, lg: 50 }}
        variant="outline"
        key="cancel"
        color="red"
        leftSection={<IconBan size={16} />}
        onClick={() => router.back()}
      >
        {cancelText}
      </Button>
      {isOk && (
        <Button
          size="lg"
          radius={0}
          h={{ base: 42, md: 50, lg: 50 }}
          loading={saveLoading}
          key="submit"
          type="submit"
          variant="filled"
          leftSection={<IconPlus size={16} />}
        >
          {okText}
        </Button>
      )}
    </div>
  );
}
