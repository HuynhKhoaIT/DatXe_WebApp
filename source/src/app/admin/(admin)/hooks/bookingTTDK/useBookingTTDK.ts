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

const fetchBookingTTDK = async (
  searchParams: any,
  page: number,
  token: string
): Promise<any> => {
  const response = await fetch(
    `/api/admin/booking-ttdk?${searchParams}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new ResponseError("Failed to fetch booking ttdk", response);
  }
  return await response.json();
};

const deleteBookingTTDK = async ({ id, token }: any): Promise<any> => {
  const response = await fetch(`/api/admin/booking-ttdk/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to delete booking TTDK", response);
  }
  return await response.json();
};

interface UseBookingTTDK {
  bookingTTDK: any;
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

export const useBookingTTDK = ({ token }: any): UseBookingTTDK => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const {
    data: bookingTTDK = [],
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: [QUERY_KEY.bookingTTDK, searchParams.toString(), page],
    queryFn: () => fetchBookingTTDK(searchParams.toString(), page, token),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  useEffect(() => {
    if (!isPlaceholderData && page < bookingTTDK?.totalPage) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.bookingTTDK, searchParams.toString(), page + 1],
        queryFn: () =>
          fetchBookingTTDK(searchParams.toString(), page + 1, token),
      });
    } else if (!isPlaceholderData && searchParams) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.bookingTTDK, searchParams.toString(), page],
        queryFn: () => fetchBookingTTDK(searchParams.toString(), page, token),
      });
    }
  }, [bookingTTDK, searchParams, isPlaceholderData, page, queryClient]);

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteBookingTTDK,
    onSuccess: () => {
      toast.success("Xoá đơn hàng TTDK thành công");

      queryClient.invalidateQueries({
        queryKey: ["bookingTTDK", searchParams.toString(), page],
      });
    },
  });

  return {
    bookingTTDK,
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
  const response = await fetch(`/api/admin/booking-ttdk/${id}`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch order", response);
  }
  return await response.json();
};

const useBookingDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.orderDetail, id],
    queryFn: () => fetchOrderDetail(id),
  });
};

export { useBookingDetail, fetchOrderDetail };
