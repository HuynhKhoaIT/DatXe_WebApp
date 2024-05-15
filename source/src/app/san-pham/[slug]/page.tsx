import RenderContext from "@/app/components/elements/RenderContext";
import ProductDetailPageDesktop from "@/app/layout/desktop/san-pham/ProductDetailPage";
import ProductDetailPageMobile from "@/app/layout/mobile/san-pham/ProductDetailPage";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib";
export const dynamic = "force-dynamic";
import type { Metadata, ResolvingMetadata } from "next";
import imageDefault from "../../../../public/assets/images/no_image.png";
import { AppConstants } from "@/constants";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await callApi(apiConfig.products.getById, {
    pathParams: {
      id: params?.slug,
    },
  });

  return {
    title:
      product?.data?.product?.seoMeta?.title || product?.data?.product?.name,
    description:
      product?.data?.product?.seoMeta?.description ||
      product?.data?.product?.description,
    openGraph: {
      title:
        product?.data?.product?.seoMeta?.title || product?.data?.product?.name,
      description:
        product?.data?.product?.seoMeta?.description ||
        product?.data?.product?.description,
      images:
        `${AppConstants}${product?.data?.product?.seoMeta?.thumbnail}` ||
        `${AppConstants}${imageDefault.src}`,
    },
  };
}
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
      productReview={productReview || []}
      productRelate={productsRelate}
    />
  );
}
