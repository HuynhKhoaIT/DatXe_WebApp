import {
  createNotification,
  getNotications,
} from "@/app/libs/prisma/notification";
import { getSession } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

    if (session?.user) {
      const { searchParams } = new URL(request.url);
      const requestData = {
        userId: session?.user?.id,
        limit: searchParams.get("limit"),
        page: searchParams.get("page"),
      };
      const noti = await getNotications(requestData);
      return NextResponse.json(noti);
    }
    return NextResponse.json([]);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  const json = await request.json();

  const notiRs = await createNotification({
    title: json.title,
    content: json.content,
    icon: json.icon,
    image: json.image,
    action: json.action,
    data: json.data,
    kind: json.kind,
    userId: json.userId,
    customerId: json.customerId,
  });
  return NextResponse.json(notiRs);
}
