"use client";
import ProductsListPageDesktop from "../layout/desktop/san-pham/ProductsListPage";
import ProductsListPageMobile from "../layout/mobile/san-pham/ProductsListPage";
import { getCategories } from "../libs/prisma/category";
import { getProducts } from "../libs/prisma/product";
import { kindProduct } from "@/constants/masterData";
import RenderContextClient from "../components/elements/RenderContextClient";
// import { useProduct } from "../hooks/products/useProducts";

export default function Products() {
  // const { data } = useProduct();
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
      dataSource={products}
      categroies={categroies}
      kindProduct={kindProduct}
    />
  );
}
