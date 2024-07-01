import { callApi } from "@/lib/auth";
import CarsListPage from "./CarsListPage";
import apiConfig from "@/constants/apiConfig";

export default async function Cars({ searchParams }: any) {
  const cars = await callApi(apiConfig.admin.car.getList, {
    params: searchParams,
  });
  const carsDlbd = await callApi(apiConfig.admin.car.getCarsDlbd, {
    params: searchParams,
  });

  async function deleteItem(formData: FormData) {
    "use server";
    try {
      const res = await callApi(apiConfig.admin.car.delete, {
        pathParams: {
          id: formData,
        },
      });
      return res;
    } catch (error) {
      return null;
    }
  }
  return (
    <CarsListPage cars={cars} carsDlbd={carsDlbd} deleteItem={deleteItem} />
  );
}
