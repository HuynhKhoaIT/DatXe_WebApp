import ProductsListPageDesktop from "../layout/desktop/san-pham/ProductsListPage";
import ProductsListPageMobile from "../layout/mobile/san-pham/ProductsListPage";
import { kindProduct } from "@/constants/masterData";
import RenderContext from "../components/elements/RenderContext";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
import { getCategories } from "../libs/prisma/category";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
export default async function Products({ searchParams }: any) {
  const products = await callApi(apiConfig.products.getList, {
    params: {
      categoriId: searchParams?.categoryId,
      isProduct: searchParams?.isProduct || true,
      limit: searchParams?.limit || DEFAULT_SIZE_LIMIT,
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
      searchParams={searchParams}
    />
  );
}
