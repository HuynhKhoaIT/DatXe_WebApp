import { asyncToDLDB, findOrder } from "@/app/libs/prisma/order";
import { checkAuthToken } from "@/utils/auth";
import { POST_ASYNC_ORDER_DLBD_ENDPOINT } from "@/utils/constants/endpoints";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      const id = json.id;
      const order = await findOrder(id, {});
      if (order.orderDLBDId == null) {
        const { data } = await axios({
          method: "POST",
          url: `https://v2.dlbd.vn/api/v3/app/order/sync-datxe`,
          data: JSON.stringify(order),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuth?.token}`,
          },
        });
        const rs = await asyncToDLDB(id, data.id);
        return NextResponse.json(data);
      }
      return NextResponse.json({
        status: "error",
        message: "Tồn tại",
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
