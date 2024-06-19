import Typo from "@/app/components/elements/Typo";
import styles from "./index.module.scss";
import { Skeleton } from "@mantine/core";
export default function LoadingPage() {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.content}>
        <div style={{ borderBottom: "1px solid #eeeeee" }}>
          <Typo size="18px" type="bold" className={styles.title}>
            Thông tin hồ sơ
          </Typo>
        </div>
        <div className={styles.table}>
          <Skeleton height={300} />
        </div>
      </div>
    </div>
  );
}
