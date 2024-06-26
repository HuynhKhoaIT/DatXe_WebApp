import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let garageId = {};
    if (searchParams.get("garage")) {
      garageId = Number(searchParams.get("garage"));
    }
    const carStyle = await prisma.carStyle.findMany({
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
    return NextResponse.json(carStyle);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const carStyle = await prisma.carStyle.create({
      data: {
        name: json.name,
        description: json.description,
        garageId: json.garageId,
        status: json.status,
      },
    });

    return new NextResponse(JSON.stringify(carStyle), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
