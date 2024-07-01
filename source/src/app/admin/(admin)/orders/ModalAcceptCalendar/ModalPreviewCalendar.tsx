"use client";
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
  LoadingOverlay,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import styles from "./index.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { stepOrderOptions } from "@/constants/masterData";
import { getOptionsModels, getOptionsYearCar } from "@/utils/until";
import { ORDER_DONE, QUERY_KEY, ROLE_EXPERT } from "@/constants";
import { useSession } from "next-auth/react";
import { useUpdateOrder } from "../../hooks/order/useUpdateOrder";
require("dayjs/locale/vi");

export const ModalPreviewCalendar = ({
  detail,
  onClose,
  categoryOptions,
}: any) => {
  const { updateItem, brandOptions, isPendingUpdate } = useUpdateOrder();

  const { data }: any = useSession();
  const role = data?.user?.role;
  // const { data: brandOptions, isLoading: isLoadingBrand } = useFetch({
  //   queryKey: [QUERY_KEY.optionsBrandCar],
  //   queryFn: () => getOptionsBrands(),
  //   options: {
  //     refetchOnWindowFocus: false,
  //     staleTime: Infinity,
  //     refetchInterval: false,
  //   },
  // });

  const [loading, handlers] = useDisclosure();
  const form = useForm<any>({
    initialValues: {},
    validate: {},
  });
  useEffect(() => {
    const fetchData = async () => {
      handlers.open();
      const [models, yearCars] = await Promise.all([
        getOptionsModels(detail?.car?.carBrandId),
        getOptionsYearCar(detail?.car?.carNameId),
      ]);
      setModelOptions(models);
      setYearCarOptions(yearCars);
      form.setInitialValues(detail);
      form.setValues(detail);
      form.setFieldValue("dateTime", dayjs(detail?.dateTime).toDate());
      form.setFieldValue("fullName", detail?.customer?.fullName);
      form.setFieldValue("phoneNumber", detail?.customer?.phoneNumber);
      form.setFieldValue("numberPlates", detail?.car?.numberPlates);
      form.setFieldValue("carBrandId", detail?.car?.carBrandId?.toString());
      form.setFieldValue("carNameId", detail?.car?.carNameId?.toString());
      form.setFieldValue("carYearId", detail?.car?.carYearId?.toString());
      form.setFieldValue(
        "orderCategoryId",
        detail?.orderCategoryId?.toString()
      );
      form.setFieldValue("step", detail?.step.toString());
      form.setFieldValue("priorityLevel", detail?.priorityLevel?.toString());
      form.setFieldValue(
        "serviceAdvisorId",
        detail?.serviceAdvisor?.id?.toString()
      );

      handlers.close();
    };
    if (detail) fetchData();
  }, [detail]);
  const handleSubmit = async (values: any) => {
    updateItem(values);
  };

  const [modelOptions, setModelOptions] = useState<any>([]);
  const [yearCarOptions, setYearCarOptions] = useState<any>([]);
  const [advisorOptions, setAdvisorOptions] = useState<any>([]);
  const [garageOptions, setGarageOptions] = useState<any>([]);

  return (
    <Box w={"100%"} pos={"relative"}>
      <LoadingOverlay
        zIndex={9}
        visible={loading}
        loaderProps={{ type: "bars" }}
      />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          size="lg"
          radius={0}
          label="Yêu cầu khách hàng"
          placeholder="Yêu cầu khách hàng"
          withAsterisk={true}
          {...form.getInputProps("customerRequest")}
        />
        <Radio.Group
          label="Mức độ yêu cầu"
          withAsterisk
          {...form.getInputProps("priorityLevel")}
        >
          <Group mt="xs">
            <Radio value={"1"} label="Thấp" />
            <Radio value={"2"} label="Trung bình" />
            <Radio value={"3"} label="Cao" />
          </Group>
        </Radio.Group>

        <Grid gutter={10} mt="md">
          <Grid.Col span={6}>
            <TextInput
              size="lg"
              radius={0}
              label="Họ và tên"
              placeholder="Họ và tên"
              disabled
              withAsterisk
              {...form.getInputProps("fullName")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              size="lg"
              radius={0}
              label="Số điện thoại"
              placeholder="Số điện thoại"
              disabled
              withAsterisk
              {...form.getInputProps("phoneNumber")}
            />
          </Grid.Col>
        </Grid>
        <Grid mt="md" justify="center">
          <Grid.Col span={6} className="input-plate">
            <TextInput
              label="Biển số xe"
              withAsterisk
              classNames={{
                root: styles.rootPlates,
                input: styles.inputPlates,
              }}
              placeholder="Nhập biển số xe"
              size="lg"
              disabled
              radius={0}
              {...form.getInputProps("numberPlates")}
            ></TextInput>
          </Grid.Col>
        </Grid>

        <Grid gutter={10} mt="md">
          <Grid.Col span={4}>
            <Select
              size="lg"
              radius={0}
              label="Hãng xe"
              {...form.getInputProps("carBrandId")}
              name="carBrandId"
              data={brandOptions}
              placeholder="Hãng xe"
              allowDeselect={false}
              leftSection={<IconPlus size={22} color="blue" />}
              onChange={async (value) => {
                const optionsData = await getOptionsModels(Number(value));
                setModelOptions(optionsData);
                form.setFieldValue("carBrandId", value);
                form.setFieldValue("carNameId", null);
                form.setFieldValue("carYearId", null);
              }}
              disabled={true}
              withAsterisk
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              size="lg"
              radius={0}
              label="Dòng xe"
              data={modelOptions}
              placeholder="Dòng xe"
              leftSection={<IconPlus size={22} color="blue" />}
              withAsterisk
              disabled={true}
              allowDeselect={false}
              {...form.getInputProps("carNameId")}
              onChange={(value: any) => {
                form.setFieldValue("carNameId", value);
                form.setFieldValue("carYearId", null);
              }}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              size="lg"
              radius={0}
              label="Năm sản xuất"
              data={yearCarOptions}
              placeholder="Năm sản xuất"
              disabled
              leftSection={<IconPlus size={22} color="blue" />}
              withAsterisk
              allowDeselect={false}
              {...form.getInputProps("carYearId")}
            />
          </Grid.Col>
        </Grid>
        <Grid gutter={10} mt="md">
          <Grid.Col span={6}>
            <Select
              size="lg"
              radius={0}
              label="Danh mục đặt lịch"
              data={categoryOptions}
              placeholder="Danh mục đặt lịch"
              withAsterisk
              allowDeselect={false}
              leftSection={<IconPlus size={22} color="blue" />}
              {...form.getInputProps("orderCategoryId")}
            />
          </Grid.Col>
          <Grid.Col span={6} className="input-date">
            <DateTimePicker
              size="lg"
              radius={0}
              label="Thời gian đặt lịch"
              valueFormat="DD/MM/YYYY hh:mm A"
              placeholder="Thời gian đặt lịch"
              leftSection={<IconPlus size={22} color="blue" />}
              {...form.getInputProps("dateTime")}
            />
          </Grid.Col>
          {/* <Grid.Col span={6}>
            <Select
              size="lg"
              radius={0}
              label="Cố vận dịch vụ"
              allowDeselect={false}
              data={advisorOptions}
              placeholder="Chọn CVDV"
              leftSection={<IconPlus size={22} color="blue" />}
              withAsterisk
              {...form.getInputProps("serviceAdvisorId")}
            />
          </Grid.Col> */}
          {role !== ROLE_EXPERT && (
            <Grid.Col span={6}>
              <Select
                size="lg"
                radius={0}
                label="Chuyên gia"
                allowDeselect={false}
                data={garageOptions}
                placeholder="Chọn chuyên gia"
                withAsterisk
                {...form.getInputProps("garageId")}
              />
            </Grid.Col>
          )}
        </Grid>

        {/* <Grid mt="md">
          <Grid.Col span={12}>
            <Textarea
              size="lg"
              radius={0}
              label="Ghi chú cho CVDV"
              placeholder="Ghi chú cho CVDV"
              withAsterisk
              {...form.getInputProps("customerNote")}
            />
          </Grid.Col>
        </Grid> */}
        <Grid mt="md">
          <Grid.Col span={12}>
            <Select
              size="lg"
              radius={0}
              label="Tình trạng"
              {...form.getInputProps("step")}
              placeholder="Tình trạng"
              data={stepOrderOptions}
            />
          </Grid.Col>
        </Grid>
        {detail?.step !== Number(ORDER_DONE) && (
          <Group
            grow
            preventGrowOverflow={false}
            wrap="nowrap"
            mt="md"
            className="footer-modal-schedule"
          >
            <Button
              size="lg"
              radius={0}
              h={{ base: 42, md: 50, lg: 50 }}
              w={100}
              variant="outline"
              color="red"
              onClick={() => onClose()}
            >
              Huỷ
            </Button>
            <Button
              size="lg"
              radius={0}
              h={{ base: 42, md: 50, lg: 50 }}
              loading={isPendingUpdate}
              w={100}
              bg={"var(--theme-color)"}
              type="submit"
              key="submit"
            >
              Cập nhật
            </Button>
          </Group>
        )}
      </form>
    </Box>
  );
};
