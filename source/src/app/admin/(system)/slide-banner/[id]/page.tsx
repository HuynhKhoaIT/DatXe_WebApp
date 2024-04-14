"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BannerForm from "../create/BannerForm";
export const revalidate = 60;
export default function UpdateAmentity({ params }: { params: { id: number } }) {
  const [amentity, setAmentity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/admin/slide-banner/${params?.id}`
        );
        setAmentity(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.id]);
  return <BannerForm isEditing={true} dataDetail={amentity} />;
}
