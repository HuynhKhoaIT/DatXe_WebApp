import { Button } from "@mantine/core";
import styles from "./index.module.scss";
import Link from "next/link";
export default function ButtonAddCar() {
  return (
    <Link href={"/dashboard/xe/create"} className={styles.btnAddCar}>
      <div className={styles.content}>
        <span className={styles.label}>Thêm xe mới</span>
        <span className={styles.onlyCar}>(Chỉ dành cho ô tô)</span>
      </div>
    </Link>
  );
}
