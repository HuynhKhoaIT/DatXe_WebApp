"use client";

import CustomersForm from "@/app/admin/(admin)/customers/create/CustomersForm";
import { useCustomerDetail } from "@/app/admin/(admin)/hooks/customer/useCustomer";

export default function UpdateCustomer({
  params,
}: {
  params: { customerId: string };
}) {
  const {
    data: customer,
    isLoading,
    isFetching,
    isPending,
  } = useCustomerDetail(params?.customerId);

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <CustomersForm
        isEditing={true}
        dataDetail={customer}
        isLoading={isLoading || isPending}
        isPreview = {true}
      />
    </div>
  );
}
