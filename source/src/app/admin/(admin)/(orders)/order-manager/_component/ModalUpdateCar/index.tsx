"use client";
import { getOptionsModels, getOptionsYearCar } from "@/utils/until";
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

export default function ModalUpdateCar({
  openModal,
  close,
  brandOptions,
  yearCarOptions,
  modelOptions,
  setModelOptions,
  setYearCarOptions,
  dataDetail,
  formOrder,
}: any) {
  const [loading, handlers] = useDisclosure();

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      carId: dataDetail?.id,
      numberPlates: dataDetail?.numberPlates,
      carBrandId: dataDetail?.brandName?.id,
      carNameId: dataDetail?.modelName?.id,
      carYearId: dataDetail?.yearName?.id,
    },
    validate: {
      // phoneNumber: (value) =>
      //   /^0[1-9][0-9]{8}$/.test(value) ? null : "Số điện thoại sai định dạng",
      numberPlates: (value) => (value?.length > 0 ? null : "Vui lòng nhập..."),
    },
  });
  const router = useRouter();
  const isMobile = useMediaQuery(`(max-width: ${"600px"})`);

  const handleSubmit = async (values: any) => {
    handlers.open();
    try {
      const res: any = await axios.put(
        `/api/admin/car/${values?.carId}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      formOrder.setFieldValue("numberPlates", values.numberPlates);
      if (res?.data?.brandName?.title)
        formOrder.setFieldValue("carBrand", res?.data?.brandName?.title);
      if (res?.data?.modelName?.title)
        formOrder.setFieldValue("carName", res?.data?.modelName?.title);
      if (res?.data?.yearName?.title)
        formOrder.setFieldValue("carYear", res?.data?.yearName?.title);
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
      title="Cập nhật xe"
    >
      <Box w={"100%"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid gutter={16}>
            <Grid.Col span={6}>
              <TextInput
                size="md"
                radius={0}
                {...form.getInputProps("numberPlates")}
                label="Biển số xe"
                type="text"
                placeholder="Biển số xe"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                size="md"
                radius={0}
                {...form.getInputProps("carBrandId")}
                label="Hãng xe"
                type="text"
                data={brandOptions}
                placeholder="Hãng xe"
                onChange={async (value) => {
                  const optionsData = await getOptionsModels(Number(value));
                  setModelOptions(optionsData);
                  form.setFieldValue("carBrandId", value);
                  form.setFieldValue("carNameId", null);
                  form.setFieldValue("carYearId", null);
                }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                size="md"
                radius={0}
                {...form.getInputProps("carNameId")}
                label="Dòng xe"
                type="text"
                data={modelOptions}
                placeholder="Dòng xe"
                onChange={async (value) => {
                  const optionsData = await getOptionsYearCar(Number(value));
                  setYearCarOptions(optionsData);
                  form.setFieldValue("carNameId", value);
                  form.setFieldValue("carYearId", null);
                }}
              />
            </Grid.Col>{" "}
            <Grid.Col span={6}>
              <Select
                size="md"
                radius={0}
                {...form.getInputProps("carYearId")}
                label="Năm SX"
                data={yearCarOptions}
                type="text"
                placeholder="Năm sản xuất"
                onChange={(value) => {
                  form.setFieldValue("carYearId", value);
                }}
              />
            </Grid.Col>
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
