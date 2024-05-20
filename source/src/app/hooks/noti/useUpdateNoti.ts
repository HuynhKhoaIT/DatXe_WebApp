'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { getOptionsBrands, getOptionsCustomers } from '@/utils/until';
import useFetch from '@/app/hooks/useFetch';
const queryClient = new QueryClient();

const getItem = async (values: any): Promise<any> => {
    const response = await fetch(`/api/notification/${values?.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new ResponseError('Failed to read', response);
    }
    return await response.json();
};

const updateCar = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/car/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to update car', response);
    }
    return await response.json();
};
interface UseCar {
    getDetail: any;
    updateItem: any;
    brandOptions: any;
    customerOptions: any;
    isLoadingBrand: boolean;
    isLoadingCustomer: boolean;
    isPendingUpdate:boolean;
    isPendingRead:boolean;
}

export const useUpdateNoti = (): UseCar => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: getDetail,isPending:isPendingRead  } = useMutation({
        mutationFn: getItem,
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.notiList, searchParams.toString()],
            });
        },
    });

    const { mutate: updateItem,isPending:isPendingUpdate } = useMutation({
        mutationFn: updateCar,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật xe thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.notiList, searchParams.toString(), 1],
            });
        },
    });

    const { data: brandOptions, isLoading: isLoadingBrand } = useFetch({
        queryKey: [QUERY_KEY.optionsBrandCar],
        queryFn: () => getOptionsBrands(),
        options: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            refetchInterval: false,
        },
    });

    const { data: customerOptions, isLoading: isLoadingCustomer } = useFetch({
        queryKey: [QUERY_KEY.optionsCustomer],
        queryFn: () => getOptionsCustomers(),
        // options: {
        //     refetchOnWindowFocus: false,
        //     staleTime: Infinity,
        //     refetchInterval: false,
        // },
    });

    return {
        getDetail,
        updateItem,
        brandOptions,
        isLoadingBrand,
        customerOptions,
        isLoadingCustomer,
        isPendingRead,
        isPendingUpdate
    };
};
