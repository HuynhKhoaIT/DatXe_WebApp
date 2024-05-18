import { createNotification, getNotications } from '@/app/libs/prisma/notification';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';


export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        
        if (1) {
            const { searchParams } = new URL(request.url);
            const requestData = {
                // userId: session?.user?.id,
                userId: 2103,
                limit: searchParams.get('limit'),
                page: searchParams.get('page'),
            };
            const noti = await getNotications(requestData)
            return NextResponse.json(noti)
        }
        return NextResponse.json([])
        
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request: Request) {
    const json = await request.json();
    const notiRs = await createNotification({
        title: json.title,
        content: json.content,
        icon: json.icon,
        image: json.image,
        action: json.action,
        data: json.data,
        kind: json.kind,
        userId: json.userId,
        customerId:json.customerId
    });
    return NextResponse.json(notiRs)
}