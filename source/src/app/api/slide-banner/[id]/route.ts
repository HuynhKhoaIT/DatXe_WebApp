
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { deleteSlideBanner, findSlideBanner, updateSlideBanner } from '@/app/libs/prisma/slideBanner';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const post = await findSlideBanner(id);
        return NextResponse.json({ data: post });
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}