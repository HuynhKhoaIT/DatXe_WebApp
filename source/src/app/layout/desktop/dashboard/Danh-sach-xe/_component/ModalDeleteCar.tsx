import { Button, Card, Group, Modal } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { IconBan } from "@tabler/icons-react";

export default function ModalDeleteCar({
  openedDeleteCar,
  closeDeleteCar,
  deleteRow,
  handleDelete,
}: any) {
  const handleDeleteCar = (carId: string) => {
    handleDelete(carId);
  };
  return (
    <Modal
      title="Xoá"
      opened={openedDeleteCar}
      onClose={closeDeleteCar}
      zIndex={999}
    >
      <div>Bạn có muốn xoá xe không?</div>
      <Group justify="end" style={{ marginTop: 10 }}>
        <Button
          variant="outline"
          key="cancel"
          onClick={closeDeleteCar}
          color="red"
          leftSection={<IconBan />}
        >
          Huỷ bỏ
        </Button>
        <Button
          style={{ marginLeft: "12px" }}
          onClick={() => {
            closeDeleteCar();
            handleDeleteCar(deleteRow);
          }}
          variant="filled"
          color="blue"
          leftSection={<IconChevronRight />}
        >
          Tiếp tục
        </Button>
      </Group>
    </Modal>
  );
}
