import Typo from "@/app/components/elements/Typo";
import { Button, Grid, Group, Select, TextInput } from "@mantine/core";
import styles from "./index.module.scss";
import { getOptionsModels, getOptionsYearCar } from "@/utils/until";
import { AutocompleteLicensePlates } from "./AutoCompleteLicensePlates";
import { getOptionsCar } from "../until";
import { IconUpload } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import dynamic from "next/dynamic";
export default function InfoCart({
  form,
  brandOptions,
  isUser,
  setModelOptions,
  modelOptions,
  yearCarOptions,
  setYearCarOptions,
  handleGetInfo,
  customer,
  openModalUpdate,
}: any) {
  console.log(form.values.numberPlates);
  return (
    <div className={styles.cardInfo}>
      <Group justify="space-between" className={styles.title}>
        <Typo
          size="primary"
          type="bold"
          style={{ color: "var(--primary-orange)" }}
        >
          Thông tin xe
        </Typo>
        {isUser && (
          <Button
            leftSection={<IconUpload size={16} />}
            onClick={openModalUpdate}
          >
            Cập nhật
          </Button>
        )}
      </Group>
      <Grid gutter={12} className={styles.marketingInfo}>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
          {/* <TextInput
            withAsterisk
            size="lg"
            radius={0}
            error="vui lòng nhập"
            {...form.getInputProps("numberPlates")}
            label="Biển số xe"
            type="text"
            placeholder="Biển số xe"
          /> */}
          <AutocompleteLicensePlates
            label="Biển số xe"
            placeholder="Biển số xe"
            name="numberPlates"
            form={form}
            getOptionData={getOptionsCar}
            handleGetInfo={handleGetInfo}
            disabled={isUser}
            // isCamera={true}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
          {isUser ? (
            <TextInput
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
        <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
          {isUser ? (
            <TextInput
              size="lg"
              radius={0}
              {...form.getInputProps("phoneNumber")}
              label="Số điện thoại"
              type="text"
              placeholder="Số điện thoại"
              disabled
            />
          ) : (
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
          )}
        </Grid.Col>
        <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
          {isUser ? (
            <TextInput
              size="lg"
              radius={0}
              {...form.getInputProps("fullName")}
              label="Họ và tên"
              type="text"
              placeholder="Họ và tên"
              disabled
            />
          ) : (
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
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
}
