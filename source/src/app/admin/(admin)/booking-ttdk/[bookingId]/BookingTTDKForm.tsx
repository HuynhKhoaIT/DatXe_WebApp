"use client";
import FooterSavePage from "@/app/admin/_component/FooterSavePage";
import {
  Box,
  Card,
  Grid,
  LoadingOverlay,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAddBookingTTDK } from "../../hooks/bookingTTDK/useAddBookingTTDK";
import { useEffect } from "react";
import DateField from "@/app/components/form/DateField";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { TimeInput } from "@mantine/dates";

export default function BookingForm({ dataDetail, isLoading, isEditing }: any) {
  const { data } = useSession();
  const { updateItem, isPendingUpdate } = useAddBookingTTDK({
    token: data?.user?.token,
  });

  const form = useForm({
    initialValues: {},
    validate: {},
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        form.setInitialValues(dataDetail);
        form.setValues(dataDetail);
        if (dataDetail?.dateSchedule)
          form.setFieldValue(
            "dateSchedule",
            dayjs(dataDetail?.dateSchedule).toDate()
          );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isEditing) {
      fetchData();
    }
  }, [dataDetail]);
  const handleSubmit = async (values: any) => {
    if (isEditing) {
      updateItem(values);
    }
  };
  return (
    <Box pos="relative">
      <LoadingOverlay
        zIndex={99}
        visible={isLoading}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Card withBorder shadow="sm">
          <Grid gutter={12}>
            <Grid.Col span={6}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("code")}
                label="Mã đơn hàng"
                type="text"
                placeholder="Mã đơn hàng"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("licensePlates")}
                label="Biển số xe"
                type="text"
                placeholder="Biển số xe"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("fullname")}
                label="Tên khách hàng"
                type="text"
                placeholder="Tên khách hàng"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("phone")}
                label="Số điện thoại"
                type="text"
                placeholder="Số điện thoại"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <DateField
                {...form.getInputProps("dateSchedule")}
                label="Ngày hẹn"
                placeholder="Ngày hẹn"
                clearable={true}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TimeInput
                size="lg"
                radioGroup="0"
                {...form.getInputProps("time")}
                label="Giờ hẹn"
                placeholder="Giờ hẹn"
              />
              {/* <DateField
                {...form.getInputProps("dateSchedule")}
                label="Giờ hẹn"
                placeholder="Giờ hẹn"
                clearable={true}
              /> */}
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                size="lg"
                radius={0}
                label="Ghi chú của khách hàng"
                minRows={2}
                autosize={true}
                {...form.getInputProps("note")}
                placeholder="Ghi chú của khách hàng"
              />
            </Grid.Col>
          </Grid>
        </Card>
        <FooterSavePage
          saveLoading={isPendingUpdate}
          okText={isEditing ? "Cập nhật" : "Thêm"}
        />
      </form>
    </Box>
  );
}
