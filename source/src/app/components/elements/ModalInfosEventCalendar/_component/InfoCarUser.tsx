import ComboboxField from "@/app/gio-hang/_component/ComboboxField";
import { Grid, Select, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

export default function InfoCarUser({
  form,
  openModal,
  value,
  setValue,
  carsData,
}: any) {
  useEffect(() => {
    if (!carsData) return;
    const carDefault = carsData?.data?.find((item: any) => item?.isDefault);
    if (carDefault) {
      setValue(carDefault?.numberPlates);
      form.setFieldValue("carBrandId", carDefault?.brandName?.id);
      form.setFieldValue("carNameId", carDefault?.modelName?.id);
      form.setFieldValue("carYearId", carDefault?.yearName?.id);
      form.setFieldValue("carBrandName", carDefault?.brandName?.title);
      form.setFieldValue("carModelName", carDefault?.modelName?.title);
      form.setFieldValue("carYear", carDefault?.yearName?.title);
      form.setFieldValue("numberPlates", carDefault?.numberPlates);
      form.setFieldValue("carId", carDefault?.id);
    }
  }, [carsData]);
  return (
    <>
      <Grid mt="md" justify="center">
        <Grid.Col span={6} className="input-plate">
          <ComboboxField
            form={form}
            placeholder="Biển số xe"
            carsData={carsData?.data}
            openModal={openModal}
            value={value}
            setValue={setValue}
          />
        </Grid.Col>
      </Grid>

      <Grid gutter={10} mt="md">
        <Grid.Col span={4}>
          <TextInput
            size="lg"
            radius={0}
            label="Hãng Xe"
            placeholder="Hãng Xe"
            readOnly
            value={form.values.carBrandName}
            // {...form.getInputProps("carBrandName")}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            size="lg"
            radius={0}
            label="Dòng xe"
            value={form.values.carModelName}
            placeholder="Dòng xe"
            readOnly
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            size="lg"
            radius={0}
            value={form.values.carYear}
            label="Năm sản xuất"
            placeholder="Năm sản xuất"
            readOnly
          />
        </Grid.Col>
      </Grid>
    </>
  );
}
