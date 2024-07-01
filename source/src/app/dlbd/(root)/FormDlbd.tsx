"use client";

import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "./index.module.scss";
import DateField from "@/app/components/form/DateField";
import { TimeInput } from "@mantine/dates";
import { useRef, useState } from "react";
import { IconClock12 } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Logo from "@/assets/images/logo.png";
import ImageField from "@/app/components/form/ImageField";

export default function FormDlbd({
  create,
  searchParams,
  provinceOptions,
  getOptionsGarage,
}: any) {
  const router = useRouter();
  const [isLoadingSavePage, handlers] = useDisclosure(false);
  const [isDisabledGarage, handlersDisbaled] = useDisclosure(false);

  const [garageOptions, setGarageOptions] = useState<any>([]);
  const [province, setProvince] = useState<any>();
  const [garage, setGarage] = useState<any>();

  const ref = useRef<HTMLInputElement>(null);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      phone: searchParams?.phone ?? "",
      fullname: searchParams?.fullname ?? "",
      licensePlates: searchParams?.licensePlates ?? "",
      note: "",
      dateSchedule: undefined,
      time: undefined,
      garageId: undefined,
    },

    validate: {
      garageId: (value) => (!value ? "Không được để trống" : null),
      dateSchedule: (value) => (!value ? "Không được để trống" : null),
      time: (value) => (!value ? "Không được để trống" : null),
      fullname: (value) => (value.length < 1 ? "Không được để trống" : null),
      note: (value) => (value.length < 1 ? "Không được để trống" : null),
      licensePlates: (value) =>
        value.length < 1 ? "Không được để trống" : null,
      phone: (value) =>
        value
          ? /^0[1-9][0-9]{8}$/.test(value)
            ? null
            : "Số điện thoại không hợp lệ"
          : null,
    },
  });
  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock12 size={16} />
    </ActionIcon>
  );
  const handleSubmit = async (values: any) => {
    console.log(values);
    handlers.open();
    const res = await create(values);
    if (!res?.error) {
      console.log(res);
      form.reset();
      toast.success("Đặt lịch thành công");
      router.refresh();
    } else {
      toast.error("Đặt lịch thất bại");
    }
    handlers.close();
  };
  return (
    <Flex
      justify={"center"}
      align={"center"}
      direction={"column"}
      className={styles.formData}
    >
      <h3 className={styles.title}>Đặt lịch bảo dưỡng</h3>
      <Box maw={500} p={{ base: 10, md: 20 }} className={styles.content}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid gutter={12}>
            <Grid.Col span={12}>
              <TextInput
                size="md"
                withAsterisk
                classNames={{
                  input: styles.inputDlbd,
                }}
                label="Họ và tên chủ xe"
                placeholder="Nguyễn Văn a"
                {...form.getInputProps("fullname")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                size="md"
                classNames={{
                  input: styles.inputDlbd,
                }}
                withAsterisk
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                {...form.getInputProps("phone")}
              />
            </Grid.Col>
            {/* <Grid.Col span={12}>
              <TextInput
                size="md"
                withAsterisk
                label="Mục đích đặt hẹn"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />
            </Grid.Col> */}
            <Grid.Col span={12}>
              <TextInput
                size="md"
                classNames={{
                  input: styles.inputDlbd,
                }}
                withAsterisk
                label="Biển số xe"
                placeholder="59B12345"
                {...form.getInputProps("licensePlates")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                size="md"
                {...form.getInputProps("provinceId")}
                label="Tỉnh/Thành phố"
                placeholder="Chọn tỉnh"
                data={provinceOptions}
                classNames={{
                  input: styles.inputDlbd,
                }}
                withAsterisk
                value={province}
                searchable={true}
                onChange={async (value) => {
                  handlersDisbaled.open();
                  const optionsData = await getOptionsGarage(Number(value));
                  setProvince(value);
                  handlersDisbaled.close();
                  setGarage(null);
                  setGarageOptions(optionsData);
                }}
              ></Select>
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                size="md"
                disabled={isDisabledGarage || !province}
                {...form.getInputProps("garageId")}
                label="Chọn chuyên gia"
                classNames={{
                  input: styles.inputDlbd,
                }}
                placeholder="Chọn chuyên gia"
                data={garageOptions}
                withAsterisk
                value={garage}
                searchable={true}
                onChange={(value: any) => {
                  setGarage(value);
                  form.setFieldValue("garageId", value);
                }}
              ></Select>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
              <DateField
                size="md"
                classNames={{
                  input: styles.inputDlbd,
                }}
                label="Ngày đặt lịch"
                name="dateSchedule"
                withAsterisk={true}
                props={{ ...form.getInputProps("dateSchedule") }}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
              <TimeInput
                size="md"
                classNames={{
                  input: styles.inputDlbd,
                }}
                withSeconds
                {...form.getInputProps("time")}
                withAsterisk
                // defaultValue={new Date().toLocaleTimeString("en-US", {
                //   hour12: false,
                // })}
                label="Giờ đặt lịch"
                ref={ref}
                // onChange={(e) => handleTimeChange(e.target.value)}
                rightSection={pickerControl}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                size="md"
                classNames={{
                  input: styles.inputDlbd,
                }}
                {...form.getInputProps("note")}
                label="Ghi chú"
                minRows={2}
                withAsterisk
                autosize={true}
                placeholder="Ghi chú"
              />
            </Grid.Col>
          </Grid>

          <Group mt="xl">
            <Button
              fullWidth
              size="md"
              key="submit"
              type="submit"
              color="var(--primary-color)"
              loading={isLoadingSavePage}
            >
              Đặt lịch
            </Button>
          </Group>
        </form>
      </Box>
      <ImageField
        style={{ marginTop: "1rem" }}
        src={Logo.src}
        width={80}
        height={80}
        radius={80}
      />
      <p className={styles.poweredBy}>Powered by DATXE</p>
    </Flex>
  );
}
