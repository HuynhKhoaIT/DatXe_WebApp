import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/app/libs/prisma/product";
import {
  deletePost,
  findPost,
  findPostAdmin,
  updatePost,
} from "@/app/libs/prisma/post";
import convertToSlug from "@/utils/until";
import { ROLE_ADMIN, ROLE_EXPERT } from "@/constants";
import { checkAuthToken } from "@/utils/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return new NextResponse("Missing 'id' parameter");
    }
    const getAuth = await checkAuthToken(request);
    if (getAuth) {
      const post = await findPostAdmin(id);
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
    const getAuth = await checkAuthToken(request);
    if (
      getAuth &&
      (getAuth?.role == "ADMINGARAGE" || getAuth?.role == ROLE_ADMIN)
    ) {
      const data = await request.json();
      const id = params.id;
      data.createdBy = getAuth.id.toString();
      const rs = await updatePost(id, data);
      return new NextResponse(JSON.stringify(rs), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
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
  const postData = await deletePost(id);
  return NextResponse.json({ success: 1, message: "Delete success" });
}
