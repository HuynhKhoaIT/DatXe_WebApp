import { getGarages } from "@/app/libs/prisma/garage";
import { checkAuthToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const getAuth = await checkAuthToken(request);
        if(getAuth!=null && getAuth.role == 'ADMINGARAGE'){
            const { searchParams } = new URL(request.url);
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
        }
        return NextResponse.json({
            status: "error",
            message: "Bearer token not defined"
        })
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}