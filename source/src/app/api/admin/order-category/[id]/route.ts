import prisma from "@/app/libs/prismadb";
import { getSession } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return new NextResponse("Missing 'id' parameter");
    }
    const session = await getSession();
    if (1) {
      const orderCategorys = await prisma.orderCategory.findUnique({
        where: {
          id: id.toString(),
        },
      });
      return NextResponse.json(orderCategorys);
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
    const session = await getSession();

    if (1) {
      const id = params.id;
      let createdBy = 1;
      let garageId = 1;
      if (!id) {
        return new NextResponse("Missing 'id' parameter");
      }
      const json = await request.json();

      if (session?.user?.id) {
        createdBy = Number(session.user.id);
        garageId = Number(session.user.garageId);
      }
      let orderCatUpdateData = {
        title: json.title,
        garageId: json.garageId,
        status: json.status,
      };
      const updatedCat = await prisma.orderCategory.update({
        where: {
          id: id,
        },
        data: orderCatUpdateData,
      });

      return new NextResponse(JSON.stringify(updatedCat), {
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

  const rs = await prisma.orderCategory.update({
    where: {
      id: id.toString(),
    },
    data: {
      status: "DELETE",
    },
  });

  return NextResponse.json({ success: 1, message: "Delete success" });
}
