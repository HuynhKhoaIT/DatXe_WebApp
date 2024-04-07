"use client";
import ProductsListPageDesktop from "../layout/desktop/san-pham/ProductsListPage";
import ProductsListPageMobile from "../layout/mobile/san-pham/ProductsListPage";
import { getCategories } from "../libs/prisma/category";
import { getProducts } from "../libs/prisma/product";
import { kindProduct } from "@/constants/masterData";
import RenderContextClient from "../components/elements/RenderContextClient";
import { useProduct, useProductRelate } from "../hooks/products/useProducts";
import { useCategories } from "../hooks/categories/useCategory";
import { useState } from "react";
// import { useProduct } from "../hooks/products/useProducts";

export default function Products() {
  const [productCount, setProductCount] = useState(5);
  const { data: products, isLoading } = useProductRelate(productCount);
  const {
    data: categories,
    isLoading: isLoadingCategory,
    isFetching: isFetchingCategory,
  } = useCategories(10);
  return (
    <RenderContextClient
      components={{
        desktop: {
          defaultTheme: ProductsListPageDesktop,
        },
        mobile: {
          defaultTheme: ProductsListPageMobile,
        },
      }}
      products={products}
      categories={categories}
      kindProduct={kindProduct}
      setProductCount={setProductCount}
      productCount={productCount}
      isLoadingCategory={isLoadingCategory || isFetchingCategory}
    />
  );
}
