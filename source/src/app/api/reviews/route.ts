import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { createReviewProduct } from '@/app/libs/prisma/reviewProduct';

export async function GET(request: Request) {
    try {
        return NextResponse.json({})
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

