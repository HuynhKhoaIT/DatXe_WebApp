"use client";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ResponseError } from "@/utils/until/ResponseError";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { QUERY_KEY } from "@/constants";
import { useSearchParams } from "next/navigation";
const queryClient = new QueryClient();

const fetchNewsList = async (searchParams: any, page: number): Promise<any> => {
  const response = await fetch(
    `/api/admin/finance/income?${searchParams}&page=${page}`
  );
  if (!response.ok) {
    throw new ResponseError("Failed to fetch posts", response);
  }
  return await response.json();
};

interface UseNews {
  revenue: any;
  isLoading: boolean;
  isFetching: boolean;
  error?: string;
  page?: number;
  setPage: Dispatch<SetStateAction<number>>;
}

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

export const useRevenueList = (): UseNews => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const {
    data: revenue = [],
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: [QUERY_KEY.revenue, searchParams.toString(), page],
    queryFn: () => fetchNewsList(searchParams.toString(), page),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  useEffect(() => {
    if (!isPlaceholderData && page < revenue?.totalPage) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.revenue, searchParams.toString(), page + 1],
        queryFn: () => fetchNewsList(searchParams.toString(), page + 1),
      });
    } else if (!isPlaceholderData && searchParams.toString()) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.revenue, searchParams.toString(), page],
        queryFn: () => fetchNewsList(searchParams.toString(), page),
      });
    }
  }, [revenue, searchParams, isPlaceholderData, page, queryClient]);

  return {
    revenue,
    isLoading,
    isFetching,
    error: mapError(error),
    page,
    setPage,
  };
};

// get detail
const fetchRevenueDetail = async (id: string) => {
  const response = await fetch(`/api/admin/finance/income/${id}`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch post", response);
  }
  return await response.json();
};

const useRevenueDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.revenue, id],
    queryFn: () => fetchRevenueDetail(id),
  });
};

export { useRevenueDetail, fetchRevenueDetail };
