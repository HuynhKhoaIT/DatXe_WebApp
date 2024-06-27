import { getCustomers } from "@/app/libs/prisma/customer";
import prisma from "@/app/libs/prismadb";
import { getProductsFromDLBD } from "@/utils/getProductsFromDLBD";
import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {

    const session:any = await getSession();
    if (session.user) {
      const { searchParams } = new URL(request.url);
      const dataRequest = {
        page: searchParams.get("page"),
        garageId: session?.user.garageId,
      };
      const products = await getProductsFromDLBD(session.user, dataRequest);
      return NextResponse.json(products);
    }
    throw new Error("Chua dang nhap");
  } catch (error:any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
