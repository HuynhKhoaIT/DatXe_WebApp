'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const fetchCars = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/client/cars?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch cars', response);
    }
    return await response.json();
};

const deleteCar = async (id: string): Promise<any> => {
    const response = await fetch(`/api/client/cars${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete car', response);
    }
    return await response.json();
};

interface useCars {
    cars: any;
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

export const useCars = (): useCars => {
    const queryClient = useQueryClient();

    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);

    const {
        data: cars = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.cars,'client', searchParams.toString(), page],
        queryFn: () => fetchCars(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });

    useEffect(() => {
        if ( !isPlaceholderData && page < cars?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.cars,'client', searchParams.toString(), page + 1],
                queryFn: () => fetchCars(searchParams.toString(), page + 1),
            });
        } else if (!isPlaceholderData && searchParams) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.cars,'client', searchParams.toString(), page],
                queryFn: () => fetchCars(searchParams.toString(), page),
            });
        } 
    }, [cars, searchParams, isPlaceholderData, page, queryClient]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteCar,
        onSuccess: () => {
            notifications.show({
                title: 'Thành công',
                message: 'Xoá xe thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.cars,'client', searchParams.toString(), page],
            });
        },
    });

    return {
        cars,
        isLoading,
        isFetching,
        error: mapError(error),
        page,
        setPage,
        deleteItem,
    };
};

// get detail
const fetchCarDetail = async (id: string) => {
    const response = await fetch(`/api/client/cars/${id}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch expert', response);
    }
    return await response.json();
};

const useCarDetail = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.carDetail,'client', id],
        queryFn: () => fetchCarDetail(id),
    });
};

export { useCarDetail, fetchCarDetail };