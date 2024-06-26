"use client";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ResponseError } from "@/utils/until/ResponseError";
import { QUERY_KEY } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { getOptionsProvince, getUltilities } from "@/utils/until";
import useFetch from "@/app/hooks/useFetch";
import { toast } from "react-toastify";
const queryClient = new QueryClient();

const addExpert = async (values: any): Promise<any> => {
  const response = await fetch(`/api/admin/garage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to insert new expert", response);
  }
  return await response.json();
};

const createQrCode = async (values: any): Promise<any> => {
  const response = await fetch(`/api/admin/garage/create-qr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to insert new qrcode", response);
  }
  return await response.json();
};

const updateExpert = async (values: any): Promise<any> => {
  const response = await fetch(`/api/admin/garage/${values?.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to insert new expert", response);
  }
  return await response.json();
};

interface UseExpert {
  addItem: any;
  updateItem: any;
  provinceOptions: any;
  isLoadingProvince: boolean;
  UltilitiesOptions: any;
  isLoadingUltilities: boolean;
  isPendingAdd: boolean;
  isPendingUpdate: boolean;
  createQr: any;
  isPendingQr: boolean;
}

export const useAddExpert = (): UseExpert => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { mutate: addItem, isPending: isPendingAdd } = useMutation({
    mutationFn: addExpert,
    onSuccess: () => {
      router.back();

      toast.success("Thêm chuyên gia thành công");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.experts, searchParams.toString(), 1],
      });
    },
  });

  const { mutate: updateItem, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateExpert,
    onSuccess: () => {
      router.back();

      toast.success("Cập nhật chuyên gia thành công");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.experts, searchParams.toString(), 1],
      });
    },
  });

  const { mutate: createQr, isPending: isPendingQr } = useMutation({
    mutationFn: createQrCode,
    onSuccess: () => {
      router.back();

      toast.success("Tạo Qr code thành công");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.experts],
      });
    },
  });

  const { data: provinceOptions, isLoading: isLoadingProvince } = useFetch({
    queryKey: [QUERY_KEY.optionsProvince],
    queryFn: () => getOptionsProvince(),
  });
  const { data: UltilitiesOptions, isLoading: isLoadingUltilities } = useFetch({
    queryKey: [QUERY_KEY.optionsultilities],
    queryFn: () => getUltilities(),
    options: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchInterval: false,
    },
  });

  return {
    addItem,
    updateItem,
    provinceOptions,
    isLoadingProvince,
    UltilitiesOptions,
    isLoadingUltilities,
    isPendingUpdate,
    isPendingAdd,
    createQr,
    isPendingQr,
  };
};
