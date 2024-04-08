import React from "react";
import { getSchedule } from "@/utils/order";
import CalendarScheduler from "../components/elements/calendar/Calendar";
import { mapArrayEventCalendar } from "../domain/EventCalendar";
import { getBrands } from "@/utils/branch";
import { getCategories } from "@/utils/category";
import { getCarsSsr } from "@/utils/car";
import { getMyAccount } from "@/utils/user";
import { apiUrl } from "@/constants";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function getDataInfoOrder() {
  const res = await fetch(`${apiUrl}api/orders/create`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function DatLich() {
  const orders = await getSchedule();
  const mappedOrdersData = mapArrayEventCalendar(orders);
  const carsData = await getCarsSsr();
  const session = await getServerSession(authOptions);
  let orderInfo = await getDataInfoOrder();

  const newBrands = orderInfo?.carBrands?.map((brand: any) => ({
    value: brand.id?.toString() || "",
    label: brand.title || "",
  }));
  const advisorOptions = orderInfo?.serviceadvisors?.map((advisor: any) => ({
    value: advisor.id?.toString(),
    label: advisor.fullName,
  }));
  return (
    <main className="main">
      <CalendarScheduler
        brandOptions={newBrands}
        // categoryOptions={categoryOptions}
        carsData={carsData}
        // carOptions={carOptions}
        // carDefault={carDefault}
        ordersData={mappedOrdersData}
        orderInfo={orderInfo}
        advisorOptions={advisorOptions}
      />
    </main>
  );
}
