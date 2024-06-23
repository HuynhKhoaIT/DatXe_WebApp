import prisma from "@/app/libs/prismadb";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { findOrder, updateOrder } from "@/app/libs/prisma/order";
import { sendSMSOrder } from "@/utils/order";
import { sendNotificationOrderUntil } from "@/utils/notification";
import { getSession } from "@/lib/auth";

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
    if (session?.user) {
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
    const session = await getSession();
    if (session?.user) {
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
