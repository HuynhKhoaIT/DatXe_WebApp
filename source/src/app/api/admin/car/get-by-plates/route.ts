import { getCarsByPlates } from "@/app/libs/prisma/car";
import { NextRequest, NextResponse } from "next/server";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      let garageId = getAuth.garageId ?? "";
      const { searchParams } = new URL(request.url);
      const s: any = searchParams.get("s");
      const cars = await getCarsByPlates(s, garageId);
      return NextResponse.json(cars);
    } else {
      throw new Error("Chua dang nhap");
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
