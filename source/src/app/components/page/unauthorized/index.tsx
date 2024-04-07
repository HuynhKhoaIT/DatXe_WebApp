import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { Button } from "@mantine/core";
const PageUnauthorized = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text_403}>403</div>
      <div className={styles.subText}>
        Bạn không được phép truy cập trang này
      </div>
      <Link href={`/`} className={styles.btnHome}>
        <Button>Trang chủ</Button>
      </Link>
    </div>
  );
};

export default PageUnauthorized;
