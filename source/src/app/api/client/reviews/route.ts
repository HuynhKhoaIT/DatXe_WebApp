import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { createReviewProduct } from "@/app/libs/prisma/reviewProduct";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: Request) {
  try {
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const getAuth = await checkAuthToken(request);
    if (getAuth != null) {
      json.createdId = getAuth.id.toString();
      const review = await createReviewProduct(json);
      return NextResponse.json({
        data: review,
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
