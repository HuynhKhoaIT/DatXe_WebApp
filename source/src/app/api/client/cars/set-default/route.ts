import { setCarDefault } from "@/app/libs/prisma/car";
import { NextRequest, NextResponse } from "next/server";
import { checkAuthToken } from "@/utils/auth";

export async function POST(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth != null) {
      const json = await request.json();
      const car = await setCarDefault(json.uuId);
      return new NextResponse(JSON.stringify(car), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
