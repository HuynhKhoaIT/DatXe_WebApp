import { getGarages, showGarage } from "@/app/libs/prisma/garage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('apiToken');
        if (!token) {
            return new NextResponse("Missing 'apiToken' parameter");
        }
        let page = 1;
        let limit = 10;
        if (searchParams.get('page')) {
            page = Number(searchParams.get('page'));
        }
        if (searchParams.get('limit')) {
            limit = Number(searchParams.get('limit'));
        }
        const requestData = {
            s: searchParams.get('s'),
            take: limit,
            page: page,
            includes: searchParams.get('includes')
        };
        const data = await getGarages(requestData);
        return NextResponse.json(data)
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}