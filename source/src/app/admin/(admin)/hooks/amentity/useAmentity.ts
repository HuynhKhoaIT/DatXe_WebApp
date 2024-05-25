'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
const queryClient = new QueryClient();

const fetchAmentity = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/admin/amentity?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch categories', response);
    }
    return await response.json();
};

const deleteAmentity = async (id: string): Promise<any> => {
    const response = await fetch(`/api/admin/amentity/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete amentity', response);
    }
    return await response.json();
};

interface UseAmenitites {
    amenities: any;
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

export const useAmenitites = (): UseAmenitites => {
    const queryClient = useQueryClient();

    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);

    const {
        data: amenities = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.amenities, searchParams.toString(), page],
        queryFn: () => fetchAmentity(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });

    useEffect(() => {
        if (!isPlaceholderData && page < amenities?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.amenities, searchParams.toString(), page + 1],
                queryFn: () => fetchAmentity(searchParams.toString(), page + 1),
            });
        } else if (!isPlaceholderData && searchParams.toString()) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.amenities, searchParams.toString(), page],
                queryFn: () => fetchAmentity(searchParams.toString(), page),
            });
        }
    }, [amenities, searchParams, isPlaceholderData, page, queryClient]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteAmentity,
        onSuccess: () => {
            toast.success('Xoá tiện ích thành công');

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.amenities, searchParams.toString(), page],
            });
        },
    });

    return {
        amenities,
        isLoading,
        isFetching,
        error: mapError(error),
        page,
        setPage,
        deleteItem,
    };
};
