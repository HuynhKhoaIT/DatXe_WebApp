"use client";
import { useCars } from "../hooks/car/useCar";
import CarListPage from "./CarListPage";
export default function CarsPage() {
  const { cars, page, setPage, deleteItem, isLoading, isFetching } = useCars();
  return (
    <CarListPage
      carsData={cars}
      page={page}
      setPage={setPage}
      deleteItem={deleteItem}
      loading={isLoading || isFetching}
    />
  );
}
