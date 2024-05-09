import { QUERY_KEY } from '@/constants';
import { ResponseError } from '@/utils/until/ResponseError';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const fetchReviewsList = async (garageId:any,searchParams: any, limit = 10) => {
    const response = await fetch(`/api/reviews/garage/${garageId}?${searchParams}&limit=${limit}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useReviewsList = (garageId:string,limit: 10) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.reviewsExpert,garageId, searchParams.toString(), limit],
        queryFn: () => fetchReviewsList(garageId,searchParams.toString(), limit),
    });
};

const fetchReviewDetail = async (garageId:string,id: string) => {
    const response = await fetch(`/api/reviews/garage/${garageId}/${id}`);
    if (!response.ok) {
        throw new ResponseError('Failed to fetch news', response);
    }
    return await response.json();
};

const useReviewDetail = (garage:string, id: any) => {
    const searchParams = useSearchParams();

    return useQuery({
        queryKey: [QUERY_KEY.reviewsExpert,'client', id],
        queryFn: () => fetchReviewDetail(garage,id),
    });
};

export { useReviewsList, fetchReviewsList, useReviewDetail, fetchReviewDetail };
