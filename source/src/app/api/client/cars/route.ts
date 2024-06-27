import { createCar, getCars } from "@/app/libs/prisma/car";
import { NextRequest, NextResponse } from "next/server";
import { getCustomerByUserId } from "@/app/libs/prisma/customer";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth != null) {
      const { searchParams } = new URL(request.url);
      const requestData = {
        garageId: "2",
        s: searchParams.get("s"),
        carBrandId: searchParams.get("carBrandId"),
        carNameId: searchParams.get("carNameId"),
        carYearId: searchParams.get("carYearId"),
        userId: getAuth.id,
      };
      const cars = await getCars(requestData);

      return NextResponse.json(cars);
    }
    return NextResponse.json({
      data: [],
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth != null) {
      const json = await request.json();
      const customer = await getCustomerByUserId(getAuth.id ?? "");
      json.garageId = process.env.GARAGE_DEFAULT;
      json.userId = getAuth.id?.toString();
      json.customerId = customer?.id;
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
