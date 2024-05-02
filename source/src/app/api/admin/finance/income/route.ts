import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getFinanceIncome } from "@/app/libs/prisma/financeIncome";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (session) {
            let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
            // let garageId = 'f49c85ff-f4b2-4b35-a475-c55fcd7dc105';
            const { searchParams } = new URL(request.url);
            const requestData = {
                garageId: garageId,
                startDate: searchParams.get('startDate') ? dayjs(searchParams.get('startDate')).endOf('day') : dayjs().add(-7,'days').endOf('day'),
                endDate: searchParams.get('endDate') ? dayjs(searchParams.get('endDate')).endOf('day') : dayjs().endOf('day'),
                limit: searchParams.get('limit'),
                page: searchParams.get('page'),
            };
            const orders = await getFinanceIncome(requestData);

            return NextResponse.json(orders);
        } else {
            throw new Error('Chua dang nhap');
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}