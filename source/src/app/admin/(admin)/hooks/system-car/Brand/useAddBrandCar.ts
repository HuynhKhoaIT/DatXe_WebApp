'use client';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { toast } from 'react-toastify';
const queryClient = new QueryClient();

const addBrandCar = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/car-model`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new category', response);
    }
    return await response.json();
};

const updateBrandCar = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/car-model/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new category', response);
    }
    return await response.json();
};

interface UseCategory {
    addItem: any;
    updateItem: any;
}

export const useAddBrand = (): UseCategory => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addBrandCar,
        onSuccess: () => {
            router.back();
        
            toast.success('Thêm hãng xe thành công')

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.brandCar, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateBrandCar,
        onSuccess: () => {
            router.back();
            toast.success('Cập nhật hãng xe thành công')
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.brandCar, searchParams.toString(), 1],
            });
        },
    });

    return {
        addItem,
        updateItem,
    };
};
