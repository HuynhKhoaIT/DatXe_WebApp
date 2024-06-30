import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { showGarage, updateGarage } from "@/app/libs/prisma/garage";
import { getSession } from "@/lib/auth";
import { checkAuthToken } from "@/utils/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return new NextResponse("Missing 'id' parameter");
    }
    const auth = await checkAuthToken(request);
    if (auth) {
      const garage = await showGarage(id);
      return NextResponse.json(garage);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await checkAuthToken(request);
    if (auth) {
      const id = params.id;
      let createdBy = "1";
      if (!id) {
        return new NextResponse("Missing 'id' parameter");
      }
      const json = await request.json();

      if (auth?.id) {
        createdBy = auth.id;
      }
      const updatedData = await updateGarage(id, json);

      return new NextResponse(JSON.stringify(updatedData), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (!id) {
    return new NextResponse("Missing 'id' parameter");
  }

  const rs = await prisma.garage.update({
    where: {
      id: id.toString(),
    },
    data: {
      status: "DELETE",
    },
  });

  return NextResponse.json({ success: 1, message: "Delete success" });
}
