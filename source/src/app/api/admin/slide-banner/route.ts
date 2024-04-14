import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { createSlideBanner, getSlideBanners } from '@/app/libs/prisma/slideBanner';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(request.url);
        let garageId = "2";
        if(session){
            garageId = (await getGarageIdByDLBDID(Number(session.user?.garageId))).toString();
            const requestData = {
                s: searchParams.get('s'),
                garageId: garageId
            }
            const slideBanners = getSlideBanners(requestData);
            return NextResponse.json(slideBanners);
        } else {
            throw new Error('Chua dang nhap');
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const serviceAdvisor = await createSlideBanner({json});
        return new NextResponse(JSON.stringify(serviceAdvisor), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
