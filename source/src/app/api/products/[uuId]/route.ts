import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getProductByUuID } from '@/app/libs/prisma/product';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';

export async function GET(request: NextRequest, { params }: { params: { uuId: string } }) {
    try {
        const now = new Date();
        const uuId = params.uuId;

        const product = await getProductByUuID(uuId);
        return NextResponse.json({ data: product });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

