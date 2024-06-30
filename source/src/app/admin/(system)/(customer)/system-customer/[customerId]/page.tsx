import CustomersForm from "@/app/admin/(admin)/(customer)/(root)/customer/create/CustomersForm";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib/auth";

export default async function UpdateCustomer({
  params,
}: {
  params: { customerId: string };
}) {
  const customer = await callApi(apiConfig.admin.customer.getById, {
    pathParams: {
      id: params.customerId,
    },
  });

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <CustomersForm isEditing={true} dataDetail={customer} isPreview={true} />
    </div>
  );
}
