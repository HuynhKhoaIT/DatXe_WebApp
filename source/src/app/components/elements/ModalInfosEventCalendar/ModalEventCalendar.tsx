import React, { useEffect, useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Box,
  Grid,
  Textarea,
  Select,
  Radio,
  Modal,
  LoadingOverlay,
} from "@mantine/core";
import { useForm, hasLength } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import { useRef } from "react";
import { ActionIcon, rem } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { ModalOrderGuest } from "./ModalOrderGuest";
import { addCustomerCare } from "@/utils/customerCare";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { GenOTP } from "@/utils/user";
import styles from "./index.module.scss";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import InfoCarUser from "./_component/InfoCarUser";
import InfoCarNew from "./_component/InfoCarNew";
import { useAddOrder } from "@/app/dashboard/hooks/order/useAddOrder";

const DynamicModalAddCar = dynamic(
  () => import("@/app/gio-hang/_component/ModalAddCar"),
  {
    ssr: false,
  }
);

export const ModalEventCalendar = ({
  user,
  categoryOptions,
  eventInfos,
  onClose,
  fetchDataOrders,
}: any) => {
  const { addItem, brandOptions, isPendingAdd } = useAddOrder();

  const { data } = useSession();
  const token = data?.user?.token;
  const searchParams = useSearchParams();
  const garageId = searchParams.get("garageId");
  const garageName: any = searchParams.get("name");
  const [value, setValue] = useState<string | null>(null);

  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );

  const typeView = eventInfos?.view?.type;
  const newDate = new Date(eventInfos?.start);
  newDate.setHours(newDate.getHours() + 9);

  const router = useRouter();
  const [openedLogin, { open: openLogin, close: closeLogin }] = useDisclosure(
    false
  );

  const form = useForm<any>({
    initialValues: {
      customerRequest: "",
      fullName: user?.name || "",
      phoneNumber: user?.phone || "",
      numberPlates: "",
      priorityLevel: "2",
      dateTime: typeView === "dayGridMonth" ? newDate : eventInfos?.start,
    },

    validate: {
      fullName: (value) => (value.length < 1 ? "Vui lòng nhập tên" : null),
      phoneNumber: (value) =>
        value.length < 1 ? "Vui lòng nhập số điện thoại" : null,
      numberPlates: (value) =>
        !token && value.length < 1 ? "Vui lòng nhập biển số xe" : null,
      customerRequest: (value) =>
        value.length < 1 ? "Vui lòng nhập yêu cầu" : null,
    },
  });
  const handleSubmit = async (values: any) => {
    if (garageId) values.garageId = garageId;
    if (!token) {
      await GenOTP(values?.phoneNumber);
      openLogin();
    } else {
      addItem(values);
    }
  };
  const ref = useRef<HTMLInputElement>(null);
  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <Box pos="relative">
      <LoadingOverlay
        zIndex={9}
        visible={false}
        loaderProps={{ type: "bars" }}
      />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          size="lg"
          radius={0}
          placeholder="Yêu cầu khách hàng"
          withAsterisk={true}
          {...form.getInputProps("customerRequest")}
        />
        <Radio.Group withAsterisk {...form.getInputProps("priorityLevel")}>
          <Group mt="xs">
            <Radio value="1" label="Cao" />
            <Radio value="2" label="Trung bình" />
            <Radio value="3" label="Thấp" />
          </Group>
        </Radio.Group>

        <Grid gutter={10} mt="md">
          <Grid.Col span={6}>
            <TextInput
              size="lg"
              radius={0}
              placeholder="Họ và tên"
              withAsterisk
              {...form.getInputProps("fullName")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size="lg"
              radius={0}
              placeholder="Số điện thoại"
              withAsterisk
              {...form.getInputProps("phoneNumber")}
            />
          </Grid.Col>
        </Grid>
        {token ? (
          <InfoCarUser
            form={form}
            openModal={openModal}
            value={value}
            setValue={setValue}
          />
        ) : (
          <InfoCarNew form={form} brandOptions={brandOptions} styles={styles} />
        )}
        <Grid gutter={10} mt="md">
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <Select
              size="lg"
              radius={0}
              data={categoryOptions}
              placeholder="Danh mục đặt lịch"
              withAsterisk
              allowDeselect={false}
              leftSection={<IconPlus size={22} color="blue" />}
              {...form.getInputProps("orderCategoryId")}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }} className="input-date">
            <DateTimePicker
              size="lg"
              radius={0}
              valueFormat="DD/MM/YYYY hh:mm A"
              placeholder="Thời gian đặt lịch"
              leftSection={<IconPlus size={22} color="blue" />}
              rightSection={pickerControl}
              {...form.getInputProps("dateTime")}
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={10} mt="md">
          <Grid.Col span={12}>
            <TextInput
              size="lg"
              radius={0}
              readOnly
              placeholder="Chuyên gia"
              value={garageName}
              // {...form.getInputProps("garageId")}
            />
          </Grid.Col>
        </Grid>
        <Grid mt="md">
          <Grid.Col span={12}>
            <Textarea
              size="lg"
              radius={0}
              placeholder="Ghi chú cho CVDV"
              withAsterisk
              {...form.getInputProps("customerNote")}
            />
          </Grid.Col>
        </Grid>
        <Group
          grow
          preventGrowOverflow={false}
          wrap="nowrap"
          mt="md"
          className="footer-modal-schedule"
        >
          {/* <div>
            Đăng ký <a href="/">DatXe</a> để quản lý lịch sử xe, hoặc{" "}
            <a href="/">đăng nhập</a>
          </div> */}
          <Button
            size="lg"
            radius={0}
            loading={isPendingAdd}
            w={100}
            bg={"var(--theme-color)"}
            type="submit"
            key="submit"
          >
            Đặt lịch
          </Button>
        </Group>
      </form>
      <DynamicModalAddCar
        openModal={openedModal}
        close={closeModal}
        myAccount={user}
        formData={form}
        setValue={setValue}
      />
      <ModalOrderGuest
        close={closeLogin}
        opened={openedLogin}
        phone={form.values.phoneNumber}
        name={form.values.fullName}
        dataDetail={form.values}
        onClose={onClose}
        router={router}
        addItem={addItem}
      />
    </Box>
  );
};
