import { getCustomersFromDLBD } from "@/utils/customers";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (session?.user) {
      const customers = await getCustomersFromDLBD(session?.user?.token);
      return NextResponse.json(customers);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
