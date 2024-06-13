import { createOrder, createOrderClient, getOrders } from '@/app/libs/prisma/order';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { sendSMSOrder } from '@/utils/order';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { authOptions } from '../auth/[...nextauth]/route';
import { sendNotificationAdminOrderUntil } from '@/utils/notification';
import { checkAuthToken } from '@/utils/auth';

export async function GET(request: NextRequest) {
    try {
        const getAuth = await checkAuthToken(request);
        if(getAuth!=null){
            const { searchParams } = new URL(request.url);
            let page = 1;
            let limit = 10;
            if (searchParams.get('page')) {
                page = Number(searchParams.get('page'));
            }
            if (searchParams.get('limit')) {
                limit = Number(searchParams.get('limit'));
            }
            const requestData = {
                s: searchParams.get('s'),
                step: searchParams.get('step'),
                method: searchParams.get('method'),
                createdById: searchParams.get('user'),
                customerId: searchParams.get('customerId'),
                carId: searchParams.get('carId'),
                limit: limit,
                page: page,
                phoneNumber: getAuth.phoneNumber
            };
            
            const orders = await getOrders("", requestData);
            return NextResponse.json(orders);
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
            if(!json.garageId){
                json.garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            }
            json.createdById = session.user?.id.toString()
            const order = await createOrderClient(json);
            const nt = await sendNotificationAdminOrderUntil(order);
            return new NextResponse(JSON.stringify(order), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
