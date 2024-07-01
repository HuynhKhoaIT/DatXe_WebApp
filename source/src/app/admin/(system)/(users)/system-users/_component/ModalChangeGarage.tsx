"use client";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconBan, IconChevronRight } from "@tabler/icons-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ModelChangeGarage({
  userId,
  opened,
  close,
  user,
}: any) {
  const form = useForm({
    initialValues: {
      garage_id: "",
    },
  });
  const handleSubmit = async (values: any) => {
    try {
      await axios.put(
        `https://v2.dlbd.vn/api/v3/app/change-garage/${userId}`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      toast.success("Điều hướng chuyên gia thành công");

      close();
      form.reset();
    } catch (error) {
      toast.error("Điều hướng chuyên gia thất bại");

      form.reset();
    }
  };
  return (
    <Modal
      //   title="Thay đổi chuyên gia"
      opened={opened}
      onClose={close}
      lockScroll={false}
      withCloseButton={false}
      centered
      size={350}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput {...form.getInputProps("garage_id")} label="Id chuyên gia" />

        <Group justify="end" style={{ marginTop: 10 }}>
          <Button
            variant="outline"
            key="cancel"
            onClick={close}
            color="red"
            leftSection={<IconBan />}
          >
            Huỷ bỏ
          </Button>
          <Button
            style={{ marginLeft: "12px" }}
            variant="filled"
            leftSection={<IconChevronRight />}
            color="blue"
            key="submit"
            type="submit"
          >
            Xác nhận
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
