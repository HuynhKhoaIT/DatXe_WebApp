"use client";
import Chart from "@/app/admin/_component/chart";
import { Skeleton } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChartDashboard({ newArray }: any) {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const searchParams = useSearchParams();
  const [arrayDate, setArrayDate] = useState<any>([]);

  const startDate: any = searchParams.get("dateStart");
  const endDate: any = searchParams.get("dateEnd");
  const getArrayDate = (startDate: any, endDate: any) => {
    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);
    const differenceInTime = dateEnd?.getTime() - dateStart?.getTime();
    // Chuyển đổi sự khác biệt thành số ngày
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    const newDatesArray = Array.from(
      { length: differenceInDays + 1 },
      (_, i) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        return currentDate.toISOString().slice(0, 10);
      }
    );
    return newDatesArray;
  };

  useEffect(() => {
    if (startDate && endDate) {
      setArrayDate(getArrayDate(startDate, endDate));
    } else {
      setArrayDate(getArrayDate(firstDayOfMonth, lastDayOfMonth));
    }
  }, [searchParams, newArray]);
  return (
    <Chart
      data={newArray}
      arrayDate={arrayDate}
      firstDayOfMonth={firstDayOfMonth}
      lastDayOfMonth={lastDayOfMonth}
    />
  );
}

export function ChartDashboardSkeleton() {
  return <Skeleton h={600} radius={10} />;
}
