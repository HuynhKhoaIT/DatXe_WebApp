import { getGarageByDlbdId } from "@/app/libs/prisma/garage";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (session?.user) {
      let garageId = Number(session.user?.garageId);
      const garages = await getGarageByDlbdId(garageId);

      return NextResponse.json(garages);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
