"use client";
import { useCars } from "../hooks/car/useCar";
// import CarListPage from "./CarListPage";
// export default function CarsPage() {
//   const { cars, page, setPage, deleteItem, isLoading, isFetching } = useCars();
//   return (
//     <CarListPage
//       carsData={cars}
//       page={page}
//       setPage={setPage}
//       deleteItem={deleteItem}
//       loading={isLoading || isFetching}
//     />
//   );
// }
import RenderContextClient from "@/app/components/elements/RenderContextClient";
export const dynamic = "force-dynamic";
import CarsListPage from "@/app/layout/desktop/dashboard/Danh-sach-xe/carsListPage";
import CarsListPageMobile from "@/app/layout/mobile/dashboard/danh-sach-xe/CarsListPageMobile";

export default function CarsPage() {
  const { cars, page, setPage, deleteItem, isLoading, isFetching } = useCars();
  return (
    <RenderContextClient
      components={{
        desktop: {
          defaultTheme: CarsListPage,
        },
        mobile: {
          defaultTheme: CarsListPageMobile,
        },
      }}
      carsData={cars}
      page={page}
      setPage={setPage}
      deleteItem={deleteItem}
      loading={isLoading}
    />
  );
}
