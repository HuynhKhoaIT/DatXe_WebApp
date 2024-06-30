import { createGarage, getGarages } from "@/app/libs/prisma/garage";
import { NextRequest, NextResponse } from "next/server";
import { checkAuthToken } from "@/utils/auth";
import { ROLE_ADMIN } from "@/constants";

export async function GET(request: NextRequest) {
  try {
    const auth = await checkAuthToken(request);

    if (auth) {
      let garageId = auth?.garageId;

      if (auth?.role == ROLE_ADMIN) {
        garageId = "";
      }
      const { searchParams } = new URL(request.url);
      let requestData = {
        limit: 10,
        page: 1,
        garageId: garageId,
        s: searchParams.get("s"),
        status: searchParams.get("status"),
      };
      if (searchParams.get("limit")) {
        requestData.limit = Number(searchParams.get("limit"));
      }
      if (searchParams.get("page")) {
        requestData.page = Number(searchParams.get("page"));
      }
      const garages = await getGarages(requestData);

      return NextResponse.json(garages);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const errors: string[] = [];
    const garage = await createGarage(json);
    return NextResponse.json(garage);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
