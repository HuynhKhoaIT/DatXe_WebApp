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

const updateAccount = async (values: any): Promise<any> => {
  const response = await fetch(`/api/client/account`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to update car", response);
  }
  return await response.json();
};
interface UseAccount {
  updateItem: any;
  isPending: boolean;
}

export const useAddAccount = (): UseAccount => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: updateItem, isPending } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      router.refresh();
      toast.success("Cập nhật thông tin thành công");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.account, "client"],
      });
    },
  });
  return {
    updateItem,
    isPending,
  };
};
