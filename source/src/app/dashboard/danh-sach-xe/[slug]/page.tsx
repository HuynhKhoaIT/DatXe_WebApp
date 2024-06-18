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

  return (
    <Box maw={"100%"} mx="auto" className={styles.wrapper}>
      <div className={styles.content}>
        <CarForm isEditing={true} dataDetail={car} handleSave={handleUpdate} />
      </div>
    </Box>
  );
}
