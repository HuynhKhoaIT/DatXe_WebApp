import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { getProductById } from '@/app/libs/prisma/product';
import { findPost, updatePost } from '@/app/libs/prisma/post';
import convertToSlug from '@/utils/until';
import { ROLE_ADMIN, ROLE_EXPERT } from '@/constants';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const session = await getServerSession(authOptions);
        if (session) {
            const post = await findPost(id);
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
        if (session && (session.user?.role == 'ADMINGARAGE' || session.user?.role == ROLE_ADMIN)) {
            const data = await request.json();
            const id = params.id; 
            data.createdBy = session.user.id.toString()
            // return NextResponse.json(data);
            const rs = await updatePost(id,data);
            return new NextResponse(JSON.stringify(rs), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    if (!id) {
        return new NextResponse("Missing 'id' parameter");
    }
    const postData = await findPost(id);
    const post = await prisma.post.update({
        where: {
            id: (postData.id),
        },
        data: {
            status: 'DELETE',
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
