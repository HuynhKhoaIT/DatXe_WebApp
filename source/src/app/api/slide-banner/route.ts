import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { createSlideBanner, getSlideBanners } from '@/app/libs/prisma/slideBanner';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        let garageId = "2";
        const requestData = {
            s: searchParams.get('s'),
            garageId: garageId
        }
        const slideBanners = await getSlideBanners(requestData);
        return NextResponse.json(slideBanners);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

