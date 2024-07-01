import CustomersForm from "@/app/admin/(admin)/(customer)/(root)/customer/create/CustomersForm";
import { callApi } from "@/lib/auth";
import apiConfig from "@/constants/apiConfig";

export default async function UpdateUser({
  params,
}: {
  params: { userId: string };
}) {
  const user = await callApi(apiConfig.admin.user.getById, {
    pathParams: { id: params.userId },
  });
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <CustomersForm isEditing={true} dataDetail={user} isPreview={true} />
    </div>
  );
}
