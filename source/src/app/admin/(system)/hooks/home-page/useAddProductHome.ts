'use client';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ResponseError } from '@/utils/until/ResponseError';
import { QUERY_KEY } from '@/constants';
import { useRouter, useSearchParams } from 'next/navigation';
import { notifications } from '@mantine/notifications';
const queryClient = new QueryClient();

const addProduct = async (values: any): Promise<any> => {

    const response = await fetch(`/api/admin/home-page`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        throw new ResponseError('Failed to insert new product', response);
    }
    return await response.json();
};


interface UseProduct {
    addItem: any;
    isPending:boolean;
}

export const useAddProductHome = (): UseProduct => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const { mutate: addItem,isPending } = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            router.back();
            notifications.show({
                title: 'Thành công',
                message: 'Thêm sản phẩm thành công',
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.productHome, searchParams.toString(), 1],
            });
        },
    });

   


    return {
        addItem,isPending
    };
};
