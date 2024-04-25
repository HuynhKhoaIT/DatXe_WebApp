import { Skeleton, Space } from "@mantine/core";
import CardProductSkeleton from "./CardProductSkeleton";
import styles from "./index.module.scss";
import Typo from "../../elements/Typo";
export default function ListSearchProductSkeleton({ title }: any) {
  return (
    <div>
      <Typo
        size="primary"
        type="bold"
        style={{ color: "var(--theme-color)", marginBottom: "1rem" }}
      >
        {title}
      </Typo>
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
    </div>
  );
}
