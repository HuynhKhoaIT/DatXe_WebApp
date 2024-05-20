import { showNotification } from '@/app/libs/prisma/notification';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { searchParams } = new URL(request.url);
        const id = params.id;
        const noti = await showNotification(id);
        return NextResponse.json(noti);
    } catch (error:any) {
        return new NextResponse(error.message, { status: 500 });
    }
}