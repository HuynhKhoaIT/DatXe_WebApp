import { NextRequest, NextResponse } from "next/server";
import { getGarageIdByDLBDID } from "@/app/libs/prisma/garage";
import { createPost, getPosts } from "@/app/libs/prisma/post";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (session && session.user?.role != "CUSTOMER") {
      let garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
      const { searchParams } = new URL(request.url);
      let page = 1;
      if (searchParams.get("page")) {
        page = Number(searchParams.get("page"));
      }
      const requestData = {
        s: searchParams.get("s"),
        limit: 10,
        take: 10,
        page: page,
        garageId: garageId.toString(),
        status: "PUBLIC",
      };
      const cars = await getPosts(requestData);

      return NextResponse.json(cars);
    } else {
      throw new Error("Chua dang nhap");
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (session?.user) {
      const json = await request.json();
      json.garageId = await getGarageIdByDLBDID(Number(session.user?.garageId));
      json.createdBy = session.user?.id.toString();
      const post = await createPost(json);
      return new NextResponse(JSON.stringify(post), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
