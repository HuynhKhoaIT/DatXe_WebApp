import { getCustomers } from '@/app/libs/prisma/customer';
import prisma from '@/app/libs/prismadb';
import { getProductsFromDLBD } from "@/utils/getProductsFromDLBD";
import { NextRequest, NextResponse } from 'next/server';
import validator from 'validator';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session?.user?.token) {
            const { searchParams } = new URL(request.url);
            let garageId = (await getGarageIdByDLBDID(Number(session.user?.garageId))).toString();
            const dataRequest = {
                page: searchParams.get('page'),
                garageId: garageId
            }
            const products = await getProductsFromDLBD(session.user,dataRequest);
            return NextResponse.json(products);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
