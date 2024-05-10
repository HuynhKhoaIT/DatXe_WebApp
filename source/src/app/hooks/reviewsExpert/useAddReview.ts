'use client';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const addReview = async (values: any): Promise<any> => {
    const response = await fetch(`/api/client/reviews/garage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new review Expert', response);
    }
    return await response.json();
};

const updateReview = async (values: any): Promise<any> => {
    
    const response = await fetch(`/api/client/reviews/garage/${values?.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new review Expert', response);
    }
    return await response.json();
};

interface UseReview {
    addItem: any;
    updateItem: any;
}

export const useAddReview = (): UseReview => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem } = useMutation({
        mutationFn: addReview,
        onSuccess: () => {
            router.refresh();

            notifications.show({
                title: 'Thành công',
                message: 'Gửi đánh giá thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.reviewsExpert, searchParams.toString(), 1],
            });
        },
    });

    const { mutate: updateItem } = useMutation({
        mutationFn: updateReview,
        onSuccess: () => {
            router.refresh();

            notifications.show({
                title: 'Thành công',
                message: 'Cập nhật đánh giá thành công',
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.reviewsExpert, searchParams.toString(), 1],
            });
        },
    });

    return {
        addItem,
        updateItem,
    };
};
