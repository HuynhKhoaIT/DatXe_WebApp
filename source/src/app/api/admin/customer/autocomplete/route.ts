import { getCustomersAutoComplete } from "@/app/libs/prisma/customer";
import { NextRequest, NextResponse } from "next/server";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      let garageId = getAuth?.garageId;
      const { searchParams } = new URL(request.url);
      let page = 1;
      if (searchParams.get("page")) {
        page = Number(searchParams.get("page"));
      }
      const requestData = {
        s: searchParams.get("s"),
        phoneNumber: searchParams.get("phoneNumber"),
        limit: 10,
        take: 10,
        page: page,
        garageId: garageId,
        status: "PUBLIC",
      };
      const customers = await getCustomersAutoComplete(requestData);

      console.log("customers", customers);
      return NextResponse.json(customers);
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
