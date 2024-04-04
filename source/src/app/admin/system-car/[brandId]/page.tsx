"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BrandCarForm from "../create/BrandCarForm";
export const revalidate = 60;
export default function UpdateCategory({
  params,
}: {
  params: { brandId: number };
}) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/admin/product-category/${params?.brandId}`
        );
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params?.brandId]);
  return <BrandCarForm isEditing={true} dataDetail={category} />;
}
