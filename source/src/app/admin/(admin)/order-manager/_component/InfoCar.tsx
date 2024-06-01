import Typo from "@/app/components/elements/Typo";
import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Select,
  TextInput,
  Tooltip,
} from "@mantine/core";
import styles from "./index.module.scss";
import { getOptionsModels, getOptionsYearCar } from "@/utils/until";
import { AutocompleteLicensePlates } from "./AutoCompleteLicensePlates";
import { getOptionsCar } from "../until";
import { IconEdit } from "@tabler/icons-react";
export default function InfoCar({
  form,
  brandOptions,
  isUser,
  setModelOptions,
  modelOptions,
  yearCarOptions,
  setYearCarOptions,
  handleGetInfo,
  car,
  loading,
  openModalUpdate,
}: any) {
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
          <Tooltip label="Cập nhật xe" position="bottom" withArrow>
            <IconEdit
              className="no-print"
              onClick={openModalUpdate}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        )}
      </Group>
      <Box pos="relative">
        <LoadingOverlay
          zIndex={9}
          visible={loading}
          loaderProps={{ type: "bars" }}
        />
        <Grid gutter={12} className={styles.marketingInfo}>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 6 }}>
            <AutocompleteLicensePlates
              label="Biển số xe"
              placeholder="Biển số xe"
              name="numberPlates"
              form={form}
              getOptionData={getOptionsCar}
              handleGetInfo={handleGetInfo}
              disabled={isUser}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
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
          <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
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
          <Grid.Col span={{ base: 4, sm: 6, md: 6, lg: 6 }}>
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
      </Box>
    </div>
  );
}
