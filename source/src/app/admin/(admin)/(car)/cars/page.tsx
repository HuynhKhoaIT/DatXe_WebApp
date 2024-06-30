import { callApi } from "@/lib/auth";
import CarsListPage from "./CarsListPage";
import apiConfig from "@/constants/apiConfig";
import { Suspense } from "react";
import { Skeleton } from "@mantine/core";
export const dynamic = "force-dynamic";

const breadcrumbs = [
  { title: "Tổng quan", href: "/admin" },
  { title: "Danh sách xe" },
];

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
      <CarsListPage cars={cars} carsDlbd={carsDlbd} deleteItem={deleteItem} />
    </Suspense>
  );
}
