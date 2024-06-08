"use client";
import styles from "./index.module.scss";
import ItemOrderMobile from "./_component/ItemOrderMobile";
export default function OrdersListPageMobile({ dataSource }: any) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.listOrder}>
        {dataSource?.data?.map((item: any, index: number) => {
          return <ItemOrderMobile data={item} key={index} />;
        })}
      </div>
    </div>
  );
}
