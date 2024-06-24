import CarForm from "./CarForm";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function CreateCar() {
  async function handleCreate(formData: any) {
    "use server";
    await callApi(apiConfig.car.create, {
      data: formData,
    });
  }

  const brand = await callApi(apiConfig.car.getBrands, {});
  const dataOption = brand?.data.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  return (
    <Box maw={"100%"} mx="auto" className={styles.wrapper}>
      <div className={styles.headerTitle}>
        <Typo size="18px" type="bold" className={styles.title}>
          Thêm xe
        </Typo>
      </div>
      <div className={styles.content}>
        <CarForm handleSave={handleCreate} brandOptions={dataOption} />
      </div>
    </Box>
  );
}
