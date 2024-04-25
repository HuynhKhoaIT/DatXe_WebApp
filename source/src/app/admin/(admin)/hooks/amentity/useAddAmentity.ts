'use client';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const addAmentity = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/amentity`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new amentity', response);
    }
    return await response.json();
};

const updateAmentity = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/amentity/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new amentity', response);
    }
    return await response.json();
};

interface UseAmentity {
    addItem: any;
    updateItem: any;
}

export const useAddAmentity = (): UseAmentity => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addAmentity,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm tiện ích thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.amenities, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateAmentity,
        onSuccess: () => {
            router.back();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật tiện ích thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.amenities, searchParams.toString(), 1],
            });
        },
    });

    return {
        addItem,
        updateItem,
    };
};
