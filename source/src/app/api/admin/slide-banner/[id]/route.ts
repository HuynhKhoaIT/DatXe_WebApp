
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { deleteSlideBanner, findSlideBanner, updateSlideBanner } from '@/app/libs/prisma/slideBanner';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const session = await getServerSession(authOptions);
        if (session) {
            const post = await findSlideBanner(id);
            return NextResponse.json({ data: post });
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (session && session.user?.role == 'ADMINGARAGE') {
            const data = await request.json();
            const id = params.id; 
            data.createdBy = session.user.id.toString()
            const rs = await updateSlideBanner(id,data);
            return new NextResponse(JSON.stringify(rs), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    if (!id) {
        return new NextResponse("Missing 'id' parameter");
    }
    const postData = await deleteSlideBanner(id);

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
