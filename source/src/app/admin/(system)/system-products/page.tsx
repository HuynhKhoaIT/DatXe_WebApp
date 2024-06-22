import RenderContext from "@/app/components/elements/RenderContext";
import { DEFAULT_SIZE_LIMIT } from "@/constants";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib/auth";
import ProductsListPage from "./_component/ProductsListPage";

export default async function SystemProducts({ searchParams }: any) {
  const products = await callApi(apiConfig.products.getList, {
    params: {
      s: searchParams?.s,
      categoryId: searchParams?.categoryId,
      isProduct: searchParams?.isProduct || true,
      page: searchParams?.page || 1,
      garageId: searchParams?.garageId,
      locationId: searchParams?.locationId,
      brand: searchParams?.brand,
    },
  });
  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: ProductsListPage,
        },
      }}
      products={products}
      searchParams={searchParams}
    />
  );
}
