import { autoComplete } from "@/app/libs/prisma/garage";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (1) {
      const { searchParams } = new URL(request.url);
      const garages = await autoComplete({
        s: searchParams.get("s"),
      });
      return NextResponse.json(garages);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
