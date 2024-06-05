import { create, gets } from "@/app/libs/prisma/bookingTTDK";
import { checkAuthToken } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth != null && getAuth.role == "ADMINGARAGE") {
      const { searchParams } = new URL(request.url);
      const requestData = {
        garageId: getAuth?.garageId,
        s: searchParams.get("s"),
        limit: searchParams.get("limit"),
        page: searchParams.get("page"),
      };
      const order = await gets(requestData);
      return NextResponse.json(order);
    }
    return NextResponse.json({
      status: "error",
      message: "Bearer token not defined",
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // const json = await request.json();
    // const dataInput = {
    //     licensePlates: json.licensePlates,
    //     phone: json.phone,
    //     fullname: json.fullname,
    //     dateSchedule: json.dateSchedule,
    //     time: json.time,
    //     garageId: json.garageId,
    //     note: json.note,
    // }
    // const order = await create(dataInput);
    // return new NextResponse(JSON.stringify(order), {
    //     status: 201,
    //     headers: { 'Content-Type': 'application/json' },
    // });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
