import { Box, Space } from "@mantine/core";
import styles from "../create/index.module.scss";
import CarForm from "../create/CarForm";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
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
      <div className={styles.content}>
        <CarForm
          isEditing={true}
          brandOptions={dataOption}
          dataDetail={car}
          handleSave={handleUpdate}
        />
      </div>
    </Box>
  );
}
