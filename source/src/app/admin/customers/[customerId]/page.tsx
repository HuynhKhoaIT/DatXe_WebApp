"use client";
import CustomersForm from "../create/CustomersForm";
import { useCustomerDetail } from "../../hooks/customer/useCustomer";
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
      />
    </div>
  );
}
