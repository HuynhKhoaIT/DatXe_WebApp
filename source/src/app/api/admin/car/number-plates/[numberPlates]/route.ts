import { createCar, getCars } from "@/app/libs/prisma/car";
import { NextRequest, NextResponse } from "next/server";
import { checkAuthToken } from "@/utils/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { numberPlates: number } }
) {
  try {
    const numberPlates = params.numberPlates;
    const auth = await checkAuthToken(request);
    if (auth) {
      let garageId = auth?.garageId;
      const requestData = {
        s: numberPlates,
        garageId: garageId,
        status: "PUBLIC",
      };
      const cars = await getCars(requestData);
      if (cars.data[0]) {
        return NextResponse.json({
          data: cars.data[0],
        });
      }

      return NextResponse.json({
        data: null,
      });
    } else {
      throw new Error("Chua dang nhap");
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
