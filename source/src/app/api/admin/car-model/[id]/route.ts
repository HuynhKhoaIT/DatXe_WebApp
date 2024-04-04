import { removeCarModel, updateCarModel } from '@/app/libs/prisma/carModel';
import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
    try {
        const id = params.id;
        const brands = await prisma.carModels.findMany({
            where: {
                parentId: Number(id),
            },
            orderBy: {
                title: 'asc',
            },
        });
        return NextResponse.json(brands);
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}


export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    const json = await request.json();
    const id = params.id;
    if (!id) {
        return new NextResponse("Missing 'id' parameter");
    }
    const rs = await updateCarModel(id,json);

    return new NextResponse(JSON.stringify(rs), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
    });
}
export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
    const id = params.id;
    if (!id) {
        return new NextResponse("Missing 'id' parameter");
    }

    const rs = await removeCarModel(id);

    return NextResponse.json({ success: 1, message: 'Delete success' });
}

