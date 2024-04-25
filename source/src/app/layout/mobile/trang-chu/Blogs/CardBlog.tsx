import Link from "next/link";
import styles from "./CardBlog.module.scss";
export default function CardBlog({ data }: any) {
  return (
    <Link
      href={`/bai-viet/${data?.id}`}
      className={styles.wrapper}
      style={{ backgroundImage: `url(${data?.thumbnail})` }}
    >
      <div className={styles.info}>
        <div className={styles.title}>{data?.title}</div>
        {/* <div className={styles.view}>{data?.view} lượt xem</div> */}
      </div>
    </Link>
  );
}
