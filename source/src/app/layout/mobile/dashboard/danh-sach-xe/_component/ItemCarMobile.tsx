"use client";
import Link from "next/link";
import styles from "./index.module.scss";
import { useRouter } from "next/navigation";
export default function ItemCarMobile({ data }: any) {
  const router = useRouter();
  return (
    <div className={styles.boxCar}>
      <ul className={styles.listInfo}>
        <h4 className={styles.plates}>{data?.numberPlates}</h4>
        <li>Hãng xe: {data.brandName.title || "Không rõ"}</li>
        <li>Dòng xe: {data?.modelName?.title || "Không rõ"} </li>
        <li>NSX: {data?.yearName?.title || "Không rõ"}</li>
        <li>Mẫu xe: {data?.carStyle?.name || "Không rõ"}</li>
        <li>Màu sắc: {data?.color || "Không rõ"}</li>
        <li>Số khung: {data?.vinNumber || "Không rõ"}</li>
      </ul>
      <div
        onClick={() => {
          router.push(`/dashboard/danh-sach-xe/${data?.id}`);
        }}
        className={styles.previewDetail}
      >
        Xem chi tiết
      </div>
    </div>
  );
}
