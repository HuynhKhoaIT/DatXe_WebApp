"use client";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ResponseError } from "@/utils/until/ResponseError";
import { QUERY_KEY } from "@/constants";
const queryClient = new QueryClient();
// get detail
const fetchAccountDetail = async () => {
  const response = await fetch(`/api/client/account`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch account", response);
  }
  return await response.json();
};

const useAccountDetail = () => {
  return useQuery({
    queryKey: [QUERY_KEY.account, "client"],
    queryFn: () => fetchAccountDetail(),
  });
};

export { useAccountDetail, fetchAccountDetail };
