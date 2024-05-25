'use client';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { toast } from 'react-toastify';
const queryClient = new QueryClient();

const addModelCar = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/car-model`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert model car', response);
    }
    return await response.json();
};

const updateModelCar = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/car-model/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert model car', response);
    }
    return await response.json();
};

interface UseCategory {
    addItem: any;
    updateItem: any;
}

export const useAddModel = (): UseCategory => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addModelCar,
        onSuccess: () => {
            router.back();
           
            toast.success('Thêm dòng xe thành công')
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.modelCar, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateModelCar,
        onSuccess: () => {
            router.back();
            toast.success('Cập nhật dòng xe thành công')

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.modelCar, searchParams.toString(), 1],
            });
        },
    });

    return {
        addItem,
        updateItem,
    };
};
