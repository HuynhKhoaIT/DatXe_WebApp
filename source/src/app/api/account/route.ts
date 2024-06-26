import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuthToken } from '@/utils/auth';

export async function GET(request: NextRequest) {
    try {
        const getAuth = await checkAuthToken(request);
        if(getAuth!=null){
            return NextResponse.json({
                "statusCode": 200,
                "error": null,
                "message": "Success",
                'data': getAuth
            });
        }return NextResponse.json({
            "statusCode": 404,
            "error": '404',
            "message": "error",
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}