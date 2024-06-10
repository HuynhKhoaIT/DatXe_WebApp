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

const fetchUsers = async (searchParams: any, page: number): Promise<any> => {
  const response = await fetch(`/api/admin/user?${searchParams}&page=${page}`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch users", response);
  }
  return await response.json();
};

const deleteUsers = async (id: string): Promise<any> => {
  const response = await fetch(`/api/admin/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new ResponseError("Failed to delete user", response);
  }
  return await response.json();
};

interface useUsers {
  users: any;
  isLoading: boolean;
  isFetching: boolean;
  error?: string;
  page?: number;
  activeTab?: string | null;
  setPage: Dispatch<SetStateAction<number>>;
  setActiveTab: Dispatch<SetStateAction<string | null>>;
  deleteItem: any;
}

function mapError(error: unknown | undefined): undefined | string {
  if (!error) return undefined;
  if (error instanceof ResponseError) return error.response.statusText;
  if (error instanceof Error) return error.message;
  return "Unknown error";
}

export const useUsers = (): useUsers => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const [activeTab, setActiveTab] = useState<string | null>("first");

  const {
    data: users = [],
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: [QUERY_KEY.users, searchParams.toString(), page],
    queryFn: () => fetchUsers(searchParams.toString(), page),
    refetchOnWindowFocus: false,
    retry: 2,
  });

  useEffect(() => {
    if (!isPlaceholderData && page < users?.totalPage) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.users, searchParams.toString(), page + 1],
        queryFn: () => fetchUsers(searchParams.toString(), page + 1),
      });
    } else if (!isPlaceholderData && searchParams) {
      queryClient.prefetchQuery({
        queryKey: [QUERY_KEY.users, searchParams.toString(), page],
        queryFn: () => fetchUsers(searchParams.toString(), page),
      });
    }
  }, [users, searchParams, isPlaceholderData, page, queryClient]);

  const { mutate: deleteItem } = useMutation({
    mutationFn: deleteUsers,
    onSuccess: () => {
      toast.success("Xoá khách hàng thành công");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.users, searchParams.toString(), page],
      });
    },
  });

  return {
    users,
    isLoading,
    isFetching,
    error: mapError(error),
    page,
    setPage,
    deleteItem,
    activeTab,
    setActiveTab,
  };
};

// get detail
const fetchUserDetail = async (id: string) => {
  const response = await fetch(`/api/admin/user/${id}`);
  if (!response.ok) {
    throw new ResponseError("Failed to fetch user", response);
  }
  return await response.json();
};

const useUserDetail = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.user, id],
    queryFn: () => fetchUserDetail(id),
  });
};

export { useUserDetail, fetchUserDetail };
