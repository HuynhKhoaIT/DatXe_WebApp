import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { getMyAccount, updateUser } from "@/app/libs/prisma/user";
import { updateAccount } from "@/utils/user";
import { checkAuthToken } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const getAuth = await checkAuthToken(request);
    if (getAuth != null) {
      const data = await getMyAccount(getAuth.id.toString());
      return NextResponse.json({ data });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error?.message, { status: 500 });
  }
}
export async function PUT(request: NextRequest) {
  try {
    const json = await request.json();
    const getAuth = await checkAuthToken(request);
    if (getAuth != null) {
      json.id = getAuth.id.toString();
      const BearerToken = request.headers.get("authorization") as string;
      const token = BearerToken?.split(" ")[1];
      await updateAccount(json, token);
      const user = await updateUser(json);
      return new NextResponse(JSON.stringify(user), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
