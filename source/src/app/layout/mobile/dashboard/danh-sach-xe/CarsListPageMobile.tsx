import { Button } from "@mantine/core";
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
    <div className={styles.wrapper}>
      {carsData?.data?.map((item: any, index: number) => {
        return <ItemCarMobile data={item} key={index} />;
      })}
      <ButtonAddCar />
    </div>
  );
}
