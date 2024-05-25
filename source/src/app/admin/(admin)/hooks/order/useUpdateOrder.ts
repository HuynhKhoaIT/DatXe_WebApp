'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { getOptionsBrands } from '@/utils/until';
import useFetch from '@/app/hooks/useFetch';
import { toast } from 'react-toastify';
const queryClient = new QueryClient();


const updateOrder = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/orders/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new order', response);
    }
    return await response.json();
};


interface UseOrders {
    updateItem: any;
    brandOptions: any;
    isLoadingBrand: boolean;
    isPendingUpdate:boolean;
}

export const useUpdateOrder = (): UseOrders => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
   

    const { mutate: updateItem,isPending:isPendingUpdate } = useMutation({
        mutationFn: updateOrder,
        onSuccess: () => {
            router.refresh();
         
            toast.success('Cập nhật đơn hàng thành công')

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.orders, searchParams.toString(), 1],
            });
        },
    });

   
    const { data: brandOptions, isLoading: isLoadingBrand } = useFetch({
        queryKey: ['brandOptions'],
        queryFn: () => getOptionsBrands(),
        options: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            refetchInterval: false,
        },
    });
    return {
        updateItem,
        brandOptions,
        isLoadingBrand,
        isPendingUpdate,
    };
};
