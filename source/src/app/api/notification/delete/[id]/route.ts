import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { deletedNotification } from '@/app/libs/prisma/notification';
import { getServerSession } from 'next-auth';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { searchParams } = new URL(request.url);
        const id = params.id;
        const session = await getServerSession(authOptions);
        if(session){
            const noti = await deletedNotification(id);
            return NextResponse.json(noti)
        }
        return NextResponse.json({});
    } catch (error:any) {
        return new NextResponse(error.message, { status: 500 });
    }
}