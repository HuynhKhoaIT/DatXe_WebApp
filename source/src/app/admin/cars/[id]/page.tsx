"use client";
import React, { useEffect, useState } from "react";
import CarForm from "../create/CarForm";
import axios from "axios";
import { useCarDetail } from "../../hooks/car/useCar";
export const revalidate = 60;
export default function UpdateCar({ params }: { params: { id: string } }) {
  const { data: car, isLoading } = useCarDetail(params?.id);
  return <CarForm isEditing={true} dataDetail={car} isLoading={isLoading} />;
}
