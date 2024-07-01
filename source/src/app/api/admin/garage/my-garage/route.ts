import { showGarage } from "@/app/libs/prisma/garage";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = await checkAuthToken(request);
    if (auth) {
      let garageId = auth.garageId ?? "";
      const garages = await showGarage(garageId);
      return NextResponse.json(garages);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
