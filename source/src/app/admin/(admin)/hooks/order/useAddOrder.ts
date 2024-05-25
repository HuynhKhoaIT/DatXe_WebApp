'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { getOptionsBrands } from '@/utils/until';
import useFetch from '@/app/hooks/useFetch';
import { toast } from 'react-toastify';
const queryClient = new QueryClient();

const addOrder = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/orders`, {
        method: 'POST',
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
const handleDbDLBD = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/orders/asyncDLBD`, {
        method: 'POST',
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

const updateStepOrder = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/orders/step`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: values?.id, step: values?.step, cancelReason: values?.cancelReason }),
    });

    if (!response.ok) {
        throw new ResponseError('Failed to update step order', response);
    }
    return await response.json();
};

interface UseOrders {
    addItem: any;
    updateItem: any;
    updateStep: any;
    brandOptions: any;
    dbDLBD:any;
    isLoadingBrand: boolean;
    isPendingAdd:boolean;
    isPendingUpdate:boolean;
    isPendingUpdateStep:boolean;
    isPendingDlbd:boolean;
    isSuccessAdd:boolean;
}

export const useAddOrder = ({isBack=true,...prop}:any): UseOrders => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem,isPending:isPendingAdd ,isSuccess:isSuccessAdd } = useMutation({
        mutationFn: addOrder,
        onSuccess: () => {
            if(!isBack){
                router.refresh();
            }
            else{
                router.push('/admin/order-manager');
            }
            toast.success('Thêm đơn hàng thành công')

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.orders, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: dbDLBD,isPending:isPendingDlbd } = useMutation({
        mutationFn: handleDbDLBD,
        onSuccess: () => {
            router.push('/admin/order-manager');
            toast.success('Đơn hàng lên sàn thành công')

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.orders, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem,isPending:isPendingUpdate } = useMutation({
        mutationFn: updateOrder,
        onSuccess: () => {
            if(!isBack){
                router.refresh();
                prop.onClose();
            }
            else{
                router.back();
            }

          
            toast.success('Cập nhật đơn hàng thành công')

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.orders, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateStep,isPending:isPendingUpdateStep } = useMutation({
        mutationFn: updateStepOrder,
        onSuccess: () => {
            router.back();
            toast.success('Cập nhật trạng thái thành công')

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
        addItem,
        updateItem,
        updateStep,
        brandOptions,
        isLoadingBrand,
        isPendingAdd,
        isPendingUpdate,
        isPendingUpdateStep,
        dbDLBD,
        isPendingDlbd,
        isSuccessAdd
    };
};
