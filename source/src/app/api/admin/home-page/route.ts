import { NextRequest, NextResponse } from "next/server";
import {
  createProductsHome,
  deleteProductsHome,
  getProductsHome,
} from "@/app/libs/prisma/homepage";
import { getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (session?.user) {
      const { searchParams } = new URL(request.url);
      const products = await getProductsHome(
        Number(searchParams.get("isProduct"))
      );
      return NextResponse.json(products);
    } else {
      throw new Error("Chua dang nhap");
    }
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const product = await createProductsHome(json);
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const json = await request.json();
    const product = await deleteProductsHome(json.id);
    return NextResponse.json(product);
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
}
