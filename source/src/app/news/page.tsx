import { callApi } from "@/lib";
import RenderContextClient from "../components/elements/RenderContextClient";
import NewsListPage from "../layout/desktop/tin-tuc/NewsListPage";
import apiConfig from "@/constants/apiConfig";
import NewsListPageMobile from "../layout/mobile/blog/NewsListPageMobile";

export default async function News() {
  const newsData = await callApi(apiConfig.posts.getList, {});
  return (
    <RenderContextClient
      components={{
        desktop: {
          defaultTheme: NewsListPage,
        },
        mobile: {
          defaultTheme: NewsListPageMobile,
        },
      }}
      newsData={newsData}
    />
  );
}
