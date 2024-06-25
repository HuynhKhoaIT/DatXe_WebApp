import { getFinanceIncome } from "@/app/libs/prisma/financeIncome";
import { checkAuthToken } from "@/utils/auth";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      let garageId = getAuth?.garageId;
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
