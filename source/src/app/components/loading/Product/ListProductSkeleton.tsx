import { Skeleton } from "@mantine/core";
import CardProductSkeleton from "./CardProductSkeleton";
import styles from "./index.module.scss";
export default function ListProductSkeleton() {
  return (
    <div>
      <div style={{ padding: "30px 0" }}>
        <Skeleton height={40} radius={"lg"} />
      </div>
      <div className={styles.listItem}>
        <CardProductSkeleton />
        <CardProductSkeleton />
        <CardProductSkeleton />
        <CardProductSkeleton />
        <CardProductSkeleton />
        <CardProductSkeleton />
        <CardProductSkeleton />
        <CardProductSkeleton />
      </div>
    </div>
  );
}
