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

const addNews = async (values: any): Promise<any> => {
  const response = await fetch(`/api/admin/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to insert new category", response);
  }
  return await response.json();
};

const updateNews = async (values: any): Promise<any> => {
  const response = await fetch(`/api/admin/posts/${values?.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to insert new category", response);
  }
  return await response.json();
};

interface UseCategory {
  addItem: any;
  updateItem: any;
  isPendingAdd: boolean;
  isPendingUpdate: boolean;
}

export const useAddNews = (): UseCategory => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { mutate: addItem, isPending: isPendingAdd } = useMutation({
    mutationFn: addNews,
    onSuccess: () => {
      router.back();

      toast.success("Thêm tin thành công");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.newsList, searchParams.toString(), 1],
      });
    },
  });

  const { mutate: updateItem, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateNews,
    onSuccess: () => {
      router.back();

      toast.success("Cập nhật tin thành công");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.newsList, searchParams.toString(), 1],
      });
    },
  });

  return {
    addItem,
    updateItem,
    isPendingAdd,
    isPendingUpdate,
  };
};
