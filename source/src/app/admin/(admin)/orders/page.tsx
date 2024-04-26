import React from "react";
import CalendarScheduler from "@/app/components/elements/calendar/Calendar";
import { getOrdersOfGarage } from "@/utils/order";
import { mapArrayEventCalendar } from "@/app/domain/EventCalendar";
import { getBrands } from "@/utils/branch";
import { getCarsSsr } from "@/utils/car";
import { getMyAccount } from "@/utils/user";
import { getCategories } from "@/utils/category";
import SearchForm from "@/app/components/form/SearchForm";
import { Space } from "@mantine/core";
import { apiUrl } from "@/constants";
export const revalidate = 0;
import styles from "./index.module.scss";
import CalendarSchedulerGarage from "@/app/admin/(admin)/orders/CalendarGarage";
import { getOrders } from "@/app/libs/prisma/order";
import { useOrders } from "../hooks/order/useOrder";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
export default async function Orders() {
  const session: any = await getServerSession(authOptions);

  let garageId = (
    await getGarageIdByDLBDID(Number(session.user?.garageId))
  ).toString();

  const orders: any = await getOrders(garageId, {});

  const mappedOrdersData = mapArrayEventCalendar(orders?.data);

  // lấy danh sách category
  const categories = await getCategories();
  const categoryOptions = categories?.map((category) => ({
    value: category.id?.toString() || "",
    label: category.name || "",
  }));

  const carsData = await getCarsSsr();
  const carOptions = carsData?.map((car) => ({
    value: car.id?.toString() || "",
    label: car.licensePlates || "",
    otherData: {
      carId: car.id?.toString() || "",
      brandId: car?.brandCarName.id,
      brandName: car?.brandCarName?.name,
      modelId: car?.modelCarName?.id,
      modelName: car?.modelCarName?.name,
      yearCarName: car?.yearCarName,
    },
  }));

  const account: any = await getMyAccount();
  const carDefault = carOptions?.filter(
    (car) => car.value == account?.carIdDefault
  );

  const searchData = [
    {
      name: "startDate",
      placeholder: "Ngày bắt đầu",
      type: "input",
    },
    {
      name: "endDate",
      placeholder: "Ngày kết thúc",
      type: "input",
    },
  ];
  const initialValuesSearch = {
    startDate: "",
    endDate: null,
  };

  return (
    <div className={styles.wrapper}>
      <CalendarSchedulerGarage
        categoryOptions={categoryOptions}
        carsData={carsData}
        carOptions={carOptions}
        carDefault={carDefault}
        ordersData={mappedOrdersData}
      />
    </div>
  );
}
