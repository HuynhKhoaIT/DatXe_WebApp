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

const fetchOrders = async (searchParams: any, page: number): Promise<any> => {
  const response = await fetch(`/api/orders?${searchParams}&page=${page}`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch orders", response);
  }
  return await response.json();
};

const deleteOrder = async (id: string): Promise<any> => {
  const response = await fetch(`/api/orders/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to delete order", response);
  }
  return await response.json();
};

interface UseOrders {
  orders: any;
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

export const useOrders = (): UseOrders => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const {
    data: orders = [],
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: [QUERY_KEY.orders, "client", searchParams.toString(), page],
    queryFn: () => fetchOrders(searchParams.toString(), page),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  useEffect(() => {
    if (!isPlaceholderData && page < orders?.totalPage) {
      queryClient.prefetchQuery({
        queryKey: [
          QUERY_KEY.orders,
          "client",
          searchParams.toString(),
          page + 1,
        ],
        queryFn: () => fetchOrders(searchParams.toString(), page + 1),
      });
    } else if (!isPlaceholderData && searchParams) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.orders, "client", searchParams.toString(), page],
        queryFn: () => fetchOrders(searchParams.toString(), page),
      });
    }
  }, [orders, searchParams, isPlaceholderData, page, queryClient]);

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      toast.success("Xoá đơn hàng thành công");

      queryClient.invalidateQueries({
        queryKey: ["orders", searchParams.toString(), page],
      });
    },
  });

  return {
    orders,
    isLoading,
    isFetching,
    error: mapError(error),
    page,
    setPage,
    deleteItem,
  };
};

// get detail
const fetchOrderDetail = async (id: string) => {
  const response = await fetch(`/api/orders/${id}`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch expert", response);
  }
  return await response.json();
};

const useOrderDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.orderDetail, "client", id],
    queryFn: () => fetchOrderDetail(id),
  });
};

export { useOrderDetail, fetchOrderDetail };
