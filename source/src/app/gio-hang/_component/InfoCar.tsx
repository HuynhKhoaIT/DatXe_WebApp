"use client";
import { Grid, TextInput, Card } from "@mantine/core";
import styles from "../index.module.scss";
import ComboboxField from "./ComboboxField";

export default function InfoCar({
  form,
  cars,
  openModal,
  value,
  setValue,
}: any) {
  return (
    <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
      <div className="checkout-widget">
        <div className={styles.titleCard}>
          <h4 className={styles.title}>Thông tin Xe</h4>
        </div>
        <Card pos="relative">
          <Grid gutter={16}>
            <Grid.Col span={12}>
              <ComboboxField
                form={form}
                label="Biển số"
                carsData={cars}
                openModal={openModal}
                value={value}
                setValue={setValue}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="md"
                radius={0}
                label="Hãng Xe"
                placeholder="Hãng Xe"
                readOnly
                value={form.values.carBrandName}
                // {...form.getInputProps("carBrandName")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="md"
                radius={0}
                label="Dòng xe"
                value={form.values.carModelName}
                placeholder="Dòng xe"
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="md"
                radius={0}
                value={form.values.carYear}
                label="Năm sản xuất"
                placeholder="Năm sản xuất"
                readOnly
              />
            </Grid.Col>
          </Grid>
        </Card>
      </div>
    </Grid.Col>
  );
}
