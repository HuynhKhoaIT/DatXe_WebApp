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

const fetchModelCarList = async (
  brandId: string | null,
  searchParams: any,
  page: number
): Promise<any> => {
  const response = await fetch(
    `/api/admin/car-model/${brandId}?${searchParams}&page=${page}`
  );
  if (!response.ok) {
    throw new ResponseError("Failed to fetch posts", response);
  }
  return await response.json();
};

const deleteModelCar = async (brandId: string): Promise<any> => {
  const response = await fetch(`/api/admin/car-model/${brandId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ brandId }),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to delete news", response);
  }
  return await response.json();
};

interface UseNews {
  modelCarList: any;
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

export const useModelCar = (brandId: string | null): UseNews => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const {
    data: modelCarList = [],
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: [QUERY_KEY.modelCar, searchParams.toString(), page],
    queryFn: () => fetchModelCarList(brandId, searchParams.toString(), page),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  useEffect(() => {
    if (!isPlaceholderData && page < modelCarList?.totalPage) {
      queryClient.prefetchQuery({
        queryKey: [
          QUERY_KEY.modelCar,
          brandId,
          searchParams.toString(),
          page + 1,
        ],
        queryFn: () =>
          fetchModelCarList(brandId, searchParams.toString(), page + 1),
      });
    } else if (!isPlaceholderData && searchParams.toString()) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.modelCar, brandId, searchParams.toString(), page],
        queryFn: () =>
          fetchModelCarList(brandId, searchParams.toString(), page),
      });
    }
  }, [modelCarList, searchParams, isPlaceholderData, page, queryClient]);

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteModelCar,
    onSuccess: () => {
      toast.success("Xoá dòng xe thành công");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.modelCar, brandId, searchParams.toString(), page],
      });
    },
  });

  return {
    modelCarList,
    isLoading,
    isFetching,
    error: mapError(error),
    page,
    setPage,
    deleteItem,
  };
};
