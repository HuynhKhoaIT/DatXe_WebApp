'use client';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const addYearCar = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/car-model`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new year car', response);
    }
    return await response.json();
};

const updateYearCar = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/car-model/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to update year car', response);
    }
    return await response.json();
};

interface UseCategory {
    addItem: any;
    updateItem: any;
}

export const useAddYear = (): UseCategory => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addYearCar,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm năm sản xuất thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.yearCar, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateYearCar,
        onSuccess: () => {
            router.back();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật năm sản xuất thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.yearCar, searchParams.toString(), 1],
            });
        },
    });

    return {
        addItem,
        updateItem,
    };
};
