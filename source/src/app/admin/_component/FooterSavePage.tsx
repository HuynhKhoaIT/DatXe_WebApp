"use client";
import styles from "./index.module.scss";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconBan, IconPlus } from "@tabler/icons-react";
import classNames from "classnames";
export default function FooterSavePage({
  saveLoading,
  okText = "Thêm",
  cancelText = "Huỷ",
  isOk = true,
  isCancel = true,
  children,
  isAbsolute = true,
  colorOk,
  colorCancel = "red",
  sizeButton = "lg",
  className,
}: any) {
  const router = useRouter();
  return (
    <div
      className={classNames(
        isAbsolute ? styles.footerSavePage : styles.footer,
        className
      )}
    >
      {children}
      {isCancel && (
        <Button
          size={sizeButton}
          radius={0}
          // h={{ base: 42, md: 50, lg: 50 }}
          variant="outline"
          key="cancel"
          color={colorCancel}
          leftSection={<IconBan size={16} />}
          onClick={() => router.back()}
        >
          {cancelText}
        </Button>
      )}

      {isOk && (
        <Button
          size={sizeButton}
          radius={0}
          // h={{ base: 42, md: 50, lg: 50 }}
          loading={saveLoading}
          key="submit"
          type="submit"
          variant="filled"
          color={colorOk}
          leftSection={<IconPlus size={16} />}
        >
          {okText}
        </Button>
      )}
    </div>
  );
}
