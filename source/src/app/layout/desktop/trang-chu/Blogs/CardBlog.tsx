import { Skeleton } from "@mantine/core";
import styles from "./CardBlog.module.scss";
import blog4 from "@/assets/images/blog4.png";
import Link from "next/link";

export default function CardBlog({ data, isLoading }: any) {
  if (!data) {
    data = {
      image: blog4.src,
      title: "Đáp ứng mọi nhu cầu của bạn",
      content:
        "Từ dịch vụ rửa xe, mâm & lốp, chăm sóc toàn diện, ắc quy, phụ tùng và cả việc bảo dưỡng định kỳ nữa. Ban có thể so sánh và tìm kiếm hệ thống Chuyên gia trên cả nước.",
    };
  }
  return (
    <Link
      href={`news/${data?.id}`}
      className={styles.wrapper}
      style={{
        backgroundImage: isLoading ? blog4.src : `url(${data?.thumbnail})`,
      }}
    >
      <div className={styles.info}>
        <div className={styles.title}>{data?.title}</div>
        {/* <div className={styles.view}>{data?.view} lượt xem</div> */}
      </div>
    </Link>
  );
}
