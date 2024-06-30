import { NextRequest, NextResponse } from "next/server";
import { getCarsFromDLBD } from "@/utils/car";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      const customers = await getCarsFromDLBD(getAuth?.token);
      console.log("customers", customers);
      return NextResponse.json(customers);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
