"use client";
import CarForm from "../create/CarForm";
import { useCarDetail } from "../../hooks/car/useCar";
export default function UpdateCar({ params }: { params: { id: string } }) {
  const { data: car, isLoading, isPending } = useCarDetail(params?.id);
  return (
    <CarForm
      isEditing={true}
      dataDetail={car}
      isLoading={isLoading}
      isPending={isPending}
    />
  );
}
