import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/app/libs/prisma/product';
import { findPost, updatePost } from '@/app/libs/prisma/post';
import convertToSlug from '@/utils/until';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const post = await findPost(id);
        return NextResponse.json({ data: post });
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
