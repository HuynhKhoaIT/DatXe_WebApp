import { getMyAccount } from "@/utils/user";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
import CartDetailPage from "./CartDetailPage";
export default async function Cart() {
  const myAccount: any = await getMyAccount();
  const carsData = await callApi(apiConfig.car.getList, {});
  async function handleAdd(formData: any) {
    "use server";
    await callApi(apiConfig.car.create, {
      data: formData,
    });
  }
  return (
    <CartDetailPage
      myAccount={myAccount}
      carsData={carsData?.data}
      handleAdd={handleAdd}
    />
  );
}
