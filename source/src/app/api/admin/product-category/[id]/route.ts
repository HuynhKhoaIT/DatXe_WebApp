import prisma from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return new NextResponse("Missing 'id' parameter");
    }
    // const session = await getServerSession(authOptions);
    const productCategory = await prisma.productCategory.findUnique({
      where: {
        id: id.toString(),
      },
    });
    return NextResponse.json(productCategory);
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
    const id = params.id;
    if (!id) {
      return new NextResponse("Missing 'id' parameter");
    }

    const json = await request.json();
    const productCategory = await prisma.productCategory.findUnique({
      where: {
        id: id.toString(),
      },
    });

    const updatedPost = await prisma.productCategory.update({
      where: {
        id: id.toString(),
      },
      data: json,
    });

    return new NextResponse(JSON.stringify(updatedPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  if (!id) {
    return new NextResponse("Missing 'id' parameter");
  }

  const deletePost = await prisma.productCategory.update({
    where: {
      id: id.toString(),
    },
    data: {
      status: "DELETE",
    },
  });

  return NextResponse.json({ success: 1, message: "Delete success" });
}
