import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getProductByUuID } from '@/app/libs/prisma/product';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const now = new Date();
        const id = params.id;

        const product = await getProductById(id);
        return NextResponse.json({ data: product });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

