import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getMyAccount, updateUser } from "@/app/libs/prisma/user";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.id) {
      const data = await getMyAccount(session.user?.id.toString());
      return NextResponse.json({ data });
    }
    throw new Error("Chua dang nhap");
  } catch (error:any) {
    return new NextResponse(error?.message, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const json = await request.json();
    const session = await getServerSession(authOptions);
    if (session) {
      json.id = session.user?.id.toString();
      const user = await updateUser(json);
      return new NextResponse(JSON.stringify(user), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error:any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
