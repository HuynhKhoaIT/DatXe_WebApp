"use client";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../index.module.scss";
import React, { Suspense, useEffect, useState } from "react";
import { LoadingComponent } from "@/app/components/loading";
import CarForm from "../create/CarForm";
import axios from "axios";
export default function CarSavePage({ params }: { params: { slug: string } }) {
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/client/cars/${params?.slug}`);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.slug]);
  return (
    <>
      <Box maw={"100%"} mx="auto">
        <Suspense fallback={<LoadingComponent />}>
          <CarForm isEditing={true} dataDetail={car} />
        </Suspense>
      </Box>
    </>
  );
}
