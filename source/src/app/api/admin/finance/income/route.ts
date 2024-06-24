import { getFinanceIncome } from "@/app/libs/prisma/financeIncome";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { getSession } from "@/lib/auth";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (session?.user) {
      let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
      // let garageId = 'f49c85ff-f4b2-4b35-a475-c55fcd7dc105';
      const { searchParams } = new URL(request.url);
      const requestData = {
        garageId: garageId,
        startDate: searchParams.get("startDate")
          ? dayjs(searchParams.get("startDate")).endOf("day")
          : dayjs().add(-15, "days").endOf("day"),
        endDate: searchParams.get("endDate")
          ? dayjs(searchParams.get("endDate")).endOf("day")
          : dayjs().endOf("day"),
        limit: searchParams.get("limit"),
        page: searchParams.get("page"),
      };
      const orders = await getFinanceIncome(requestData);

      return NextResponse.json(orders);
    } else {
      throw new Error("Chua dang nhap");
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
