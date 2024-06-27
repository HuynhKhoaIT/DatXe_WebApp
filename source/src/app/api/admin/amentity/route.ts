import { createAmentity, getAmentity } from "@/app/libs/prisma/amentity";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (session?.user) {
      const { searchParams } = new URL(request.url);
      const requestData = {
        s: searchParams.get("s"),
      };
      const rs = await getAmentity(requestData);
      return NextResponse.json(rs);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (session?.user) {
      const json = await request.json();
      const errors: string[] = [];
      const amentity = await createAmentity(json);
      return NextResponse.json(amentity);
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
