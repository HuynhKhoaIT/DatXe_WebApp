"use client";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconBan, IconChevronRight } from "@tabler/icons-react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function ModelChangeGarage({ userId, opened, close }: any) {
  const { data } = useSession();
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
            Authorization: `Bearer ${data?.user?.token}`,
          },
        }
      );
      notifications.show({
        title: "Thành công",
        message: "Điều hướng chuyên gia thành công",
      });
      close();
      form.reset();
    } catch (error) {
      notifications.show({
        title: "Thất bại",
        message: "Điều hướng chuyên gia thất bại",
      });
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
