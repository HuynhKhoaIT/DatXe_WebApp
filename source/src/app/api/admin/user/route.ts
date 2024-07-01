import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/app/libs/prisma/user";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const auth = await checkAuthToken(request);
    const { searchParams } = new URL(request.url);
    if (auth) {
      let page = 1;
      if (searchParams.get("page")) {
        page = Number(searchParams.get("page"));
      }
      const requestData = {
        s: searchParams.get("phoneNumber"),
        limit: 10,
        take: 10,
        page: page,
      };
      const data = await getUsers(requestData);
      return NextResponse.json(data);
    } else {
      throw new Error("Chua dang nhap");
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
