"use client";
import styles from "./index.module.scss";
import ItemOrderMobile from "./_component/ItemOrderMobile";
import FilterOrders from "./_component/FilterOrder";
import Nodata from "@/assets/images/nodata.png";
export default function OrdersListPageMobile({ dataSource }: any) {
  console.log(dataSource);
  return (
    <div className={styles.wrapper}>
      <FilterOrders />
      {dataSource?.data?.length > 0 ? (
        <div className={styles.listOrder}>
          {dataSource?.data?.map((item: any, index: number) => {
            return <ItemOrderMobile data={item} key={index} />;
          })}
        </div>
      ) : (
        <div className={styles.nodata}>
          <img src={Nodata.src} />
          <p>Chưa có đơn hàng</p>
        </div>
      )}
    </div>
  );
}
