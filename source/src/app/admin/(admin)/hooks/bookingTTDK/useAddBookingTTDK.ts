"use client";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ResponseError } from "@/utils/until/ResponseError";
import { QUERY_KEY } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { getOptionsBrands } from "@/utils/until";
import useFetch from "@/app/hooks/useFetch";
import { toast } from "react-toastify";
const queryClient = new QueryClient();

const updateBooking = async (values: any, token: any): Promise<any> => {
  const response = await fetch(`/api/admin/booking-ttdk/${values?.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to update booking ttdk", response);
  }
  return await response.json();
};

interface UseOrders {
  updateItem: any;
  isPendingUpdate: boolean;
}

export const useAddBookingTTDK = ({ token }: any): UseOrders => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const { mutate: updateItem, isPending: isPendingUpdate } = useMutation({
    mutationFn: (values) => {
      return updateBooking(values, token);
    },
    onSuccess: () => {
      router.back();
      toast.success("Cập nhật đơn hàng thành công");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.bookingTTDK, searchParams.toString(), 1],
      });
    },
  });

  return {
    updateItem,
    isPendingUpdate,
  };
};
