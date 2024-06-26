import { updateOrderStep } from "@/app/libs/prisma/order";
import { NextRequest, NextResponse } from "next/server";
import {
  sendNotificationOrderUntil,
  sendNotificationUntil,
} from "@/utils/notification";
import { getFirebaseTokenByPhone } from "@/app/libs/prisma/firebaseToken";
import { checkAuthToken } from "@/utils/auth";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      const orderId = json.id;
      const orderStep = json.step;
      const cancelReason = json.cancelReason;
      const order = await updateOrderStep(orderId, orderStep, cancelReason);
      const fbToken = await sendNotificationOrderUntil(order);

      return new NextResponse(JSON.stringify(order), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
