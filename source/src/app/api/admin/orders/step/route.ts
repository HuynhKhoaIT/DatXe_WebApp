import { updateOrderStep } from '@/app/libs/prisma/order';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { sendNotificationUntil } from '@/utils/notification';
import { getFirebaseTokenByPhone } from '@/app/libs/prisma/firebaseToken';

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const session = await getServerSession(authOptions);
        if (session) {
            const orderId = json.id;
            const orderStep = json.step;
            const cancelReason = json.cancelReason;
            const order = await updateOrderStep(orderId, orderStep, cancelReason);
            const fbToken = await getFirebaseTokenByPhone(order.customer.phoneNumber);
            if(fbToken?.token){
                await sendNotificationUntil({
                    title: `Đơn hàng được cập nhật ${order.code}`,
                    body: "Đơn hàng được cập nhật",
                    userId: fbToken.userId,
                    to: fbToken?.token,
                    kind: 1,
                    data:JSON.stringify({
                        id: order.id
                    })
                });
            }
            
            return new NextResponse(JSON.stringify(order), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}
