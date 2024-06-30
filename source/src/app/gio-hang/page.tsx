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
  const session = await getSession();
  async function handleCreate(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.orders.update, {
        data: formData,
      });
    } catch (error) {
      return null;
    }
  }
  return (
    <CartDetailPage
      myAccount={session?.user || {}}
      carsData={carsData?.data}
      handleAdd={handleAdd}
      createItem={handleCreate}
    />
  );
}
