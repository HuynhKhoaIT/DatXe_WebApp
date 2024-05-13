import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { getOrderCategories } from '@/app/libs/prisma/orderCategory';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            let requestData = {
                limit: 10,
                page: 1,
            };
            const categories = await getOrderCategories(requestData);
            return NextResponse.json(categories);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = (await getGarageIdByDLBDID(Number(session.user?.garageId))).toString();
            const orderCategory = await prisma.orderCategory.create({
                data: {
                    title: json.title,
                    garageId: garageId,
                    status: json.status,
                },
            });

            return new NextResponse(JSON.stringify(orderCategory), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
