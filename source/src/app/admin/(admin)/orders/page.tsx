import React from "react";
import { mapArrayEventCalendar } from "@/app/domain/EventCalendar";
export const revalidate = 0;
import styles from "./index.module.scss";
import CalendarSchedulerGarage from "@/app/admin/(admin)/orders/CalendarGarage";
import { getOrders } from "@/app/libs/prisma/order";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { callApi, getSession } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";
export default async function Orders() {
  const session: any = await getSession();
  let garageId = (
    await getGarageIdByDLBDID(Number(session.user?.garageId))
  ).toString();

  const orders: any = await getOrders(garageId, {
    limit: 100,
  });

  const mappedOrdersData = mapArrayEventCalendar(orders?.data);
  // lấy danh sách category
  const orderCategory = await callApi(apiConfig.category.orderCategory, {});

  const categoryOptions = orderCategory?.data?.map((category: any) => ({
    value: category.id?.toString(),
    label: category.title,
  }));

  const brand = await callApi(apiConfig.car.getBrands, {});
  const dataOption = brand?.data.map((item: any) => ({
    value: item.id.toString(),
    label: item.title,
  }));
  async function hanldeCreate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.order.create, {
        data: formData,
      });
      return res;
    } catch (error) {
      return null;
    }
  }

  return (
    <div className={styles.wrapper}>
      <CalendarSchedulerGarage
        categoryOptions={categoryOptions}
        ordersData={mappedOrdersData}
        brandOptions={dataOption}
        addItem={hanldeCreate}
      />
    </div>
  );
}
