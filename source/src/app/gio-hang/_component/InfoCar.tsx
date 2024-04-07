"use client";
import React, { useState } from "react";
import { Grid, TextInput, Card } from "@mantine/core";
import { LoadingOverlay } from "@mantine/core";
import styles from "../index.module.scss";
import dynamic from "next/dynamic";
import { useDisclosure } from "@mantine/hooks";
import ComboboxField from "./ComboboxField";
import { useCars } from "@/app/dashboard/hooks/car/useCar";
const DynamicModalAddCar = dynamic(() => import("../_component/ModalAddCar"), {
  ssr: false,
});

export default function InfoCar({ myAccount, form }: any) {
  const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(
    false
  );
  const [value, setValue] = useState<string | null>(null);

  const { cars, isLoading, isFetching } = useCars();
  return (
    <Grid.Col span={{ base: 12, md: 12, lg: 6, xl: 6 }}>
      <div className="checkout-widget">
        <div className={styles.titleCard}>
          <h4 className={styles.title}>Thông tin Xe</h4>
        </div>
        <Card pos="relative">
          <LoadingOverlay
            visible={isLoading || isFetching}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />

          <Grid gutter={16}>
            <Grid.Col span={12}>
              <ComboboxField
                form={form}
                label="Biển số"
                carsData={cars?.data}
                openModal={openModal}
                value={value}
                setValue={setValue}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="lg"
                radius={0}
                label="Hãng Xe"
                placeholder="Hãng Xe"
                readOnly
                {...form.getInputProps("carBrandName")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("carModelName")}
                label="Dòng xe"
                placeholder="Dòng xe"
                readOnly
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4, lg: 4, xl: 4 }}>
              <TextInput
                size="lg"
                radius={0}
                {...form.getInputProps("carYear")}
                label="Năm sản xuất"
                placeholder="Năm sản xuất"
                readOnly
              />
            </Grid.Col>
          </Grid>
        </Card>
      </div>
      <DynamicModalAddCar
        openModal={openedModal}
        close={closeModal}
        myAccount={myAccount}
        formData={form}
        setValue={setValue}
      />
    </Grid.Col>
  );
}
