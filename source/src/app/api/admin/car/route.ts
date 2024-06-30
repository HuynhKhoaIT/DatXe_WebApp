import { createCar, getCars } from "@/app/libs/prisma/car";
import { NextRequest, NextResponse } from "next/server";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      let garageId = getAuth?.garageId;

      const { searchParams } = new URL(request.url);
      const requestData = {
        garageId: garageId,
        s: searchParams.get("s"),
        customerId: searchParams.get("customerId"),
        carBrandId: searchParams.get("carBrandId"),
        carNameId: searchParams.get("carNameId"),
        carYearId: searchParams.get("carYearId"),
        limit: searchParams.get("limit"),
        page: searchParams.get("page"),
      };
      const cars = await getCars(requestData);

      return NextResponse.json(cars);
    } else {
      throw new Error("Chua dang nhap");
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      const json = await request.json();
      let garageId = getAuth?.garageId;
      json.garageId = garageId;
      json.userId = getAuth?.id;
      const car = await createCar(json);
      return new NextResponse(JSON.stringify(car), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
