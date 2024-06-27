import prisma from "@/app/libs/prismadb";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const session = await getSession();
    if (session) {
      let garageId = process.env.GARAGE_DEFAULT;
      const customer = await prisma.customer.create({
        data: {
          fullName: json.fullName,
          phoneNumber: json.phoneNumber,
          garageId: garageId?.toString(),
          status: "PUBLIC",
        },
      });

      return new NextResponse(JSON.stringify(customer), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
