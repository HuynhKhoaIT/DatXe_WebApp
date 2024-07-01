"use client";
import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Modal,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { IconBan } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AutocompletePhone } from "../AutoCompletePhone";
import { getOptionsPhone } from "../../until";

export default function ModalUpdateCustomer({
  openModal,
  close,
  dataDetail,
  formOrder,
  updateCustomer,
}: any) {
  const [loading, handlers] = useDisclosure();
  const [loadingCustomer, handlersLoadingCustomer] = useDisclosure();

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      customerId: dataDetail?.id,
      fullName: dataDetail?.fullName,
      phoneNumber: dataDetail?.phoneNumber,
      address: dataDetail?.address,
    },
    validate: {
      fullName: (value) => (value.length < 1 ? "Không được để trống" : null),
      phoneNumber: (value) =>
        value
          ? /^0[1-9][0-9]{8}$/.test(value)
            ? null
            : "Số điện thoại sai định dạng"
          : null,
    },
  });
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  const handleSubmit = async (values: any) => {
    handlers.open();
    try {
      await updateCustomer(values);
      formOrder.setFieldValue("fullName", values?.fullName);
      formOrder.setFieldValue("address", values?.address);
      formOrder.setFieldValue("phoneNumber", values?.phoneNumber);
      formOrder.setFieldValue("customerId", values?.customerId);
      handlers.close();
      close();
    } catch (error) {
      handlers.close();
    }
  };
  return (
    <Modal
      opened={openModal}
      onClose={close}
      lockScroll
      centered
      radius={0}
      zIndex={99}
      closeOnEscape={false}
      closeOnClickOutside={false}
      size={isMobile ? "100%" : "600px"}
      title="Cập nhật khách hàng"
    >
      <Box w={"100%"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid gutter={16}>
            <Grid.Col span={6}>
              {/* <TextInput
                size="md"
                radius={0}
                // withAsterisk
                {...form.getInputProps("phoneNumber")}
                label="Số điện thoại"
                type="text"
                placeholder="Số điện thoại"
              /> */}
              <AutocompletePhone
                // isUser={isUser}
                placeholder="Số điện thoại"
                label="Số điện thoại"
                isClear={false}
                getOptionData={getOptionsPhone}
                form={form}
                name="phoneNumber"
                handlersLoadingCustomer={handlersLoadingCustomer}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                size="md"
                radius={0}
                withAsterisk
                {...form.getInputProps("fullName")}
                label="Tên khách hàng"
                type="text"
                placeholder="Tên khách hàng"
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                size="md"
                radius={0}
                {...form.getInputProps("address")}
                label="Địa chỉ"
                type="text"
                placeholder="Địa chỉ"
              />
            </Grid.Col>{" "}
          </Grid>
          <Group mt={30} justify="end">
            <Flex gap={20}>
              <Button
                size="md"
                radius={0}
                h={{ base: 42, md: 50, lg: 50 }}
                variant="outline"
                key="cancel"
                color="red"
                leftSection={<IconBan size={16} />}
                onClick={close}
              >
                Huỷ
              </Button>
              <Button
                size="md"
                radius={0}
                h={{ base: 42, md: 50, lg: 50 }}
                loading={loading}
                style={{ marginLeft: "12px" }}
                variant="filled"
                type="submit"
                leftSection={<IconChevronRight size={16} />}
              >
                Cập nhật
              </Button>
            </Flex>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
