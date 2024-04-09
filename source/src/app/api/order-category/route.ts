import { getOrderCategories } from '@/app/libs/prisma/orderCategory';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const requestData = {
            s: searchParams.get('s'),
            take: searchParams.get("take"),
            page: searchParams.get("page"),
            garageId: searchParams.get('garageId')
        };
        const brands = await getOrderCategories(requestData);
        return NextResponse.json(brands);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
