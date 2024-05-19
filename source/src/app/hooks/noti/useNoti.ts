import { QUERY_KEY } from '@/constants';
import { ResponseError } from '@/utils/until/ResponseError';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const fetchNotiList = async (searchParams: any, limit = 10) => {
    let url = `/api/notification?${searchParams}&limit=${limit}`
    const response = await fetch(url);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useNotiList = ({limit = 10}: any) => {
    const searchParams = useSearchParams();
    return useQuery({
        queryKey: [QUERY_KEY.notiList, searchParams.toString(), limit],
        queryFn: () => fetchNotiList(searchParams.toString(), limit),
    });
};

const fetchNotiDetail = async (id: string) => {
    const response = await fetch(`/api/notification/${id}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useNotiDetail = (id: any) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.notiList, id],
        queryFn: () => fetchNotiDetail(id),
    });
};

export { useNotiList, fetchNotiList, useNotiDetail, fetchNotiDetail };
