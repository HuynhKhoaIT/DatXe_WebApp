"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AmentityForm from "../create/AmentityForm";
export const revalidate = 60;
export default function UpdateAmentity({ params }: { params: { id: number } }) {
  const [amentity, setAmentity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/amentity/${params?.id}`);
        setAmentity(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.id]);
  return <AmentityForm isEditing={true} dataDetail={amentity} />;
}
