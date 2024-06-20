import { Box, Button, LoadingOverlay } from "@mantine/core";
import ItemCarMobile from "./_component/ItemCarMobile";
import styles from "./index.module.scss";
import ButtonAddCar from "./_component/ButtonAddCar";
export default function CarsListPageMobile({
  carsData,
  handleDeleteCar,
  handleSetDefault,
}: any) {
  return (
    <Box pos={"relative"} className={styles.wrapper}>
      {carsData?.data
        ?.filter((item: any) => item.isDefault)
        ?.map((item: any, index: number) => {
          return (
            <ItemCarMobile
              deleteItem={handleDeleteCar}
              data={item}
              key={index}
              handleSetDefault={handleSetDefault}
            />
          );
        })}
      {carsData?.data
        ?.filter((item: any) => !item.isDefault)
        ?.map((item: any, index: number) => {
          return (
            <ItemCarMobile
              data={item}
              deleteItem={handleDeleteCar}
              key={index}
              handleSetDefault={handleSetDefault}
            />
          );
        })}
      <ButtonAddCar />
    </Box>
  );
}
