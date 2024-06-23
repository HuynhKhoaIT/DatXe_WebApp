import { NextRequest, NextResponse } from "next/server";
import { syncCategoryFromDlbd } from "@/app/libs/prisma/category";
import { checkAuthToken } from "@/utils/auth";

export async function POST(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    const cats = await request.json();
    if (getAuth) {
      const garageId = getAuth?.garageId;
      if (garageId) {
        const rs = await syncCategoryFromDlbd(cats, garageId);
        return NextResponse.json(rs);
      }
      return NextResponse.json(cats);
    }
    return NextResponse.json(getAuth?.garageId, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
