import { getReviewOfCustomer, getReviewsGarage } from "@/app/libs/prisma/reviewGarage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const { searchParams } = new URL(request.url);
        let page = 1;
        let limit = 10;
        if (searchParams.get('page')) {
            page = Number(searchParams.get('page'));
        }
        if (searchParams.get('limit')) {
            limit = Number(searchParams.get('limit'));
        }
        const data = await getReviewsGarage(id,{
            page: page,
            limit: limit,
            userId: searchParams.get('userId')
        });
        return NextResponse.json(data);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const json = await request.json();
        return await getReviewOfCustomer(json.userId,id);
    }catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}