import { createReviewGarage } from "@/app/libs/prisma/reviewGarage";
import { checkAuthToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const getAuth = await checkAuthToken(request);
    if (getAuth != null) {
      json.createdId = getAuth?.id;
      const review = await createReviewGarage(json);
      return NextResponse.json({
        data: review,
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
