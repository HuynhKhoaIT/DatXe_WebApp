import { Skeleton, Space } from "@mantine/core";
import CardProductSkeleton from "./CardProductSkeleton";
import styles from "./index.module.scss";
export default function ListSearchProductSkeleton() {
  return (
    <div className={styles.listItem}>
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
      <CardProductSkeleton />
    </div>
  );
}
