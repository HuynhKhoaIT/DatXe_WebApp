import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { reportTrafictDashboard } from "@/app/libs/prisma/order";
import dayjs from "dayjs";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (session) {
      const { searchParams } = new URL(request.url);
      const garageId = (
        await getGarageIdByDLBDID(Number(session.user?.garageId))
      ).toString();
      // return NextResponse.json({ garageId: garageId });
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
