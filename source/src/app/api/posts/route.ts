import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { createPost, getPosts } from '@/app/libs/prisma/post';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        let page = 1;
        const garageId = searchParams.get('garageId');
        if (searchParams.get('page')) {
            page = Number(searchParams.get('page'));
        }
        const requestData = {
            s: searchParams.get('s'),
            limit: searchParams.get('limit')||10,
            take: 10,
            page: page,
            garageId,
            status: 'PUBLIC',
        };
        const cars = await getPosts(requestData);

            return NextResponse.json(cars);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
