'use client';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const addBanner = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/slide-banner`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new slide-banner', response);
    }
    return await response.json();
};

const updateBanner = async (values: any): Promise<any> => {
    const response = await fetch(`/api/admin/slide-banner/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new slide-banner', response);
    }
    return await response.json();
};

interface UseBanner {
    addItem: any;
    updateItem: any;
}

export const useAddBanner = (): UseBanner => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addBanner,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm banner thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.banner, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateBanner,
        onSuccess: () => {
            router.back();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật banner thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.banner, searchParams.toString(), 1],
            });
        },
    });

    return {
        addItem,
        updateItem,
    };
};
