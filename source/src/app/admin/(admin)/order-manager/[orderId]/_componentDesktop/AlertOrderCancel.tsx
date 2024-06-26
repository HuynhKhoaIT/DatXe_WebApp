"use client";
import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export default function AlertOrderCancel({ cancelReason }: any) {
  return (
    <Alert
      m={10}
      variant="light"
      color="red"
      title="Đơn hàng đã huỷ"
      icon={<IconInfoCircle />}
    >
      <span style={{ fontSize: "1rem" }}>
        Lí do: {cancelReason || "Không rõ"}
      </span>
    </Alert>
  );
}
