"use client";
import { callApi } from "@/lib";
import RenderContextClient from "../components/elements/RenderContextClient";
import apiConfig from "@/constants/apiConfig";
import StoreListPage from "../layout/desktop/cua-hang-cua-toi/StoreListPage";
import { useExperts } from "../admin/(admin)/hooks/expert/useExpert";

export default function News() {
  const { experts, isLoading, isFetching } = useExperts();
  return (
    <RenderContextClient
      components={{
        desktop: {
          defaultTheme: StoreListPage,
        },
        mobile: {
          defaultTheme: StoreListPage,
        },
      }}
      experts={experts}
      isLoading={isLoading || isFetching}
    />
  );
}
