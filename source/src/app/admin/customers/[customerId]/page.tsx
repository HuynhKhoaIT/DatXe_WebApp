"use client";
import React, { useEffect, useState } from "react";
import CustomersForm from "../create/CustomersForm";
import axios from "axios";
import { useCustomerDetail } from "../../hooks/customer/useCustomer";
export const revalidate = 60;
export default function UpdateCustomer({
  params,
}: {
  params: { customerId: string };
}) {
  const { data: customer, isLoading, isFetching } = useCustomerDetail(
    params?.customerId
  );

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <CustomersForm
        isEditing={true}
        dataDetail={customer}
        isLoading={isLoading}
      />
    </div>
  );
}
