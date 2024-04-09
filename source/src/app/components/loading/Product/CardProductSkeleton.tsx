import { Card, Skeleton, Space } from "@mantine/core";
import styles from "./index.module.scss";
export default function CardProductSkeleton() {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton h={160} />
      <Space h={10} />
      <div className={styles.infoCard}>
        <Skeleton h={15} w={80} radius={"lg"} />
        <Skeleton h={12} radius={"lg"} />
        <Skeleton h={12} radius={"lg"} />.
        <Skeleton h={12} radius={"lg"} />
      </div>
    </div>
  );
}
