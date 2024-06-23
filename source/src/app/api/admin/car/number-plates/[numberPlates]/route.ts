import { createCar, getCars } from "@/app/libs/prisma/car";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { authOptions } from "../../../../auth/[...nextauth]/route";
import { getSession } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { numberPlates: number } }
) {
  try {
    const numberPlates = params.numberPlates;
    const session = await getSession();
    if (session?.user) {
      let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
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
