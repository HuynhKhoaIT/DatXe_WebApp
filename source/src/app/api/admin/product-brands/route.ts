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
    const productBrand = await prisma.productBrand.findMany({
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
    return NextResponse.json(productBrand);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    let garageId = process.env.GARAGE_DEFAULT;
    if (json.garageId) {
      garageId = json.garageId;
    }
    const productBrand = await prisma.productBrand.create({
      data: {
        name: json.name,
        description: json.description,
        garageId: garageId,
        status: json.status,
      },
    });

    return new NextResponse(JSON.stringify(productBrand), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
