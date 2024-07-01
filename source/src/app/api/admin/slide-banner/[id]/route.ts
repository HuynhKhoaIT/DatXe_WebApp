import { NextRequest, NextResponse } from "next/server";
import {
  deleteSlideBanner,
  findSlideBanner,
  updateSlideBanner,
} from "@/app/libs/prisma/slideBanner";
import { getSession } from "@/lib/auth";
import { checkAuthToken } from "@/utils/auth";
import { ROLE_EXPERT } from "@/constants";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return new NextResponse("Missing 'id' parameter");
    }
    const auth = await checkAuthToken(request);
    if (auth) {
      const post = await findSlideBanner(id);
      return NextResponse.json({ data: post });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await checkAuthToken(request);
    if (auth?.role == ROLE_EXPERT) {
      const data = await request.json();
      const id = params.id;
      data.createdBy = auth.id;
      const rs = await updateSlideBanner(id, data);
      return new NextResponse(JSON.stringify(rs), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error("Chua dang nhap");
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return new NextResponse("Missing 'id' parameter");
  }
  const postData = await deleteSlideBanner(id);

  return NextResponse.json({ success: 1, message: "Delete success" });
}
