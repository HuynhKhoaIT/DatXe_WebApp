import { Box, Space } from "@mantine/core";
import styles from "../create/index.module.scss";
import CarForm from "../create/CarForm";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
export default function CarSavePage({ params }: { params: { slug: string } }) {
  const car = callApi(apiConfig.car.getById, {
    pathParams: {
      id: params?.slug,
    },
  });
  return (
    <Box maw={"100%"} mx="auto" className={styles.wrapper}>
      <div className={styles.content}>
        <CarForm isEditing={true} dataDetail={car} />
      </div>
    </Box>
  );
}
