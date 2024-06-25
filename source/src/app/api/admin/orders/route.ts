import { createOrder, getOrders } from "@/app/libs/prisma/order";
import { NextRequest, NextResponse } from "next/server";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      let garageId = getAuth?.garageId ?? "";
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
        step: searchParams.get("step"),
        method: searchParams.get("method"),
        createdById: searchParams.get("user"),
        customerId: searchParams.get("customerId"),
        carId: searchParams.get("carId"),
        limit: limit,
        page: page,
        garageId: garageId,
      };
      const orders = await getOrders(garageId, requestData);
      
      return NextResponse.json(orders);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      json.garageId = getAuth?.garageId;
      json.createdById = getAuth?.id;
      const order = await createOrder(json);
      return new NextResponse(JSON.stringify(order), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
