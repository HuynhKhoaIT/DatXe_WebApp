import { NextResponse } from "next/server";
import { createCarModel, getCarModels } from "@/app/libs/prisma/carModel";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let page = 1;
    let limit = 10;
    if (searchParams.get("page")) {
      page = Number(searchParams.get("page"));
    }
    if (searchParams.get("limit")) {
      limit = Number(searchParams.get("limit"));
    }
    const requestData = {
      s: searchParams.get("s"),
      page: page,
      take: limit,
    };
    const brands = await getCarModels(requestData);
    return NextResponse.json(brands);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const session = await getSession();
    if (session) {
      const carModel = await createCarModel(json);
      return NextResponse.json({
        data: carModel,
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
