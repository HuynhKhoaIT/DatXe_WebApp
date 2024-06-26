import { deletedNotification } from "@/app/libs/prisma/notification";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const id = params.id;
    const session = await getSession();
    if (session) {
      const noti = await deletedNotification(id);
      return NextResponse.json(noti);
    }
    return NextResponse.json({});
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
