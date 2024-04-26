import { QUERY_KEY } from '@/constants';
import { ResponseError } from '@/utils/until/ResponseError';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const fetchNewsList = async (garageId:any,searchParams: any, limit = 10) => {
    let url;
    if(garageId){
         url = `/api/posts?${searchParams}&limit=${limit}&garageId=${garageId}`
    }else{
        url = `/api/posts?${searchParams}&limit=${limit}`

    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useNewsList = ({garageId,limit}: any) => {
    const searchParams = useSearchParams();


    return useQuery({
        queryKey: [QUERY_KEY.news, searchParams.toString(), limit],
        queryFn: () => fetchNewsList(garageId,searchParams.toString(), limit),
    });
};

const fetchNewsDetail = async (id: string) => {
    const response = await fetch(`/api/posts/${id}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useNewsDetail = (id: any) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.news, id],
        queryFn: () => fetchNewsDetail(id),
    });
};

export { useNewsList, fetchNewsList, useNewsDetail, fetchNewsDetail };
