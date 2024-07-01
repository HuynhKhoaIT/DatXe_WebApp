import { createAmentity, getAmentity } from "@/app/libs/prisma/amentity";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = await checkAuthToken(request);
    if (auth) {
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
    const auth = await checkAuthToken(request);
    if (auth) {
      const json = await request.json();
      const errors: string[] = [];
      const amentity = await createAmentity(json);
      return NextResponse.json(amentity);
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
