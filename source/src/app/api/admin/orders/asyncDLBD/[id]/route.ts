import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { asyncToDLDB, findOrder } from "@/app/libs/prisma/order";
import { POST_ASYNC_ORDER_DLBD_ENDPOINT } from "@/utils/constants/endpoints";
import axios from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const session = await getServerSession(authOptions);
        if (session) {
            const id = params.id;
            const order = await findOrder(id,{});
            const { data } = await axios({
                method: "POST",
                url: `https://v2.dlbd.vn/api/v3/app/order/sync-datxe`,
                data: JSON.stringify(order),
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${session.user?.token}`,
                }
            });
            const rs = await asyncToDLDB(id,data.id);
            return NextResponse.json(data);
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}