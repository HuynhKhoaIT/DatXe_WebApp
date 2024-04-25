import ProductsListPageDesktop from "../layout/desktop/san-pham/ProductsListPage";
import ProductsListPageMobile from "../layout/mobile/san-pham/ProductsListPage";
import { kindProduct } from "@/constants/masterData";
import RenderContext from "../components/elements/RenderContext";
import { callApi } from "@/lib";
import apiConfig from "@/constants/apiConfig";
import { getCategories } from "../libs/prisma/category";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
import SearchPageMobile from "../layout/mobile/search/searchPage";
import SearchListPage from "../layout/desktop/tim-kiem/ProductsListPage";
export default async function SearchPage({ searchParams }: any) {
  const products = await callApi(apiConfig.products.getList, {
    params: {
      s: searchParams?.s,
      categoryId: searchParams?.categoryId,
      isProduct: searchParams?.isProduct || true,
      limit: searchParams?.limit || DEFAULT_SIZE_LIMIT,
    },
  });
  const categories = await getCategories({ garageId: "2" });

  const categoryOption = categories?.data?.map((item: any) => ({
    value: item.id.toString(),
    name: item.title,
  }));
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
      categoryOption={categoryOption}
      kindProduct={kindProduct}
      searchParams={searchParams}
    />
  );
}
