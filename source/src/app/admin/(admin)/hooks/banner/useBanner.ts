'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const fetchBanner = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/admin/slide-banner?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch categories', response);
    }
    return await response.json();
};

const deleteBanner = async (id: string): Promise<any> => {
    const response = await fetch(`/api/admin/slide-banner/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete slide-banner', response);
    }
    return await response.json();
};

interface UseBanner {
    banner: any;
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

export const useBanner = (): UseBanner => {
    const queryClient = useQueryClient();

    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);

    const {
        data: banner = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.banner, searchParams.toString(), page],
        queryFn: () => fetchBanner(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });

    useEffect(() => {
        if (!isPlaceholderData && page < banner?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.banner, searchParams.toString(), page + 1],
                queryFn: () => fetchBanner(searchParams.toString(), page + 1),
            });
        } else if (!isPlaceholderData && searchParams.toString()) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.banner, searchParams.toString(), page],
                queryFn: () => fetchBanner(searchParams.toString(), page),
            });
        }
    }, [banner, searchParams, isPlaceholderData, page, queryClient]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteBanner,
        onSuccess: () => {
            notifications.show({
                title: 'Thành công',
                message: 'Xoá banner thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.banner, searchParams.toString(), page],
            });
        },
    });

    return {
        banner,
        isLoading,
        isFetching,
        error: mapError(error),
        page,
        setPage,
        deleteItem,
    };
};
