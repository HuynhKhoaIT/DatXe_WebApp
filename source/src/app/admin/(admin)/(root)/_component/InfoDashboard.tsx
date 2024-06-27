"use client";
import Typo from "@/app/components/elements/Typo";
import CarService from "@/assets/images/carService2.jpeg";
import styles from "./index.module.scss";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@mantine/core";
export default function InfoDashboard({
  lastDayOfMonth,
  firstDayOfMonth,
  newArray,
}: any) {
  const searchParams = useSearchParams();

  const startDate: any = searchParams.get("dateStart");
  const endDate: any = searchParams.get("dateEnd");

  const formattedStartDate = dayjs(startDate || firstDayOfMonth).format(
    "DD/MM/YYYY"
  );
  const formattedEndDate = dayjs(endDate || lastDayOfMonth).format(
    "DD/MM/YYYY"
  );
  return (
    <div className={styles.wrapper_2}>
      <div style={{ borderBottom: "1px solid #eeeeee" }}>
        <Typo size="18px" type="bold" className={styles.title_2}>
          Thông tin xe ra vào {formattedStartDate} - {formattedEndDate}
        </Typo>
      </div>
      <div className={styles.card_2}>
        <div className={styles.imgCar}>
          <img src={CarService.src} />
        </div>
        <div className={styles.value}>
          <p>{newArray?.length}</p>
        </div>
      </div>
    </div>
  );
}

export function InfoDashboardSkeleton() {
  return <Skeleton h={600} radius={10} />;
}
