import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { findOrder, updateOrder } from "@/app/libs/prisma/order";
import { sendNotificationOrderUntil } from "@/utils/notification";
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
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      const order = await findOrder(id, request);
      return NextResponse.json(order);
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
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      const id = params.id;
      let createdBy = 1;
      let garageId = getAuth.garageId;
      if (!id) {
        return new NextResponse("Missing 'id' parameter");
      }
      const json = await request.json();

      if (getAuth?.id) {
        createdBy = Number(getAuth.id);
        garageId = getAuth.garageId;
      }
      const updatedOrder = await updateOrder(id, json);
      const fbToken = await sendNotificationOrderUntil(updatedOrder.order);
      return new NextResponse(JSON.stringify(updatedOrder), {
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
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return new NextResponse("Missing 'id' parameter");
  }

  const order = await prisma.order.update({
    where: {
      id: id.toString(),
    },
    data: {
      status: "DELETE",
    },
  });

  return NextResponse.json({ success: 1, message: "Delete success" });
}
