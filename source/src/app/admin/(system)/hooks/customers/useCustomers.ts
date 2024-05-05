'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { QUERY_KEY } from '@/constants';
import { useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const fetchCustomers = async (searchParams: any, page: number): Promise<any> => {
    const response = await fetch(`/api/admin/customer?${searchParams}&page=${page}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch customers', response);
    }
    return await response.json();
};

const deleteCustomer = async (id: string): Promise<any> => {
    const response = await fetch(`/api/admin/customer/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to delete customer', response);
    }
    return await response.json();
};

interface useCustomers {
    customers: any;
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
    return 'Unknown error';
}

export const useCustomers = (): useCustomers => {
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const [page, setPage] = useState<number>(1);

    const [activeTab, setActiveTab] = useState<string | null>('first');

    const {
        data: customers = [],
        isLoading,
        isFetching,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEY.customers, searchParams.toString(), page],
        queryFn: () => fetchCustomers(searchParams.toString(), page),
        refetchOnWindowFocus: false,
        retry: 2,
    });
 

    useEffect(() => {
        if ( !isPlaceholderData && page < customers?.totalPage) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.customers, searchParams.toString(), page + 1],
                queryFn: () => fetchCustomers(searchParams.toString(), page + 1),
            });
        } else if ( !isPlaceholderData && searchParams) {
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEY.customers, searchParams.toString(), page],
                queryFn: () => fetchCustomers(searchParams.toString(), page),
            });
        }
    }, [customers, searchParams, isPlaceholderData, page, queryClient]);

    const { mutate: deleteItem } = useMutation({
        mutationFn: deleteCustomer,
        onSuccess: () => {
            notifications.show({
                title: 'Thành công',
                message: 'Xoá khách hàng thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.customers, searchParams.toString(), page],
            });
        },
    });

    return {
        customers,
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
const fetchCustomerDetail = async (id: string) => {
    const response = await fetch(`/api/admin/customer/${id}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch customer', response);
    }
    return await response.json();
};

const useCustomerDetail = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEY.customerDetail, id],
        queryFn: () => fetchCustomerDetail(id),
    });
};

export { useCustomerDetail, fetchCustomerDetail };
