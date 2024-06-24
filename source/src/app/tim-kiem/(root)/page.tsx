import { kindProduct } from "@/constants/masterData";
import RenderContext from "../../components/elements/RenderContext";
import apiConfig from "@/constants/apiConfig";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
import SearchPageMobile from "../../layout/mobile/search/searchPage";
import SearchListPage from "../../layout/desktop/tim-kiem/ProductsListPage";
import { callApi } from "@/lib/auth";
export default async function SearchPage({ searchParams }: any) {
  const products = await callApi(apiConfig.products.getList, {
    params: {
      s: searchParams?.s,
      categoryId: searchParams?.categoryId,
      isProduct: searchParams?.isProduct,
      limit: searchParams?.limit || DEFAULT_SIZE_LIMIT,
      locationId: searchParams?.locationId,
      brand: searchParams?.brand,
    },
  });

  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: SearchListPage,
        },
        mobile: {
          defaultTheme: SearchPageMobile,
        },
      }}
      products={products}
      kindProduct={kindProduct}
      searchParams={searchParams}
    />
  );
}
