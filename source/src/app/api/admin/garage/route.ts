import {
  createGarage,
  getGarageIdByDLBDID,
  getGarages,
} from "@/app/libs/prisma/garage";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (session?.user) {
      let garageId = session.user?.garageId;

      if (session.user?.role == "ADMIN") {
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
