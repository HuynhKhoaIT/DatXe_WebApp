import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { getProductById } from '@/app/libs/prisma/product';
import { findPost, updatePost } from '@/app/libs/prisma/post';
import convertToSlug from '@/utils/until';

export async function GET(request: NextRequest, { params }: { params: { uuId: string } }) {
    try {
        const uuId = params.uuId;

        if (!uuId) {
            return new NextResponse("Missing 'uuId' parameter");
        }
        const session = await getServerSession(authOptions);
        if (session) {
            const post = await findPost(uuId);
            return NextResponse.json({ data: post });
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { uuId: string } }) {
    try {
        const session = await getServerSession(authOptions);

        
        if (session && session.user?.role == 'ADMINGARAGE') {
            const json = await request.json();
            const uuId = params.uuId;
            const postData = await findPost(uuId);
            
            if(json.title){
                postData.title = json.title;
            }
            postData.slug = convertToSlug(postData.title)

            if(json.description){
                postData.description = json.description
            }
            if(json.shortDescription){
                postData.shortDescription = json.shortDescription
            }
            if(json.thumbnail){
                postData.thumbnail = json.thumbnail
            }
            if(json.status){
                postData.status = json.status
            }
            if(json.createdBy){
                postData.createdBy = session.user.id
            }
            const rs = await updatePost(postData);

            return new NextResponse(JSON.stringify(rs), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { uuId: string } }) {
    const uuId = params.uuId;
    if (!uuId) {
        return new NextResponse("Missing 'uuId' parameter");
    }
    const postData = await findPost(uuId);
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
