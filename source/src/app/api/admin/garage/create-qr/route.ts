import { createQrGarage } from "@/app/libs/prisma/garage";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (session?.user) {
      const json = await request.json();
      const garage = await createQrGarage(json.garageId);
      return NextResponse.json(garage);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
