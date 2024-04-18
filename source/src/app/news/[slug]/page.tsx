import RenderContextClient from "@/app/components/elements/RenderContextClient";
import NewDetailPage from "@/app/layout/desktop/tin-tuc/NewsDetailPage";
import BlogDetailPageMobile from "@/app/layout/mobile/blog/BlogDetailPage";
import apiConfig from "@/constants/apiConfig";
import { callApi } from "@/lib";
export const dynamic = "force-dynamic";

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
