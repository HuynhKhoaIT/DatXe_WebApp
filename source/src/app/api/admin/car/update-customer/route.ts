import { updateCustomerAndCar } from "@/app/libs/prisma/car";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (session?.user) {
      const json = await request.json();
      let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
      json.garageId = garageId;
      json.userId = session?.user?.id.toString();
      const car = await updateCustomerAndCar(json);
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
