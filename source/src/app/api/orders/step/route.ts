import { updateOrderStep } from "@/app/libs/prisma/order";
import { NextResponse } from "next/server";
import { sendNotificationUntil } from "@/utils/notification";
import { getSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const session = await getSession();
    if (session) {
      const orderId = json.id;
      const orderStep = json.step;
      const cancelReason = json.cancelReason;
      const order = await updateOrderStep(orderId, orderStep, cancelReason);

      // send noiti
      // await sendNotificationUntil({})
      return new NextResponse(JSON.stringify(order), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
