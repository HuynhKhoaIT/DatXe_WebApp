'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import useFetch from '@/app/hooks/useFetch';
import { getOptionsCategories } from '@/utils/until';
import { notifications } from '@mantine/notifications';
import { toast } from 'react-toastify';
const queryClient = new QueryClient();

const fetchProducts = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/admin/home-page?${searchParams}&isProduct=0&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch products', response);
    }
    return await response.json();
};



const deleteProduct = async (id: string): Promise<any> => {
    const response = await fetch(`/api/admin/home-page/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete product', response);
    }
    return await response.json();
};


interface useServicesHome {
    products: any;
    isLoading: boolean;
    isFetching: boolean;
    error?: string;
    page?: number;
    setPage: Dispatch<SetStateAction<number>>;
    categoryOptions: any;
    deleteItem:any;
}

function mapError(error: unknown | undefined): undefined | string {
    if (!error) return undefined;
    if (error instanceof ResponseError) return error.response.statusText;
    if (error instanceof Error) return error.message;
    return 'Unknown error';
}

export const useServicesHome = (): useServicesHome => {
    const queryClient = useQueryClient();

    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);

    const {
        data: products = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.serviceHome, searchParams.toString(), page],
        queryFn: () => fetchProducts(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });
   

    useEffect(() => {
        if (!isPlaceholderData && page < products?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.serviceHome, searchParams.toString(), page + 1],
                queryFn: () => fetchProducts(searchParams.toString(), page + 1),
                retry: 2,
            });
        } else if ( !isPlaceholderData && searchParams) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.serviceHome, searchParams.toString(), page],
                queryFn: () => fetchProducts(searchParams.toString(), page),
                retry: 2,
            });
        } 
    }, [products, searchParams, isPlaceholderData, page, queryClient]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            toast.success("Xoá sản phẩm nổi bật thành công");

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.serviceHome, searchParams.toString(), page],
            });
        },
    });
    const { data: categoryOptions } = useFetch({
        queryKey: [QUERY_KEY.optionsCategory],
        queryFn: () => getOptionsCategories(),
        options: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            refetchInterval: false,
        },
    });
    return {
        products,
        isLoading,
        isFetching,
        error: mapError(error),
        page,
        setPage,
        categoryOptions,
        deleteItem
    };
};


