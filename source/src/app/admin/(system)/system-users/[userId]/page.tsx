"use client";

import CustomersForm from "@/app/admin/(admin)/customers/create/CustomersForm";
import { useCustomerDetail } from "@/app/admin/(admin)/hooks/customer/useCustomer";
import { useUserDetail } from "../../hooks/users/useUsers";

export default function UpdateUser({ params }: { params: { userId: string } }) {
  const { data: user, isLoading, isFetching, isPending } = useUserDetail(
    params?.userId
  );

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <CustomersForm
        isEditing={true}
        dataDetail={user}
        isLoading={isLoading || isPending}
        isPreview={true}
      />
    </div>
  );
}
