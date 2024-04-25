import styles from "./index.module.scss";
import CardNewsSkeleton from "./CardNewsSkeleton";
export default function ListnewsSkeleton({ title, subTitle }: any) {
  return (
    <div className={styles.listItem}>
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
      <CardNewsSkeleton />
    </div>
  );
}
