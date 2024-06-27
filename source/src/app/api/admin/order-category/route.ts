import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { getOrderCategories } from "@/app/libs/prisma/orderCategory";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (session) {
      let requestData = {
        limit: 10,
        page: 1,
      };
      const categories = await getOrderCategories(requestData);
      return NextResponse.json(categories);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const json = await request.json();
    const session = await getSession();
    if (session) {
      let garageId = (
        await getGarageIdByDLBDID(Number(session.user?.garageId))
      ).toString();
      const orderCategory = await prisma.orderCategory.create({
        data: {
          title: json.title,
          garageId: garageId,
          status: json.status,
        },
      });

      return new NextResponse(JSON.stringify(orderCategory), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
