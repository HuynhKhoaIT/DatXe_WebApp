"use client";
import RenderContextClient from "../components/elements/RenderContextClient";
import NotiListPage from "../layout/desktop/thong-bao/NotiListPage";
import { useNotiList } from "../hooks/noti/useNoti";

export default async function News() {
  const { data } = useNotiList({ limit: 100 });
  return (
    <RenderContextClient
      components={{
        desktop: {
          defaultTheme: NotiListPage,
        },
        mobile: {
          defaultTheme: NotiListPage,
        },
      }}
      notifications={data}
    />
  );
}
