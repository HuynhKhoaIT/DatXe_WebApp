import { callApi } from "@/lib/auth";
import CustomersForm from "../create/CustomersForm";
import apiConfig from "@/constants/apiConfig";
export default async function UpdateCustomer({
  params,
}: {
  params: { customerId: string };
}) {
  const customer = await callApi(apiConfig.admin.customer.getById, {
    pathParams: { id: params.customerId },
  });

  async function handleUpdate(formData: FormData) {
    "use server";
    const res = await callApi(apiConfig.admin.customer.update, {
      pathParams: { id: params.customerId },
      data: formData,
    });
    return res;
  }

  const provinces = await callApi(apiConfig.nation.provinceList, {});
  const provinceOptions = provinces.data?.map((item: any) => ({
    value: item.id.toString(),
    label: item.name,
  }));
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <CustomersForm
        isEditing={true}
        dataDetail={customer}
        updateItem={handleUpdate}
        provinceOptions={provinceOptions}
      />
    </div>
  );
}
