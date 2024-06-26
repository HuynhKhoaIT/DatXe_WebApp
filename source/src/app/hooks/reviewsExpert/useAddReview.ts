"use client";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ResponseError } from "@/utils/until/ResponseError";
import { QUERY_KEY } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
const queryClient = new QueryClient();

const addReview = async (values: any): Promise<any> => {
  const response = await fetch(`/api/client/reviews/garage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to insert new review Expert", response);
  }
  return await response.json();
};

const updateReview = async (values: any): Promise<any> => {
  const response = await fetch(`/api/client/reviews/garage/${values?.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to insert new review Expert", response);
  }
  return await response.json();
};

interface UseReview {
  addItem: any;
  updateItem: any;
  isSuccessAdd: boolean;
  isSuccessUpdate: boolean;
  isPendingAdd: boolean;
  isPendingUpdate: boolean;
}

export const useAddReview = (): UseReview => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const {
    mutate: addItem,
    isSuccess: isSuccessAdd,
    isPending: isPendingAdd,
  } = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      router.refresh();
      toast.success("Gửi đánh giá thành công");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.reviewsExpert, searchParams.toString(), 1],
      });
    },
  });

  const {
    mutate: updateItem,
    isSuccess: isSuccessUpdate,
    isPending: isPendingUpdate,
  } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      router.refresh();
      toast.success("Gửi đánh giá thành công");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.reviewsExpert, searchParams.toString(), 1],
      });
    },
  });

  return {
    addItem,
    updateItem,
    isSuccessAdd,
    isSuccessUpdate,
    isPendingAdd,
    isPendingUpdate,
  };
};
