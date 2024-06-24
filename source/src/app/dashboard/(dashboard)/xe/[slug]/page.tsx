import { Box, Space } from "@mantine/core";
import styles from "../create/index.module.scss";
import CarForm from "../create/CarForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
import Typo from "@/app/components/elements/Typo";
export default async function CarSavePage({
  params,
}: {
  params: { slug: string };
}) {
  const car: any = await callApi(apiConfig.car.getById, {
    pathParams: {
      id: params?.slug,
    },
  });

  async function handleUpdate(formData: any) {
    "use server";
    await callApi(apiConfig.car.update, {
      pathParams: {
        id: formData.id,
      },
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
          Cập nhật
        </Typo>
      </div>
      <div className={styles.content}>
        <CarForm
          handleSave={handleUpdate}
          isEditing={true}
          dataDetail={car}
          brandOptions={dataOption}
        />
      </div>
    </Box>
  );
}
