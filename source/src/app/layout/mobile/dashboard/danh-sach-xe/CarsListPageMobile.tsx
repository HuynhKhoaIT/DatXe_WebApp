import { Box, Button, LoadingOverlay } from "@mantine/core";
import ItemCarMobile from "./_component/ItemCarMobile";
import styles from "./index.module.scss";
import ButtonAddCar from "./_component/ButtonAddCar";
export default function CarsListPageMobile({
  carsData,
  page,
  setPage,
  deleteItem,
  loading,
}: any) {
  return (
    <Box pos={"relative"} className={styles.wrapper}>
      <LoadingOverlay visible={loading} zIndex={9} />
      {carsData?.data
        ?.filter((item: any) => item.isDefault)
        ?.map((item: any, index: number) => {
          return (
            <ItemCarMobile deleteItem={deleteItem} data={item} key={index} />
          );
        })}
      {carsData?.data
        ?.filter((item: any) => !item.isDefault)
        ?.map((item: any, index: number) => {
          return (
            <ItemCarMobile data={item} deleteItem={deleteItem} key={index} />
          );
        })}
      <ButtonAddCar />
    </Box>
  );
}
