import { showGarage } from "@/app/libs/prisma/garage";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session: any = await getSession();
    if (session?.user) {
      let garageId = session.user?.garageId;
      const garages = await showGarage(garageId);
      return NextResponse.json(garages);
    }
    throw new Error("Chua dang nhap");
  } catch (error:any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
