import { Skeleton, Space } from "@mantine/core";
import CardProductSkeleton from "./CardProductSkeleton";
import styles from "./index.module.scss";
import Typo from "../../elements/Typo";
export default function ListProductSkeleton({ title, subTitle }: any) {
  return (
    <div>
      <div style={{ padding: "30px 0" }}>
        <Typo size="small" type="bold" style={{ color: "var(--title-color)" }}>
          {title}
        </Typo>
        <div style={{ fontSize: "14px" }}>{subTitle}</div>
        <Space h={10} />
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
