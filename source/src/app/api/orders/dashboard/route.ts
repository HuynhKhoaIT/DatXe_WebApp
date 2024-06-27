import { NextResponse } from "next/server";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { reportTrafictDashboard } from "@/app/libs/prisma/order";
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
        searchParams.get("dateStart")!,
        searchParams.get("dateEnd")!,
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
