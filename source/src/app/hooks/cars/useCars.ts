import { QUERY_KEY } from '@/constants';
import { ResponseError } from '@/utils/until/ResponseError';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const fetchCarsList = async (searchParams: any, limit = 10) => {
    const response = await fetch(`/api/client/cars?${searchParams}&limit=${limit}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useCarsList = (limit: 10) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.cars,'client', searchParams.toString(), limit],
        queryFn: () => fetchCarsList(searchParams.toString(), limit),
    });
};

const fetchCarsDetail = async (id: string) => {
    const response = await fetch(`/api/client/cars/${id}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useCarsDetail = (id: any) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.cars,'client', id],
        queryFn: () => fetchCarsDetail(id),
    });
};

export { useCarsList, fetchCarsList, useCarsDetail, fetchCarsDetail };
