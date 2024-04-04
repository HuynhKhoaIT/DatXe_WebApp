"use client";
import React from "react";
import OrderForm from "./OrderForm";
import { useOrderDetail } from "../../hooks/order/useOrder";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ProductSavePage({
  params,
}: {
  params: { orderId: string };
}) {
  const { data: orderDetail, isLoading } = useOrderDetail(params?.orderId);
  return (
    <OrderForm
      isEditing={true}
      dataDetail={orderDetail}
      isLoading={isLoading}
    />
  );
}
