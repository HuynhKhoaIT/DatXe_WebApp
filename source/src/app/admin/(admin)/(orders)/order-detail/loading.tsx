import { Fragment } from "react";
import styles from "./index.module.scss";
import { Skeleton } from "@mantine/core";
import CardFormSekeleton from "@/app/components/loading/CardForm";
export default function Loading() {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.infoCustomer}>
        <CardFormSekeleton title={"Thông tin xe"} height={278} />
        <CardFormSekeleton title={"Thông tin khách hàng"} height={278} />
      </div>
      <CardFormSekeleton title={"Thông tin liên hệ"} />
      <CardFormSekeleton title={"Hàng hoá & Dịch vụ"} height={200} />
      <CardFormSekeleton title={"Thông tin đơn hàng"} height={300} />
    </div>
  );
}
