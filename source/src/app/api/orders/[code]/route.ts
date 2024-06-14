import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { getOrderByCode,  } from '@/app/libs/prisma/order';
import { sendSMSOrder } from '@/utils/order';
import { authOptions } from '../../auth/[...nextauth]/route';
import { sendNotificationAdminOrderUntil } from '@/utils/notification';
import { checkAuthToken } from '@/utils/auth';

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
    try {
        const code = params.code;

        if (!code) {
            return new NextResponse("Missing 'code' parameter");
        }
        const getAuth = await checkAuthToken(request);
        if(getAuth!=null){
            const order = await getOrderByCode(code);
            return NextResponse.json(order);
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         const session = await getServerSession(authOptions);
//         if (session) {
//             const id = params.id;
//             let createdBy = 1;
//             let garageId = 1;
//             if (!id) {
//                 return new NextResponse("Missing 'id' parameter");
//             }
//             const json = await request.json();

//             if (session?.user?.id) {
//                 createdBy = Number(session.user.id);
//                 garageId = Number(session.user.garageId);
//             }
//             const updatedOrder = await updateOrder(id, json);
//             const nt = await sendNotificationAdminOrderUntil(updatedOrder);
//             return new NextResponse(JSON.stringify(updatedOrder), {
//                 status: 201,
//                 headers: { 'Content-Type': 'application/json' },
//             });
//         }
//     } catch (error: any) {
//         return new NextResponse(error.message, { status: 500 });
//     }
// }

// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//     const id = params.id;
//     if (!id) {
//         return new NextResponse("Missing 'id' parameter");
//     }

//     const order = await prisma.order.update({
//         where: {
//             id: (id.toString()),
//         },
//         data: {
//             status: 'DELETE',
//         },
//     });

//     return NextResponse.json({ success: 1, message: 'Delete success' });
// }
