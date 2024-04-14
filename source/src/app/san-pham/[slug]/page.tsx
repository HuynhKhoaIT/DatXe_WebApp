import RenderContext from "@/app/components/elements/RenderContext";
import ProductDetailPageDesktop from "@/app/layout/desktop/san-pham/ProductDetailPage";
import ProductDetailPageMobile from "@/app/layout/mobile/san-pham/ProductDetailPage";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib";
export const dynamic = "force-dynamic";

export default async function DetailProduct({
  params,
}: {
  params: { slug: string };
}) {
  const product = await callApi(apiConfig.products.getById, {
    pathParams: {
      id: params?.slug,
    },
  });
  const productsRelate = await callApi(apiConfig.products.getRelate, {
    pathParams: {
      id: params?.slug,
    },
  });

  const productReview = await callApi(apiConfig.products.getReviewById, {
    pathParams: {
      id: params?.slug,
    },
  });

  return (
    <RenderContext
      components={{
        desktop: {
          defaultTheme: ProductDetailPageDesktop,
        },
        mobile: {
          defaultTheme: ProductDetailPageMobile,
        },
      }}
      product={product?.data || []}
      productReview={productReview?.data || []}
      productRelate={productsRelate}
    />
  );
}
