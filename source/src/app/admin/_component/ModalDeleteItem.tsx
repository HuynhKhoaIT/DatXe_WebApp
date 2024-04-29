import { Button, Group, Modal } from "@mantine/core";
import { IconBan, IconChevronRight } from "@tabler/icons-react";

export default function ModalDeleteItem({
  openedDeleteItem,
  closeDeleteItem,
  handleDeleteItem,
  deleteRow,
}: any) {
  return (
    <Modal
      title="Xoá"
      opened={openedDeleteItem}
      onClose={closeDeleteItem}
      lockScroll={false}
      withCloseButton={false}
      centered
      size={350}
    >
      <p style={{ color: "gray" }}>Xác nhận xoá ra khỏi danh sách!</p>
      <Group justify="end" style={{ marginTop: 10 }}>
        <Button
          // h={{ base: 42, md: 50, lg: 50 }}
          variant="outline"
          key="cancel"
          onClick={closeDeleteItem}
          color="gray"
          leftSection={<IconBan />}
        >
          Huỷ bỏ
        </Button>
        <Button
          // h={{ base: 42, md: 50, lg: 50 }}
          style={{ marginLeft: "12px" }}
          onClick={() => {
            closeDeleteItem();
            handleDeleteItem(deleteRow);
          }}
          variant="filled"
          leftSection={<IconChevronRight />}
          color="red"
        >
          Xoá
        </Button>
      </Group>
    </Modal>
  );
}
