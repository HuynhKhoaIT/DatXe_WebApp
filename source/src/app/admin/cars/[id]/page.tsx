"use client";
import React, { useEffect, useState } from "react";
import CarForm from "../create/CarForm";
import axios from "axios";
export const revalidate = 60;
export default function UpdateCar({ params }: { params: { id: number } }) {
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/car/${params?.id}`);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.id]);
  return <CarForm isEditing={true} dataDetail={car} />;
}
