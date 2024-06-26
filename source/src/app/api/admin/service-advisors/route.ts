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
    const serviceAdvisor = await prisma.serviceAdvisor.findMany({
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
    return NextResponse.json(serviceAdvisor);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const serviceAdvisor = await prisma.serviceAdvisor.create({
      data: {
        fullName: json.fullName,
        phoneNumber: json.phoneNumber,
        email: json.email,
        garageId: json.garageId,
        status: json.status,
      },
    });

    return new NextResponse(JSON.stringify(serviceAdvisor), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
