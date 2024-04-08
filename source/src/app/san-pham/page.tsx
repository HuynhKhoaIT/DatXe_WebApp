import ProductsListPageDesktop from "../layout/desktop/san-pham/ProductsListPage";
import ProductsListPageMobile from "../layout/mobile/san-pham/ProductsListPage";
import { kindProduct } from "@/constants/masterData";
import RenderContext from "../components/elements/RenderContext";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
import { getCategories } from "../libs/prisma/category";
// import { useProduct } from "../hooks/products/useProducts";

export default async function Products({ searchParams }: any) {
  const products = await callApi(apiConfig.products.getList, {
    params: {
      categoriId: searchParams?.categoryId,
    },
  });
  const categories = await getCategories({ garageId: "2" });

  return (
    <RenderContext
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
    />
  );
}
