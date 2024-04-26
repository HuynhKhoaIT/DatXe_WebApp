import React, { useState } from "react";
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
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import { IconPlus } from "@tabler/icons-react";
import { useRef } from "react";
import { ActionIcon, rem } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";
import styles from "./index.module.scss";
import { AutocompletePhone } from "../../../order-manager/_component/AutoCompletePhone";
import { getOptionsCar, getOptionsPhone } from "../../../order-manager/until";
import { AutocompleteLicensePlates } from "../../../order-manager/_component/AutoCompleteLicensePlates";
import { getOptionsModels, getOptionsYearCar } from "@/utils/until";
import { useMyGarage } from "@/app/hooks/useMyGarage";

export const ModalEventCalendar = ({
  categoryOptions,
  brandOptions,
  form,
  isUser,
  isPendingAdd,
  handleGetInfo,
  setModelOptions,
  modelOptions,
  setYearCarOptions,
  yearCarOptions,
  handlersLoadingCustomer,
  loadingCustomer,
  loading,
}: any) => {
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
    <Box pos={"relative"}>
      <LoadingOverlay loaderProps={{ type: "bars" }} visible={loading} />
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
      <Grid mt="md" justify="center">
        <Grid.Col span={6} className="input-plate">
          <AutocompleteLicensePlates
            placeholder="Biển số xe"
            name="numberPlates"
            form={form}
            getOptionData={getOptionsCar}
            handleGetInfo={handleGetInfo}
          />
        </Grid.Col>
      </Grid>

      <Grid gutter={10} mt="md">
        <Grid.Col span={4}>
          {isUser ? (
            <TextInput
              classNames={{ input: styles.input }}
              size="lg"
              radius={0}
              {...form.getInputProps("carBrand")}
              label="Hãng xe"
              type="text"
              placeholder="Hãng xe"
              disabled
            />
          ) : (
            <Select
              size="lg"
              radius={0}
              classNames={{ input: styles.input }}
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
          )}
        </Grid.Col>
        <Grid.Col span={4}>
          {isUser ? (
            <TextInput
              classNames={{ input: styles.input }}
              size="lg"
              radius={0}
              {...form.getInputProps("carName")}
              label="Dòng xe"
              type="text"
              placeholder="Dòng xe"
              disabled
            />
          ) : (
            <Select
              size="lg"
              radius={0}
              classNames={{ input: styles.input }}
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
          )}
        </Grid.Col>
        <Grid.Col span={4}>
          {isUser ? (
            <TextInput
              size="lg"
              classNames={{ input: styles.input }}
              radius={0}
              {...form.getInputProps("carYear")}
              label="Năm sản xuất"
              type="text"
              placeholder="Năm sản xuất"
              disabled
            />
          ) : (
            <Select
              size="lg"
              radius={0}
              classNames={{ input: styles.input }}
              {...form.getInputProps("carYearId")}
              label="Năm SX"
              data={yearCarOptions}
              type="text"
              placeholder="Năm sản xuất"
              onChange={(value) => {
                form.setFieldValue("carYearId", value);
              }}
            />
          )}
        </Grid.Col>
      </Grid>
      <Grid gutter={10} mt="md">
        <Grid.Col span={6}>
          <AutocompletePhone
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
            size="lg"
            classNames={{ input: styles.input }}
            radius={0}
            {...form.getInputProps("fullName")}
            label="Tên khách hàng"
            type="text"
            placeholder="Tên khách hàng"
          />
        </Grid.Col>
      </Grid>

      <Grid gutter={10} mt="md">
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
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
        <Grid.Col
          span={{ base: 12, sm: 6, md: 6, lg: 6 }}
          className="input-date"
        >
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
      <Grid mt="md">
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Textarea
            size="lg"
            classNames={{ input: styles.input }}
            radius={0}
            {...form.getInputProps("note")}
            label="Ghi chú của khách hàng"
            minRows={2}
            autosize={true}
            placeholder="Ghi chú của khách hàng"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          <Textarea
            size="lg"
            classNames={{ input: styles.input }}
            radius={0}
            {...form.getInputProps("notePrivate")}
            label="Ghi chú nội bộ"
            minRows={2}
            autosize={true}
            placeholder="Ghi chú nội bộ"
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
    </Box>
  );
};
