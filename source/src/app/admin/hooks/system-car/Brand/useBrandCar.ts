'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const fetchBrandCarList = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/admin/car-model?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch posts', response);
    }
    return await response.json();
};

const deleteBrandCar = async (id: string): Promise<any> => {
    const response = await fetch(`/api/admin/car-model/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete news', response);
    }
    return await response.json();
};

interface UseNews {
    brandCarList: any;
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
    return 'Unknown error';
}

export const useBrandCar = (): UseNews => {
    const queryClient = useQueryClient();

    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);

    const {
        data: brandCarList = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.brandCar, searchParams.toString(), page],
        queryFn: () => fetchBrandCarList(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });

    useEffect(() => {
        if (!isPlaceholderData && page < brandCarList?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.brandCar, searchParams.toString(), page + 1],
                queryFn: () => fetchBrandCarList(searchParams.toString(), page + 1),
            });
        } else if (!isPlaceholderData && searchParams.toString()) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.brandCar, searchParams.toString(), page],
                queryFn: () => fetchBrandCarList(searchParams.toString(), page),
            });
        }
    }, [brandCarList, searchParams, isPlaceholderData, page, queryClient]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteBrandCar,
        onSuccess: () => {
            notifications.show({
                title: 'Thành công',
                message: 'Xoá hãng xe thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.brandCar, searchParams.toString(), page],
            });
        },
    });

    return {
        brandCarList,
        isLoading,
        isFetching,
        error: mapError(error),
        page,
        setPage,
        deleteItem,
    };
};

