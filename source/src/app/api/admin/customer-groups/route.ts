import prisma from "@/app/libs/prismadb";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    const { searchParams } = new URL(request.url);
    let garageId = {};
    if (searchParams.get("garage")) {
      garageId = Number(searchParams.get("garage"));
    }
    const customerGroup = await prisma.customerGroup.findMany({
      where: {
        AND: [
          {
            status: {
              not: "DELETE",
            },
            garageId,
          },
        ],
      },
    });
    return NextResponse.json(customerGroup);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const customerGroup = await prisma.customerGroup.create({
      data: {
        title: json.title,
        description: json.description,
        garageId: json.garageId,
        status: json.status,
      },
    });

    return new NextResponse(JSON.stringify(customerGroup), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
