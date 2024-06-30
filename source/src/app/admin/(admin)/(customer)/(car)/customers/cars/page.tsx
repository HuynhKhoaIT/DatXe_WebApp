import apiConfig from "@/constants/apiConfig";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { callApi } from "@/lib/auth";
import { Skeleton } from "@mantine/core";
import CarsListPage from "@/app/admin/(admin)/(car)/cars/CarsListPage";
import { Suspense } from "react";
import ActionBar from "@/app/components/common/ActionBar";

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
    <Suspense fallback={<Skeleton height={400} />}>
      <ActionBar
        linkTo={`/admin/customers/car/create?customerId=${searchParams.customerId}`}
      />
      <CarsListPage cars={cars} carsDlbd={carsDlbd} deleteItem={deleteItem} />
    </Suspense>
  );
}
