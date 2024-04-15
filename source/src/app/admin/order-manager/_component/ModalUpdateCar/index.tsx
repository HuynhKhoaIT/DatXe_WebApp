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
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { IconBan } from "@tabler/icons-react";
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
}: any) {
  console.log(dataDetail);
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      numberPlates: dataDetail?.numberPlates,
      phoneNumber: dataDetail?.customer?.phoneNumber,
      fullName: dataDetail?.customer?.fullName,
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
    console.log(values);
    //
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
                size="lg"
                radius={0}
                {...form.getInputProps("numberPlates")}
                label="Biển số xe"
                type="text"
                placeholder="Biển số xe"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                size="lg"
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
                size="lg"
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
                size="lg"
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
            <Grid.Col span={6}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("phoneNumber")}
                label="Số điện thoại"
                type="text"
                placeholder="Số điện thoại"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("fullName")}
                label="Họ và tên"
                type="text"
                placeholder="Họ và tên"
              />
            </Grid.Col>
          </Grid>
          <Group mt={30} justify="end">
            <Flex gap={20}>
              <Button
                size="lg"
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
                size="lg"
                radius={0}
                h={{ base: 42, md: 50, lg: 50 }}
                // loading={loadingButton}
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