import RenderContext from "@/app/components/elements/RenderContext";
import CarsListPage from "@/app/layout/desktop/dashboard/Danh-sach-xe/carsListPage";
import CarsListPageMobile from "@/app/layout/mobile/dashboard/danh-sach-xe/CarsListPageMobile";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";

export default async function CarsPage({ searchParams }: any) {
  const cars = await callApi(apiConfig.car.getList, {
    params: {
      page: searchParams?.page,
    },
  });

  async function handleDeleteCar(id: string) {
    "use server";
    await callApi(apiConfig.car.delete, {
      pathParams: {
        id: id,
      },
    });
  }
  async function handleSetDefault(formData: any) {
    "use server";
    await callApi(apiConfig.car.setDefaultCar, {
      data: formData,
    });
  }
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: CarsListPage,
        },
        mobile: {
          defaultTheme: CarsListPageMobile,
        },
      }}
      carsData={cars}
      handleDeleteCar={handleDeleteCar}
      handleSetDefault={handleSetDefault}
    />
  );
}
