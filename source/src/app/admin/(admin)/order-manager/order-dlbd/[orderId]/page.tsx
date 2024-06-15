"use client";
import React from "react";
import OrderForm from "./OrderForm";
import {
  useOrderDLBDDetail,
  useOrderDetail,
} from "../../../hooks/order/useOrder";
import { useSession } from "next-auth/react";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ProductSavePage({
  params,
}: {
  params: { orderId: string };
}) {
  const { data } = useSession();
  const { data: orderDlbdDetail } = useOrderDLBDDetail({
    token: data?.user?.token,
    id: params?.orderId,
  });
  const { data: orderDetail, isLoading, isPending } = useOrderDetail(
    params?.orderId
  );
  return (
    <OrderForm
      isEditing={true}
      dataDetail={orderDetail}
      isLoading={isLoading || isPending}
    />
  );
}
