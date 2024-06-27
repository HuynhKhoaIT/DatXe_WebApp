import { getProductsFromDLBD } from "@/utils/getProductsFromDLBD";
import { NextRequest, NextResponse } from "next/server";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      const { searchParams } = new URL(request.url);
      let garageId = getAuth?.garageId;
      const dataRequest = {
        page: searchParams.get("page"),
        garageId: getAuth.garageId,
      };
      const products = await getProductsFromDLBD(getAuth, dataRequest);
      return NextResponse.json(products);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
