import React from "react";
import { getSchedule } from "@/utils/order";
import CalendarScheduler from "../components/elements/calendar/Calendar";
import { mapArrayEventCalendar } from "../domain/EventCalendar";
import { apiUrl } from "@/constants";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

async function getDataInfoOrder() {
  const res = await fetch(`${apiUrl}api/orders/create`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function DatLich({ searchParams }: any) {
  const orders = await getSchedule();
  const mappedOrdersData = mapArrayEventCalendar(orders);
  let orderInfo = await getDataInfoOrder();
  const advisorOptions = orderInfo?.serviceadvisors?.map((advisor: any) => ({
    value: advisor.id?.toString(),
    label: advisor.fullName,
  }));

  const orderCategory = await callApi(apiConfig.category.orderCategory, {
    // params: {
    //   garageId: searchParams?.garageId,
    // },
  });

  const categoryOptions = orderCategory?.data?.map((category: any) => ({
    value: category.id?.toString(),
    label: category.title,
  }));

  const carsData = await callApi(apiConfig.car.getList, {});

  return (
    <main className="main">
      <CalendarScheduler
        categoryOptions={categoryOptions}
        ordersData={[]}
        orderInfo={orderInfo}
        advisorOptions={advisorOptions}
        carsData={carsData}
      />
    </main>
  );
}
