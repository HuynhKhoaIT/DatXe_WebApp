"use client";
import { Box, Space } from "@mantine/core";
import Typo from "@/app/components/elements/Typo";
import styles from "../create/index.module.scss";
import React, { Suspense, useEffect, useState } from "react";
import CarForm from "../create/CarForm";
import axios from "axios";
import { LoadingComponent } from "@/app/components/loading";
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
    <Box maw={"100%"} mx="auto" className={styles.wrapper}>
      <div className={styles.content}>
        <Suspense fallback={<LoadingComponent />}>
          <CarForm isEditing={true} dataDetail={car} />
        </Suspense>
      </div>
    </Box>
  );
}
