import RenderContextClient from "@/app/components/elements/RenderContextClient";
import NewDetailPage from "@/app/layout/desktop/tin-tuc/NewsDetailPage";
import BlogDetailPageMobile from "@/app/layout/mobile/blog/BlogDetailPage";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib";
export const dynamic = "force-dynamic";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const newsData = await callApi(apiConfig.posts.getById, {
    pathParams: {
      id: params.slug,
    },
  });

  return {
    title: newsData?.data?.seoMeta?.title || newsData?.data?.title,
    description:
      newsData?.data?.seoMeta?.desription || newsData?.data?.shortDescription,
    openGraph: {
      title: newsData?.data?.seoMeta?.title || newsData?.data?.title,
      description:
        newsData?.data?.seoMeta?.desription || newsData?.data?.shortDescription,
      images: newsData?.data?.seoMeta?.thumbnail || newsData?.data?.thumbnail,
    },
  };
}
export default async function DetailNews({
  params,
}: {
  params: { slug: string };
}) {
  const newsData = await callApi(apiConfig.posts.getById, {
    pathParams: {
      id: params.slug,
    },
  });
  const newsDataList = await callApi(apiConfig.posts.getList, {
    params: {
      limit: 5,
    },
  });
  return (
    <RenderContextClient
      components={{
        desktop: {
          defaultTheme: NewDetailPage,
        },
        mobile: {
          defaultTheme: BlogDetailPageMobile,
        },
      }}
      newsData={newsData}
      newsDataList={newsDataList}
    />
  );
}
