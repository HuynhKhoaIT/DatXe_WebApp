import { NextRequest, NextResponse } from "next/server";
import { reportTrafictDashboard } from "@/app/libs/prisma/order";
import dayjs from "dayjs";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      const { searchParams } = new URL(request.url);
      const garageId = getAuth?.garageId;
      const rs = await reportTrafictDashboard(
        searchParams.get("dateStart")
          ? dayjs(searchParams.get("dateStart")).endOf("day").toString()
          : dayjs().add(-15, "days").endOf("day").toString(),
        searchParams.get("dateEnd")
          ? dayjs(searchParams.get("dateEnd")).endOf("day").toString()
          : dayjs().endOf("day").toString(),
        garageId
      );
      return NextResponse.json(rs);
    } else {
      throw new Error("Chua dang nhap");
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
