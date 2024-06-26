import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { createReviewGarage } from "@/app/libs/prisma/reviewGarage";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const session = await getSession();
    if (session) {
      json.createdId = session.user?.id;
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
