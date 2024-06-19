"use client";
import { Button, Card, Group, Modal } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { IconBan } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function ModalSetCarDefault({
  openedSetDefault,
  closeSetDefault,
  dataCarDefault,
  handleSetDefault,
}: any) {
  const router = useRouter();
  const handleCarDefault = () => {
    handleSetDefault({ uuId: dataCarDefault?.uuId });
    router.refresh();
    closeSetDefault();
  };
  return (
    <Modal
      size={400}
      opened={openedSetDefault}
      onClose={closeSetDefault}
      title="Xác nhận"
      lockScroll={false}
      zIndex={999}
    >
      <Card withBorder>
        <div>Biển số: {dataCarDefault?.numberPlates}</div>
      </Card>
      <Group justify="end" style={{ marginTop: 10 }}>
        <Button
          variant="outline"
          color="red"
          onClick={closeSetDefault}
          leftSection={<IconBan />}
        >
          Huỷ bỏ
        </Button>
        <Button
          leftSection={<IconChevronRight />}
          color="blue"
          variant="filled"
          onClick={() => handleCarDefault()}
        >
          Tiếp tục
        </Button>
      </Group>
    </Modal>
  );
}
