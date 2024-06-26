import { NextRequest, NextResponse } from "next/server";
import { deleteProductsHome } from "@/app/libs/prisma/homepage";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const product = await deleteProductsHome(id);
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
