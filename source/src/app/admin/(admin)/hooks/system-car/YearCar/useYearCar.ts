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
import { toast } from "react-toastify";
const queryClient = new QueryClient();

const fetchYearCarList = async (
  modelId: string | null,
  searchParams: any,
  page: number
): Promise<any> => {
  const response = await fetch(
    `/api/admin/car-model/${modelId}?${searchParams}&page=${page}`
  );
  if (!response.ok) {
    throw new ResponseError("Failed to fetch posts", response);
  }
  return await response.json();
};

const deleteYearCar = async (modelId: string): Promise<any> => {
  const response = await fetch(`/api/admin/car-model/${modelId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ modelId }),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to delete news", response);
  }
  return await response.json();
};

interface UseNews {
  yearCarList: any;
  isLoading: boolean;
  isFetching: boolean;
  error?: string;
  page?: number;
  setPage: Dispatch<SetStateAction<number>>;
  deleteItem: any;
}

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

export const useYearCar = (modelId: string | null): UseNews => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const {
    data: yearCarList = [],
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: [QUERY_KEY.yearCar, modelId, searchParams.toString(), page],
    queryFn: () => fetchYearCarList(modelId, searchParams.toString(), page),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  useEffect(() => {
    if (!isPlaceholderData && page < yearCarList?.totalPage) {
      queryClient.prefetchQuery({
        queryKey: [
          QUERY_KEY.yearCar,
          modelId,
          searchParams.toString(),
          page + 1,
        ],
        queryFn: () =>
          fetchYearCarList(modelId, searchParams.toString(), page + 1),
      });
    } else if (!isPlaceholderData && searchParams.toString()) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.yearCar, modelId, searchParams.toString(), page],
        queryFn: () => fetchYearCarList(modelId, searchParams.toString(), page),
      });
    }
  }, [yearCarList, searchParams, isPlaceholderData, page, queryClient]);

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteYearCar,
    onSuccess: () => {
      toast.success("Xoá năm sản xuất thành công");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.yearCar, modelId, searchParams.toString(), page],
      });
    },
  });

  return {
    yearCarList,
    isLoading,
    isFetching,
    error: mapError(error),
    page,
    setPage,
    deleteItem,
  };
};
