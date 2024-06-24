import apiConfig from "@/constants/apiConfig";
import CartDetailPage from "./CartDetailPage";
import { callApi, getSession } from "@/lib/auth";
export default async function Cart() {
  const carsData = await callApi(apiConfig.car.getList, {});
  async function handleAdd(formData: any) {
    "use server";
    await callApi(apiConfig.car.create, {
      data: formData,
    });
  }
  const { user }: any = await getSession();
  return (
    <CartDetailPage
      myAccount={user}
      carsData={carsData?.data}
      handleAdd={handleAdd}
    />
  );
}
